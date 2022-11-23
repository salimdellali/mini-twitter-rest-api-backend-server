import { Router } from 'express';
import UserTokenController from './userToken.controller';
import { refreshTokenValidation } from '../../validations';
import { validatorMiddleware } from '../../middlewares';

const router = Router();

router
  .route('/token/access/new')
  .post(
    refreshTokenValidation,
    validatorMiddleware,
    UserTokenController.getNewAccessToken,
  );

router
  .route('/logout')
  .delete(
    refreshTokenValidation,
    validatorMiddleware,
    UserTokenController.logout,
  );
export default router;