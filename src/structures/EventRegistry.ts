import { ForgeClient, Interpreter, Logger } from '@tryforge/forgescript'
import { CustomEventDefinition, CustomEventPayload, DiscordEventContext } from './types'
import { ForgeEventsCommandManager } from './commandManager'

export class EventRegistry {
    private readonly definitions = new Map<string, CustomEventDefinition>()
    private client!: ForgeClient
    private commandManager!: ForgeEventsCommandManager

    public boot(
        client: ForgeClient,
        commandManager: ForgeEventsCommandManager,
        defs: CustomEventDefinition[],
    ): void {
        this.client = client
        this.commandManager = commandManager

        for (const def of defs) {
            if (!def.name || !/^[\w]+$/.test(def.name)) {
                throw new Error(
                    `[ForgeEvents] Invalid event name "${def.name}". ` +
                    `Only letters, numbers, and underscores are allowed.`,
                )
            }
            if (this.definitions.has(def.name)) {
                throw new Error(`[ForgeEvents] Duplicate event name "${def.name}".`)
            }
            this.definitions.set(def.name, def)
        }
    }

    public getAll(): CustomEventDefinition[] {
        return Array.from(this.definitions.values())
    }

    public get(name: string): CustomEventDefinition | null {
        return this.definitions.get(name) ?? null
    }

    public has(name: string): boolean {
        return this.definitions.has(name)
    }

    /**
     * Fire a custom event.
     *
     * @param eventName  - The event to fire.
     * @param data       - Key-value payload accessible via $eventData[key].
     * @param discordObj - A Discord.js object used as ctx.obj in every handler.
     *                     Makes $guildID, $channelID, $authorID etc. work correctly.
     * @returns The number of handler commands that ran.
     */
    public async fire(
        eventName: string,
        data: Record<string, string> = {},
        discordObj?: object | null,
    ): Promise<number> {
        const def = this.definitions.get(eventName)
        if (!def) {
            throw new Error(
                `[ForgeEvents] Unknown event "${eventName}". ` +
                `Did you define it in the extension options?`,
            )
        }

        if (def.fields?.length) {
            for (const key of Object.keys(data)) {
                if (!def.fields.includes(key)) {
                    Logger.warn(
                        `[ForgeEvents] Field "${key}" passed to "${eventName}" ` +
                        `is not in the declared fields list: [${def.fields.join(', ')}]`,
                    )
                }
            }
        }

        const discordCtx: DiscordEventContext = {
            obj: discordObj ?? {},
        }

        const payload: CustomEventPayload = {
            eventName,
            data,
            firedAt: new Date().toISOString(),
            discordCtx,
        }

        const commands = this.commandManager.get(eventName)
        for (const command of commands) {
            await Interpreter.run({
                client: this.client,
                command,
                data: command.compiled.code,
                obj: discordCtx.obj as any,
                extras: payload,
            })
        }

        return commands.length
    }
}
