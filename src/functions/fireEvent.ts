import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeEvents } from '..'

export default new NativeFunction({
    name: '$fireEvent',
    description: 'Fires a custom event, running all commands registered for it.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'eventName',
            description: 'The name of the event to fire.',
            type: ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'data',
            description: 'Key-value pairs in the format key:value.',
            type: ArgType.String,
            required: false,
            rest: true,
        },
    ],
    output: ArgType.Number,
    async execute(ctx, [eventName, rawData]) {
        const ext = ctx.client.getExtension(ForgeEvents, true)

        if (!ext.registry.has(eventName)) {
            return this.customError(
                `Unknown event "${eventName}". ` +
                `Defined events: ${ext.registry.getAll().map((e: any) => e.name).join(', ')}`,
            )
        }

        const data: Record<string, string> = {}
        for (const pair of rawData.filter(Boolean)) {
            const colon = pair.indexOf(':')
            if (colon === -1) {
                return this.customError(`Invalid data format "${pair}". Expected "key:value".`)
            }
            data[pair.slice(0, colon).trim()] = pair.slice(colon + 1)
        }

        try {
            const ran = await ext.registry.fire(eventName, data)
            return this.success(String(ran))
        } catch (err) {
            return this.customError((err as Error).message)
        }
    },
})
