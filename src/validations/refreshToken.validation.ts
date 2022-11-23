import { body } from 'express-validator';

export const refreshTokenValidation = [
  body('refreshToken')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a valid refresh token'),
];
