import { Router } from 'express';
import AuthController from './auth.controller';
import {
  refreshTokenValidation,
  credentialsFormatValidation,
} from '../../validations';
import { validatorMiddleware } from '../../middlewares';

const router = Router();

router
  .route('/login')
  .post(credentialsFormatValidation, validatorMiddleware, AuthController.login);

router
  .route('/token/access/new')
  .post(
    refreshTokenValidation,
    validatorMiddleware,
    AuthController.getNewAccessTokenWithRefreshToken,
  );

router
  .route('/logout')
  .delete(refreshTokenValidation, validatorMiddleware, AuthController.logout);

router
  .route('/token/refresh/verify')
  .post(
    refreshTokenValidation,
    validatorMiddleware,
    AuthController.verifyRefreshToken,
  );
export default router;
