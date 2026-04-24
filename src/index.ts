import { EventManager, ForgeClient, ForgeExtension, Logger } from '@tryforge/forgescript'
import path from 'path'

import { ForgeEventsCommandManager } from './structures/commandManager'
import { EventRegistry } from './structures/EventRegistry'
import { CustomEventDefinition } from './structures/types'

export interface ForgeEventsOptions {
    events: CustomEventDefinition[]
}

export class ForgeEvents extends ForgeExtension {
    name = 'ForgeEvents'
    description = 'Custom user-defined events for ForgeScript.'
    version = require('../package.json').version as string

    public client!: ForgeClient
    public commands!: ForgeEventsCommandManager
    public readonly registry = new EventRegistry()

    constructor(private readonly options: ForgeEventsOptions) {
        super()
        if (!options.events?.length) {
            throw new Error('[ForgeEvents] You must define at least one event in the options.')
        }
    }

    init(client: ForgeClient): void {
        this.client = client
        this.commands = new ForgeEventsCommandManager(client)

        this.registry.boot(client, this.commands, this.options.events)

        EventManager.Loaded['ForgeEvents'] ??= {}
        for (const def of this.options.events) {
            EventManager.Loaded['ForgeEvents']![def.name] = {
                name: def.name,
                data: {
                    name: def.name,
                    version: '1.0.0',
                    description: def.description ?? `Custom event: ${def.name}`,
                },
                register: () => void 0,
            } as any
        }

        this.client.events.load('ForgeEvents', this.options.events.map(e => e.name))
        this.load(path.join(__dirname, './functions'))

        Logger.info(
            `[ForgeEvents] ${this.options.events.length} event(s) registered: ` +
            this.options.events.map(e => e.name).join(', ')
        )
    }
}

export * from './structures'
