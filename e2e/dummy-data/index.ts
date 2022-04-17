import _ from 'lodash';
import mongoose from 'mongoose';

import constants from '../../src/constants';

const products = [
  {
    _id: new mongoose.Types.ObjectId('6251c55732100eef0b1b3493'),
    name: 'product',
    price: 1234,
    quantity: 0,
    isPublished: false,
    variants: [
      {
        color: 'yellow',
      },
    ],
    vendor: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3801'),
    createdAt: new Date('2022-04-10T00:41:43.913+07:00'),
    updatedAt: new Date('2022-04-10T00:41:43.913+07:00'),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6251c55732100eef0b1b3494'),
    name: 'product 2',
    price: 1234,
    quantity: 0,
    isPublished: true,
    variants: [
      {
        color: 'yellow',
      },
    ],
    vendor: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3801'),
    createdAt: new Date('2022-04-10T00:41:43.913+07:00'),
    updatedAt: new Date('2022-04-10T00:41:43.913+07:00'),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6251c55732100eef0b1b3495'),
    name: 'product 3',
    price: 1234,
    quantity: 0,
    isPublished: false,
    variants: [
      {
        color: 'yellow',
      },
    ],
    vendor: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3801'),
    createdAt: new Date('2022-04-10T00:41:43.913+07:00'),
    updatedAt: new Date('2022-04-10T00:41:43.913+07:00'),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6251c55732100eef0b1b3496'),
    name: 'product 1 (2)',
    price: 1234,
    quantity: 0,
    isPublished: false,
    variants: [
      {
        color: 'yellow',
      },
    ],
    vendor: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3802'),
    createdAt: new Date('2022-04-10T00:41:43.913+07:00'),
    updatedAt: new Date('2022-04-10T00:41:43.913+07:00'),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6251c55732100eef0b1b3497'),
    name: 'product 2 (2)',
    price: 1234,
    quantity: 0,
    isPublished: false,
    variants: [
      {
        color: 'yellow',
      },
    ],
    vendor: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3802'),
    createdAt: new Date('2022-04-10T00:41:43.913+07:00'),
    updatedAt: new Date('2022-04-10T00:41:43.913+07:00'),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('6251c55732100eef0b1b3498'),
    name: 'product 3 (2)',
    price: 1234,
    quantity: 0,
    isPublished: false,
    variants: [
      {
        color: 'yellow',
      },
    ],
    vendor: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3802'),
    createdAt: new Date('2022-04-10T00:41:43.913+07:00'),
    updatedAt: new Date('2022-04-10T00:41:43.913+07:00'),
    __v: 0,
  },
];

const dummyData = {
  getAuthToken: (userType: keyof typeof constants.TEST_USER.USER_TYPE) => {
    return constants.TEST_USER.MAP_USER_TO_DATA[userType].token;
  },

  insertUsers: async () => {
    await mongoose.connection.collection('users').drop();
    await mongoose.connection
      .collection('users')
      .insertMany(Object.values(constants.TEST_USER.MAP_USER_TO_DATA));
  },

  insertProducts: async () => {
    await mongoose.connection.collection('products').drop();
    await mongoose.connection.collection('products').insertMany(products);
  },

  getProductsByUserType: (
    userType: Exclude<keyof typeof constants.TEST_USER.USER_TYPE, 'USER'>,
    skipVendorCheck = false
  ) => {
    return products
      .filter(
        (p) =>
          p.vendor.toString() ===
            constants.TEST_USER.MAP_USER_TO_DATA[userType]._id.toString() ||
          skipVendorCheck
      )
      .map((p) => ({
        ..._.omit(p, 'vendor'),
        _id: p._id.toString(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }));
  },
};

export default dummyData;
