"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitlistEntry = void 0;
const typeorm_1 = require("typeorm");
let WaitlistEntry = class WaitlistEntry {
};
exports.WaitlistEntry = WaitlistEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WaitlistEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_needs', type: 'json' }),
    __metadata("design:type", Array)
], WaitlistEntry.prototype, "primaryNeeds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_type', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], WaitlistEntry.prototype, "vehicleType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WaitlistEntry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WaitlistEntry.prototype, "updatedAt", void 0);
exports.WaitlistEntry = WaitlistEntry = __decorate([
    (0, typeorm_1.Entity)('waitlist_entries')
], WaitlistEntry);
//# sourceMappingURL=WaitlistEntry.js.map