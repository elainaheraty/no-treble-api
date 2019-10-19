import { prismaMutationFields } from '../../util/nexus';

export const Mutation = prismaMutationFields(['*']);
export { Signup } from './signup';
export { Login } from './login';
export { ChangePassword } from './changePassword';
