"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistry = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class EventRegistry {
    constructor() {
        this.definitions = new Map();
    }
    boot(client, commandManager, defs) {
        this.client = client;
        this.commandManager = commandManager;
        for (const def of defs) {
            if (!def.name || !/^[\w]+$/.test(def.name)) {
                throw new Error(`[ForgeEvents] Invalid event name "${def.name}". ` +
                    `Only letters, numbers, and underscores are allowed.`);
            }
            if (this.definitions.has(def.name)) {
                throw new Error(`[ForgeEvents] Duplicate event name "${def.name}".`);
            }
            this.definitions.set(def.name, def);
        }
    }
    getAll() {
        return Array.from(this.definitions.values());
    }
    get(name) {
        return this.definitions.get(name) ?? null;
    }
    has(name) {
        return this.definitions.has(name);
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
    async fire(eventName, data = {}, discordObj) {
        const def = this.definitions.get(eventName);
        if (!def) {
            throw new Error(`[ForgeEvents] Unknown event "${eventName}". ` +
                `Did you define it in the extension options?`);
        }
        if (def.fields?.length) {
            for (const key of Object.keys(data)) {
                if (!def.fields.includes(key)) {
                    forgescript_1.Logger.warn(`[ForgeEvents] Field "${key}" passed to "${eventName}" ` +
                        `is not in the declared fields list: [${def.fields.join(', ')}]`);
                }
            }
        }
        const discordCtx = {
            obj: discordObj ?? {},
        };
        const payload = {
            eventName,
            data,
            firedAt: new Date().toISOString(),
            discordCtx,
        };
        const commands = this.commandManager.get(eventName);
        for (const command of commands) {
            await forgescript_1.Interpreter.run({
                client: this.client,
                command,
                data: command.compiled.code,
                obj: discordCtx.obj,
                extras: payload,
            });
        }
        return commands.length;
    }
}
exports.EventRegistry = EventRegistry;
//# sourceMappingURL=EventRegistry.js.map