"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWaitlist = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const waitlist_validator_1 = require("../validators/waitlist.validator");
const joinWaitlist = async (req, res) => {
    try {
        // 1. Validate the incoming data
        const { error, value } = waitlist_validator_1.waitlistSchema.validate(req.body);
        if (error) {
            // If validation fails, send a 400 Bad Request response
            return res.status(400).json({
                message: 'Validation failed',
                details: error.details?.[0]?.message || 'Invalid data provided'
            });
        }
        const { fullName, email, phoneNumber, location, primaryNeeds, vehicleType } = value;
        // 2. Get the repository for WaitlistEntry
        const waitlistRepository = db_1.AppDataSource.getRepository(entities_1.WaitlistEntry);
        // 3. Check if email already exists
        const existingEntry = await waitlistRepository.findOne({ where: { email } });
        if (existingEntry) {
            return res.status(409).json({ message: 'This email is already on the waitlist.' });
        }
        // 4. Create and save the new entry
        const newEntry = waitlistRepository.create({
            fullName,
            email,
            phoneNumber,
            location,
            primaryNeeds,
            vehicleType: vehicleType || null
        });
        const savedEntry = await waitlistRepository.save(newEntry);
        // 5. Send a success response
        res.status(201).json({
            message: 'Successfully joined the waitlist!',
            data: savedEntry,
        });
    }
    catch (err) {
        const error = err;
        // Handle specific database errors
        if (error.code === '23505') { // PostgreSQL unique constraint violation
            return res.status(409).json({ message: 'This email is already on the waitlist.' });
        }
        // Handle generic server errors
        console.error('Error in joinWaitlist:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.joinWaitlist = joinWaitlist;
//# sourceMappingURL=waitlist.controller.js.map