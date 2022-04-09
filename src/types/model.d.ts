export type User = {
  objectId: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  name: string;
  price: string;
  variants: Array<{ color: string }>;
  vendor: User | string;
  createdAt: string;
  updatedAt: string;
};
