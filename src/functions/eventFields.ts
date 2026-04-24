import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeEvents } from '..'

export default new NativeFunction({
    name: '$eventFields',
    description: 'Returns a separated list of the declared field names for a custom event.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'eventName',
            description: 'The event name.',
            type: ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'separator',
            description: 'Separator between field names. Defaults to ", ".',
            type: ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: ArgType.String,
    execute(ctx, [eventName, separator]) {
        const ext = ctx.client.getExtension(ForgeEvents, true)
        const def = ext.registry.get(eventName)
        if (!def) return this.customError(`Unknown event "${eventName}".`)
        return this.success((def.fields ?? []).join(separator ?? ', '))
    },
})
