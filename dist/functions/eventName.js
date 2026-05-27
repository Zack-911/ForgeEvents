"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$eventName',
    description: 'Returns the name of the currently executing custom event.',
    version: '1.0.0',
    unwrap: false,
    output: forgescript_1.ArgType.String,
    execute(ctx) {
        const payload = ctx.runtime.extras;
        if (!payload?.eventName) {
            return this.customError('$eventName can only be used inside a custom event handler command.');
        }
        return this.success(payload.eventName);
    },
});
//# sourceMappingURL=eventName.js.map