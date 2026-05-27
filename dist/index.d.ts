import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { ForgeEventsCommandManager } from './structures/commandManager';
import { EventRegistry } from './structures/EventRegistry';
import { CustomEventDefinition } from './structures/types';
export interface ForgeEventsOptions {
    events: CustomEventDefinition[];
}
export declare class ForgeEvents extends ForgeExtension {
    private readonly options;
    name: string;
    description: string;
    version: string;
    client: ForgeClient;
    commands: ForgeEventsCommandManager;
    readonly registry: EventRegistry;
    constructor(options: ForgeEventsOptions);
    init(client: ForgeClient): void;
}
export * from './structures';
//# sourceMappingURL=index.d.ts.map