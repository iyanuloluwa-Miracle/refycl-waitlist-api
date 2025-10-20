"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitlistSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const allowedNeeds = ['Petrol for Vehicle', 'Generator Fuel', 'Cooking Gas'];
exports.waitlistSchema = joi_1.default.object({
    fullName: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string().min(10).max(15).required(),
    location: joi_1.default.string().required(),
    primaryNeeds: joi_1.default.array()
        .items(joi_1.default.string().valid(...allowedNeeds))
        .min(1) // Must select at least one need
        .required(),
    vehicleType: joi_1.default.string().allow(null, '') // Optional field
});
//# sourceMappingURL=waitlist.validator.js.map