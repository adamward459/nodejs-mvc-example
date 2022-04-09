import constants from './constants';
import * as controllers from './controllers';
import middlewares from './middlewares';

const routes = [
  {
    path: '/api/v1/users/sign-in',
    method: 'post',
    controller: controllers.authController.signIn,
  },
  {
    path: '/api/v1/users/sign-up',
    method: 'post',
    controller: controllers.authController.signUp,
  },
  {
    path: '/api/v1/products',
    method: 'post',
    middlewares: [
      middlewares.requireAuthen,
      middlewares.requiredRoles(constants.USER_ROLE.VENDOR),
    ],
    controller: controllers.productController.create,
  },
];

export default routes;
