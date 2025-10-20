"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waitlist_controller_1 = require("../controllers/waitlist.controller");
const router = (0, express_1.Router)();
// Define the endpoint
// POST /api/waitlist
router.post('/waitlist', waitlist_controller_1.joinWaitlist);
exports.default = router;
//# sourceMappingURL=routes.js.map