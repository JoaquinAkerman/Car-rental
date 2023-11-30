
import Joi from 'joi';

const carSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  day_price: Joi.number().min(0).required(),
  year: Joi.number().integer().min(1886).max(new Date().getFullYear()),
  mileage: Joi.number().min(0),
  color: Joi.string(),
  air_conditioning: Joi.string().valid('Yes', 'No'),
  passengers: Joi.number().integer().min(1),
  transmission: Joi.string().valid('Automatic', 'Manual'),
  panoramic_sunroof: Joi.string().valid('Yes', 'No'),
});

export default function carValidator(carData) {

  const { error } = carSchema.validate(carData);
  if (error) {
    throw new Error(`Invalid car data: ${error.details[0].message}`);
  }
}