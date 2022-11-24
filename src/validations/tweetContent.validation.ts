import { body } from 'express-validator';

export const tweetContentValidation = [
  body('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a content'),
];
