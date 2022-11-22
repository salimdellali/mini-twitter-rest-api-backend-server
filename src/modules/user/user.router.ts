import { Router } from 'express';
import UserController from './user.controller';
import { signupValidation } from '../../validations';
import { validatorMiddleware } from '../../middlewares';

const router = Router();

router
  .route('/signup')
  .post(signupValidation, validatorMiddleware, UserController.signup);

export default router;
