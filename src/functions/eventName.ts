import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { CustomEventPayload } from '../structures/types'

export default new NativeFunction({
    name: '$eventName',
    description: 'Returns the name of the currently executing custom event.',
    version: '1.0.0',
    unwrap: false,
    output: ArgType.String,
    execute(ctx) {
        // @ts-ignore
        const payload = ctx.extras as CustomEventPayload | undefined

        if (!payload?.eventName) {
            return this.customError('$eventName can only be used inside a custom event handler command.')
        }
        return this.success(payload.eventName)
    },
})
