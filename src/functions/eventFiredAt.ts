import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { CustomEventPayload } from '../structures/types'

export default new NativeFunction({
    name: '$eventFiredAt',
    description: 'Returns the ISO 8601 timestamp of when the current custom event was fired.',
    version: '1.0.0',
    unwrap: false,
    output: ArgType.String,
    execute(ctx) {
        // extras lives on ctx.runtime — there is no ctx.extras getter on Context
        const payload = ctx.runtime.extras as CustomEventPayload | undefined

        if (!payload?.firedAt) {
            return this.customError(
                '$eventFiredAt can only be used inside a custom event handler command.',
            )
        }
        return this.success(payload.firedAt)
    },
})
