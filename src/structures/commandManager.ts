import { BaseCommandManager } from '@tryforge/forgescript'

/**
 * Command manager for ForgeEvents.
 * Generic string since event names are dynamic.
 */
export class ForgeEventsCommandManager extends BaseCommandManager<string> {
    public handlerName = 'ForgeEvents'
}
