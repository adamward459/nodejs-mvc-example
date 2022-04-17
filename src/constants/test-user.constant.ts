import mongoose from 'mongoose';

const USER_TYPE = {
  USER: 'USER',
  VENDOR_1: 'VENDOR_1',
  VENDOR_2: 'VENDOR_2',
};

const MAP_USER_TO_DATA = {
  [USER_TYPE.USER]: {
    _id: new mongoose.Types.ObjectId('6251acb85b3a89fbb61b3805'),
    email: 'test@test.com',
    role: 'USER',
    password: '$2b$10$yGlXKkqdEicDEmgnW9qohuYEjX2JarIIfJReR0AzKvJMvAyhO9fei', // 1234567
    createdAt: new Date('2022-04-09T22:56:40.104+07:00'),
    updatedAt: new Date('2022-04-09T22:56:40.104+07:00'),
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxODE2MjM5MDIyLCJvYmplY3RJZCI6IjYyNTFhY2I4NWIzYTg5ZmJiNjFiMzgwNSIsInJvbGUiOiJVU0VSIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIn0.24QfNBogw60yL2gnLXL14JPqQhTHIV3BTj3D-JqnXZg',
    __v: 0,
  },
  [USER_TYPE.VENDOR_1]: {
    _id: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3801'),
    email: 'test@test.com',
    role: 'VENDOR',
    password: '$2b$10$IgRa1z8oZosLc.ZweoOH6eBi2QXgQcfky8AE8vq9vdqUSKtmf2j8m', // 1234567
    createdAt: new Date('2022-04-09T22:56:39.589+07:00'),
    updatedAt: new Date('2022-04-09T22:56:39.589+07:00'),
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxODE2MjM5MDIyLCJvYmplY3RJZCI6IjYyNTFhY2I3NWIzYTg5ZmJiNjFiMzgwMSIsInJvbGUiOiJWRU5ET1IiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.RUTLicijORHeXey1JmjiJQXUl9UJKcUc4iorbcW2GZ4',
    __v: 0,
  },
  [USER_TYPE.VENDOR_2]: {
    _id: new mongoose.Types.ObjectId('6251acb75b3a89fbb61b3802'),
    email: 'test2@test.com',
    role: 'VENDOR',
    password: '$2b$10$IgRa1z8oZosLc.ZweoOH6eBi2QXgQcfky8AE8vq9vdqUSKtmf2j8m', // 1234567
    createdAt: new Date('2022-04-09T22:56:39.589+07:00'),
    updatedAt: new Date('2022-04-09T22:56:39.589+07:00'),
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxODE2MjM5MDIyLCJvYmplY3RJZCI6IjYyNTFhY2I3NWIzYTg5ZmJiNjFiMzgwMiIsInJvbGUiOiJWRU5ET1IiLCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIn0.CusI5QJNKJ7fhTQn3Yfl7iSBtzriWWeskLJdnH_YNms',
    __v: 0,
  },
};

const TEST_USER = {
  USER_TYPE,
  MAP_USER_TO_DATA,
};

export default TEST_USER;
