import { Router } from 'express';
import UserTokenController from './userToken.controller';
import {
  refreshTokenValidation,
  credentialsFormatValidation,
} from '../../validations';
import { validatorMiddleware } from '../../middlewares';

const router = Router();

router
  .route('/login')
  .post(
    credentialsFormatValidation,
    validatorMiddleware,
    UserTokenController.login,
  );

router
  .route('/token/access/new')
  .post(
    refreshTokenValidation,
    validatorMiddleware,
    UserTokenController.getNewAccessTokenWithRefreshToken,
  );

router
  .route('/logout')
  .delete(
    refreshTokenValidation,
    validatorMiddleware,
    UserTokenController.logout,
  );

router
  .route('/token/refresh/verify')
  .post(
    refreshTokenValidation,
    validatorMiddleware,
    UserTokenController.verifyRefreshToken,
  );
export default router;
