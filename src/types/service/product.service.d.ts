import { Product, User } from '../model.d';

export type CreateProductPayload = Omit<Product, 'createdAt' | 'updatedAt'> & {
  signedInUser: Pick<User, 'objectId' | 'email' | 'role'>;
};
