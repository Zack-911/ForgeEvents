"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$eventFiredAt',
    description: 'Returns the ISO 8601 timestamp of when the current custom event was fired.',
    version: '1.0.0',
    unwrap: false,
    output: forgescript_1.ArgType.String,
    execute(ctx) {
        const payload = ctx.runtime.extras;
        if (!payload?.firedAt) {
            return this.customError('$eventFiredAt can only be used inside a custom event handler command.');
        }
        return this.success(payload.firedAt);
    },
});
//# sourceMappingURL=eventFiredAt.js.map