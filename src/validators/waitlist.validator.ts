import Joi from 'joi';


const allowedNeeds = ['Petrol for Vehicle', 'Generator Fuel', 'Cooking Gas'];

export const waitlistSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  
  email: Joi.string().email().required(),
  
  phoneNumber: Joi.string().min(10).max(15).required(),
  
  location: Joi.string().required(),
  
  primaryNeeds: Joi.array()
    .items(Joi.string().valid(...allowedNeeds))
    .min(1) // Must select at least one need
    .required(),
    
  vehicleType: Joi.string().allow(null, '') // Optional field
});