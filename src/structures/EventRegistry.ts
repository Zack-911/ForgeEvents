import { ForgeClient, Interpreter, Logger } from '@tryforge/forgescript'
import { CustomEventDefinition, CustomEventPayload } from './types'
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

    public async fire(
        eventName: string,
        data: Record<string, string> = {},
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

        const payload: CustomEventPayload = {
            eventName,
            data,
            firedAt: new Date().toISOString(),
            discordCtx: {
                guild: null,
                channel: null,
                member: null,
                user: null,
            },
        }

        const commands = this.commandManager.get(eventName)
        for (const command of commands) {
            await Interpreter.run({
                client: this.client,
                command,
                data: command.compiled.code,
                obj: {} as any,
                extras: payload,
            })
        }

        return commands.length
    }
}
