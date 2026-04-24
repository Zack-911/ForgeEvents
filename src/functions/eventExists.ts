import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeEvents } from '..'

export default new NativeFunction({
    name: '$eventExists',
    description: 'Returns whether a custom event with the given name is defined.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'eventName',
            description: 'The event name to check.',
            type: ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: ArgType.Boolean,
    execute(ctx, [eventName]) {
        const ext = ctx.client.getExtension(ForgeEvents, true)
        return this.success(String(ext.registry.has(eventName)))
    },
})
