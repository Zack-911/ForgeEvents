"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: '$eventList',
    description: 'Returns a separated list of all defined custom event names.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'separator',
            description: 'Separator between event names. Defaults to ", ".',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [separator]) {
        const ext = ctx.client.getExtension(__1.ForgeEvents, true);
        const names = ext.registry.getAll().map(e => e.name);
        return this.success(names.join(separator ?? ', '));
    },
});
//# sourceMappingURL=eventList.js.map