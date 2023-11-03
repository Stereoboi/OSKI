import { UserAnswerSchema } from '../types/validation.types.js';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../helpers/custom.error.js';

export const bodyValidation = (schema: UserAnswerSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message;
      throw new CustomError(errorMessage, 400);
    }

    next();
  };
};
