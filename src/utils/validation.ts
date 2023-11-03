import Joi from 'joi';

export const bodySchemaValidation = Joi.object({
  testId: Joi.string().required(),
  answers: Joi.array().items(Joi.string()).required(),
});
