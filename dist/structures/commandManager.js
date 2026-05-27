"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeEventsCommandManager = void 0;
const forgescript_1 = require("@tryforge/forgescript");
/**
 * Command manager for ForgeEvents.
 * Generic string since event names are dynamic.
 */
class ForgeEventsCommandManager extends forgescript_1.BaseCommandManager {
    constructor() {
        super(...arguments);
        this.handlerName = 'ForgeEvents';
    }
}
exports.ForgeEventsCommandManager = ForgeEventsCommandManager;
//# sourceMappingURL=commandManager.js.map