import { Router } from 'express';
import UserController from './user.controller';
import { credentialsFormatValidation } from '../../validations';
import { validatorMiddleware } from '../../middlewares';

const router = Router();

router
  .route('/signup')
  .post(
    credentialsFormatValidation,
    validatorMiddleware,
    UserController.signup,
  );

router
  .route('/login')
  .post(credentialsFormatValidation, validatorMiddleware, UserController.login);

export default router;
