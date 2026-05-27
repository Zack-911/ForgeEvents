import { ForgeClient } from '@tryforge/forgescript';
import { CustomEventDefinition } from './types';
import { ForgeEventsCommandManager } from './commandManager';
export declare class EventRegistry {
    private readonly definitions;
    private client;
    private commandManager;
    boot(client: ForgeClient, commandManager: ForgeEventsCommandManager, defs: CustomEventDefinition[]): void;
    getAll(): CustomEventDefinition[];
    get(name: string): CustomEventDefinition | null;
    has(name: string): boolean;
    /**
     * Fire a custom event.
     *
     * @param eventName  - The event to fire.
     * @param data       - Key-value payload accessible via $eventData[key].
     * @param discordObj - A Discord.js object used as ctx.obj in every handler.
     *                     Makes $guildID, $channelID, $authorID etc. work correctly.
     * @returns The number of handler commands that ran.
     */
    fire(eventName: string, data?: Record<string, string>, discordObj?: object | null): Promise<number>;
}
//# sourceMappingURL=EventRegistry.d.ts.map