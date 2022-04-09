import handleAppError from './handle-app-error.middleware';
import requireAuthen from './require-authen.middleware';
import requiredRoles from './require-roles.middleware';

const middlewares = {
  requireAuthen,
  requiredRoles,
  handleAppError,
};

export default middlewares;
