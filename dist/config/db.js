"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const entities_1 = require("../entities");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [entities_1.WaitlistEntry],
    synchronize: true, // Only for development - set to false in production
    logging: process.env.NODE_ENV === 'development',
    ssl: {
        rejectUnauthorized: false
    }
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=db.js.map