import { body } from 'express-validator';

export const signupValidation = [
  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a username'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a password'),
];
