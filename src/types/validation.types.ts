import { Schema } from 'joi';

export type UserAnswerSchema = Schema<{
  testId: string;
  answers: string[];
}>;
