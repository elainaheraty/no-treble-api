import { prismaQueryFields } from '../../util/nexus';

export const Query = prismaQueryFields(['*']);
export { Me } from './me';
