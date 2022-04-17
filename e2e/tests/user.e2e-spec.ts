import mongoose from 'mongoose';
import request from 'supertest';

import constants from '../../src/constants';
import { app } from '../../src/server';
import dummyData from '../dummy-data';

describe('POST /api/v1/users/sign-up', () => {
  beforeAll(async () => {
    await mongoose.connection.collection('users').drop();
  });

  describe('When payload is invalid', () => {
    const tests = [
      {
        payload: {},
        description: 'Should return status 400 when payload is empty',
      },
      {
        payload: {
          email: 'test',
        },
        description:
          'Should return status 400 when email is not a correct format',
      },
      {
        payload: {
          password: '123456',
        },
        description:
          'Should return status 400 when password is not 7 characters',
      },
      {
        payload: {
          role: 'test',
        },
        description: 'Should return status 400 when role is not VENDOR or USER',
      },
    ];

    tests.forEach((test) => {
      it(test.description, (done) => {
        request(app)
          .post('/api/v1/users/sign-up')
          .set('content-type', 'application/json')
          .send(test.payload)
          .expect(400, done);
      });
    });
  });

  describe('When payload is valid', () => {
    describe('When payload has same email but different role', () => {
      it('Should register successfully with role VENDOR and email test@test.com', (done) => {
        request(app)
          .post('/api/v1/users/sign-up')
          .set('content-type', 'application/json')
          .send({
            email: 'test@test.com',
            password: '1234567',
            role: constants.USER_ROLE.VENDOR,
          })
          .expect(201)
          .then((res) => {
            expect(res.body.email).toBe('test@test.com');
            expect(res.body.role).toBe(constants.USER_ROLE.VENDOR);
            expect(res.body.token).toBeDefined();
            done();
          })
          .catch(done);
      });

      it('Should fail where there is a record with role VENDOR and email test@test.com', (done) => {
        request(app)
          .post('/api/v1/users/sign-up')
          .set('content-type', 'application/json')
          .send({
            email: 'test@test.com',
            password: '1234567',
            role: constants.USER_ROLE.VENDOR,
          })
          .expect(400)
          .then((res) => {
            expect(res.body.message).toBe(
              constants.ERROR_MESSAGE.DUPLICATE_EMAIL_ADDRESS
            );
            expect(res.body.fields).toStrictEqual(['email']);
            done();
          })
          .catch(done);
      });

      it('Should register successfully with role USER and email test@test.com', (done) => {
        request(app)
          .post('/api/v1/users/sign-up')
          .set('content-type', 'application/json')
          .send({
            email: 'test@test.com',
            password: '1234567',
            role: constants.USER_ROLE.USER,
          })
          .expect(201)
          .then((res) => {
            expect(res.body.email).toBe('test@test.com');
            expect(res.body.role).toBe(constants.USER_ROLE.USER);
            expect(res.body.token).toBeDefined();
            done();
          })
          .catch(done);
      });

      it('Should fail where there is a record with role USER and email test@test.com', (done) => {
        request(app)
          .post('/api/v1/users/sign-up')
          .set('content-type', 'application/json')
          .send({
            email: 'test@test.com',
            password: '1234567',
            role: constants.USER_ROLE.USER,
          })
          .expect(400)
          .then((res) => {
            expect(res.body.message).toBe(
              constants.ERROR_MESSAGE.DUPLICATE_EMAIL_ADDRESS
            );
            expect(res.body.fields).toStrictEqual(['email']);
            done();
          })
          .catch(done);
      });
    });
  });
});

describe('POST /api/v1/users/sign-in', () => {
  describe('When payload is invalid', () => {
    const tests = [
      {
        payload: {},
        description: 'Should return status 400 when payload is empty',
      },
      {
        payload: {
          email: 'test',
        },
        description:
          'Should return status 400 when email is not a correct format',
      },
      {
        payload: {
          password: '123456',
        },
        description:
          'Should return status 400 when password is not 7 characters',
      },
      {
        payload: {
          role: 'test',
        },
        description: 'Should return status 400 when role is not VENDOR or USER',
      },
    ];

    tests.forEach((test) => {
      it(test.description, (done) => {
        request(app)
          .post('/api/v1/users/sign-in')
          .set('content-type', 'application/json')
          .send(test.payload)
          .expect(400, done);
      });
    });
  });

  describe('When payload is valid', () => {
    beforeAll(async () => {
      await dummyData.insertUsers();
    });

    it('Should sign in successfully with email test@test.com and role VENDOR', (done) => {
      request(app)
        .post('/api/v1/users/sign-in')
        .set('content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: '1234567',
          role: constants.USER_ROLE.VENDOR,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.email).toBe('test@test.com');
          expect(res.body.role).toBe(constants.USER_ROLE.VENDOR);
          expect(res.body.token).toBeDefined();
          done();
        })
        .catch(done);
    });

    it('Should sign in successfully with email test@test.com and role USER', (done) => {
      request(app)
        .post('/api/v1/users/sign-in')
        .set('content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: '1234567',
          role: constants.USER_ROLE.USER,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.email).toBe('test@test.com');
          expect(res.body.role).toBe(constants.USER_ROLE.USER);
          expect(res.body.token).toBeDefined();
          done();
        })
        .catch(done);
    });

    it('Should fail when sign in with random email and role USER', (done) => {
      request(app)
        .post('/api/v1/users/sign-in')
        .set('content-type', 'application/json')
        .send({
          email: 'test1@test.com',
          password: '1234567',
          role: constants.USER_ROLE.USER,
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            constants.ERROR_MESSAGE.INVALID_EMAIL_PASSWORD
          );
          done();
        })
        .catch(done);
    });

    it('Should fail when sign in with random email and role VENDOR', (done) => {
      request(app)
        .post('/api/v1/users/sign-in')
        .set('content-type', 'application/json')
        .send({
          email: 'test1@test.com',
          password: '1234567',
          role: constants.USER_ROLE.VENDOR,
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            constants.ERROR_MESSAGE.INVALID_EMAIL_PASSWORD
          );
          done();
        })
        .catch(done);
    });
  });
});
