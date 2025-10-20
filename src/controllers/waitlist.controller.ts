import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { WaitlistEntry } from '../entities';
import { waitlistSchema } from '../validators/waitlist.validator';
import { Repository } from 'typeorm';

export const joinWaitlist = async (req: Request, res: Response) => {
  try {
    // 1. Validate the incoming data
    const { error, value } = waitlistSchema.validate(req.body);

    if (error) {
      // If validation fails, send a 400 Bad Request response
      return res.status(400).json({ 
        message: 'Validation failed', 
        details: error.details[0].message 
      });
    }

    const { 
      fullName, 
      email, 
      phoneNumber, 
      location, 
      primaryNeeds, 
      vehicleType 
    } = value;

    // 2. Get the repository for WaitlistEntry
    const waitlistRepository: Repository<WaitlistEntry> = AppDataSource.getRepository(WaitlistEntry);

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

  } catch (err) {
    const error = err as Error & { code?: string };
    
    // Handle specific database errors
    if (error.code === '23505') { // PostgreSQL unique constraint violation
      return res.status(409).json({ message: 'This email is already on the waitlist.' });
    }

    // Handle generic server errors
    console.error('Error in joinWaitlist:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};