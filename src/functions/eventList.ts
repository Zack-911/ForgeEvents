import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeEvents } from '..'

export default new NativeFunction({
    name: '$eventList',
    description: 'Returns a separated list of all defined custom event names.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'separator',
            description: 'Separator between event names. Defaults to ", ".',
            type: ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: ArgType.String,
    execute(ctx, [separator]) {
        const ext = ctx.client.getExtension(ForgeEvents, true)
        const names = ext.registry.getAll().map(e => e.name)
        return this.success(names.join(separator ?? ', '))
    },
})
