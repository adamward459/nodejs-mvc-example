import _ from 'lodash';
import mongoose from 'mongoose';
import request from 'supertest';

import helpers from '../../src/helpers';
import { app } from '../../src/server';
import dummyData from '../dummy-data';

describe('POST /api/v1/products', () => {
  beforeAll(async () => {
    await mongoose.connection.collection('products').drop();
    await dummyData.insertUsers();
  });

  it('Should return status 401 when authorization header is not set', (done) => {
    request(app)
      .post('/api/v1/products')
      .set('content-type', 'application/json')
      .send({})
      .expect(401, done);
  });

  describe('When caller is not a vender', () => {
    it('Should return status 403', (done) => {
      request(app)
        .post('/api/v1/products')
        .set('content-type', 'application/json')
        .auth(dummyData.getAuthToken('USER') as string, {
          type: 'bearer',
        })
        .send({})
        .expect(403, done);
    });
  });

  describe('When caller is a vendor', () => {
    describe('When payload is invalid', () => {
      const tests = [
        {
          payload: {},
          description: 'Should return status 400 when payload is empty',
        },
        {
          payload: {
            name: '',
          },
          description: 'Should return status 400 when name is not 5 characters',
        },
        {
          payload: {
            price: 0,
          },
          description: 'Should return status 400 when price is less than 100',
        },
        {
          payload: {
            variants: [],
          },
          description:
            'Should return status 400 when variants is not enough elements',
        },
      ];

      tests.forEach((test) => {
        it(test.description, (done) => {
          request(app)
            .post('/api/v1/products')
            .set('content-type', 'application/json')
            .auth(dummyData.getAuthToken('VENDOR_1'), {
              type: 'bearer',
            })
            .send(test.payload)
            .expect(400, done);
        });
      });
    });

    describe('When payload is valid', () => {
      it('Should create a new product successfully', (done) => {
        request(app)
          .post('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('VENDOR_1'), {
            type: 'bearer',
          })
          .send({
            name: 'product',
            price: 1234,
            variants: [{ color: 'yellow' }],
          })
          .expect(201)
          .then((res) => {
            expect(res.body.name).toEqual('product');
            expect(res.body.price).toEqual(1234);
            expect(res.body.isPublished).toEqual(false);
            expect(res.body.variants).toStrictEqual([{ color: 'yellow' }]);
            done();
          })
          .catch(done);
      });
    });
  });
});

describe('GET /api/v1/products', () => {
  beforeAll(async () => {
    await dummyData.insertUsers();
    await dummyData.insertProducts();
  });

  it('Should return status 401 when authorization header is not set', (done) => {
    request(app)
      .get('/api/v1/products')
      .set('content-type', 'application/json')
      .send({})
      .expect(401, done);
  });

  describe('When caller is a user', () => {
    describe('When payload is invalid', () => {
      const tests = [
        {
          payload: { page: -1 },
          description: 'Should return status when `page` is lower than 1',
        },
        {
          payload: { limit: -1 },
          description: 'Should return status when `limit` is lower than 1',
        },
      ];
      tests.forEach((test) => {
        it(test.description, (done) => {
          request(app)
            .get('/api/v1/products')
            .set('content-type', 'application/json')
            .auth(dummyData.getAuthToken('USER'), {
              type: 'bearer',
            })
            .send(test.payload)
            .expect(400, done);
        });
      });
    });

    describe('When payload is valid', () => {
      it('Default payload({}) should return expected result', (done) => {
        request(app)
          .get('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('USER'), {
            type: 'bearer',
          })
          .send({})
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              data: dummyData
                .getProductsByUserType('VENDOR_1', true)
                .slice(0, 10),
              total: dummyData.getProductsByUserType('VENDOR_1', true).length,
              limit: 10,
              page: 1,
            });
            done();
          })
          .catch(done);
      });

      it('Payload with vendorId ({vendorId: "6251acb75b3a89fbb61b3801"}) should return expected result', (done) => {
        request(app)
          .get('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('USER'), {
            type: 'bearer',
          })
          .send({ vendorId: '6251acb75b3a89fbb61b3801' })
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              data: dummyData.getProductsByUserType('VENDOR_1').slice(0, 10),
              total: dummyData.getProductsByUserType('VENDOR_1').length,
              limit: 10,
              page: 1,
            });
            done();
          })
          .catch(done);
      });

      const randomPage = helpers.randomANumberInARange(1, 100);
      const randomLimit = helpers.randomANumberInARange(1, 100);
      it(`Random payload(page: ${randomPage}, limit: ${randomLimit}) should return expected result`, (done) => {
        request(app)
          .get('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('USER'), {
            type: 'bearer',
          })
          .send({ page: randomPage, limit: randomLimit })
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              data: dummyData
                .getProductsByUserType('VENDOR_1', true)
                .slice(
                  randomPage * randomLimit,
                  randomPage * randomLimit + randomLimit
                ),
              total: dummyData.getProductsByUserType('VENDOR_1', true).length,
              limit: randomLimit,
              page: randomPage,
            });
            done();
          })
          .catch(done);
      });
    });
  });

  describe('When caller is a vendor', () => {
    describe('When payload is invalid', () => {
      const tests = [
        {
          payload: { page: -1 },
          description: 'Should return status when `page` is lower than 1',
        },
        {
          payload: { limit: -1 },
          description: 'Should return status when `limit` is lower than 1',
        },
      ];
      tests.forEach((test) => {
        it(test.description, (done) => {
          request(app)
            .get('/api/v1/products')
            .set('content-type', 'application/json')
            .auth(dummyData.getAuthToken('VENDOR_1'), {
              type: 'bearer',
            })
            .send(test.payload)
            .expect(400, done);
        });
      });
    });

    describe('When payload is valid', () => {
      it('Default payload({}) should return expected result', (done) => {
        request(app)
          .get('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('VENDOR_1'), {
            type: 'bearer',
          })
          .send({})
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              data: dummyData.getProductsByUserType('VENDOR_1').slice(0, 10),
              total: dummyData.getProductsByUserType('VENDOR_1').length,
              limit: 10,
              page: 1,
            });
            done();
          })
          .catch(done);
      });

      it('Payload with vendorId ({vendorId: "6251acb75b3a89fbb61b3801"}) should return expected result', (done) => {
        request(app)
          .get('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('VENDOR_1'), {
            type: 'bearer',
          })
          .send({ vendorId: '6251acb75b3a89fbb61b3801' })
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              data: dummyData.getProductsByUserType('VENDOR_1').slice(0, 10),
              total: dummyData.getProductsByUserType('VENDOR_1').length,
              limit: 10,
              page: 1,
            });
            done();
          })
          .catch(done);
      });

      const randomPage = helpers.randomANumberInARange(1, 100);
      const randomLimit = helpers.randomANumberInARange(1, 100);
      it(`Random payload(page: ${randomPage}, limit: ${randomLimit}) should return expected result`, (done) => {
        request(app)
          .get('/api/v1/products')
          .set('content-type', 'application/json')
          .auth(dummyData.getAuthToken('VENDOR_1'), {
            type: 'bearer',
          })
          .send({ page: randomPage, limit: randomLimit })
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              data: dummyData
                .getProductsByUserType('VENDOR_1')
                .slice(
                  randomPage * randomLimit,
                  randomPage * randomLimit + randomLimit
                ),
              total: dummyData.getProductsByUserType('VENDOR_1').length,
              limit: randomLimit,
              page: randomPage,
            });
            done();
          })
          .catch(done);
      });
    });
  });
});

describe('PUT /api/v1/products/:productId', () => {
  beforeAll(async () => {
    await dummyData.insertProducts();
  });

  it('Should return status 401 when authorization header is not set', (done) => {
    request(app)
      .put('/api/v1/products/123')
      .set('content-type', 'application/json')
      .send({})
      .expect(401, done);
  });

  describe('When caller is not a vendor', () => {
    it('Should return status 403', (done) => {
      request(app)
        .put('/api/v1/products/123')
        .set('content-type', 'application/json')
        .auth(dummyData.getAuthToken('USER'), { type: 'bearer' })
        .send({})
        .expect(403, done);
    });
  });

  describe('When caller is a vendor', () => {
    it('Should return status 400 when productId is not valid', (done) => {
      request(app)
        .put('/api/v1/products/123')
        .set('content-type', 'application/json')
        .auth(dummyData.getAuthToken('VENDOR_1'), {
          type: 'bearer',
        })
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual('Invalid productId');
          done();
        })
        .catch(done);
    });

    it('Should return status 404 when not product is found', (done) => {
      request(app)
        .put('/api/v1/products/1251c55732100eef0b1b3493')
        .set('content-type', 'application/json')
        .auth(dummyData.getAuthToken('VENDOR_1'), {
          type: 'bearer',
        })
        .send({})
        .expect(404, done);
    });

    describe('When payload is invalid', () => {
      const tests = [
        {
          payload: {
            name: '',
          },
          description: 'Should return status 400 when name is not 5 characters',
        },
        {
          payload: {
            price: 0,
          },
          description: 'Should return status 400 when price is less than 100',
        },
        {
          payload: {
            variants: [],
          },
          description:
            'Should return status 400 when variants is not enough elements',
        },
      ];

      tests.forEach((test) => {
        it(test.description, (done) => {
          request(app)
            .put('/api/v1/products/6251c55732100eef0b1b3493')
            .set('content-type', 'application/json')
            .auth(dummyData.getAuthToken('VENDOR_1'), {
              type: 'bearer',
            })
            .send(test.payload)
            .expect(400, done);
        });
      });
    });

    describe('When payload is valid', () => {
      const tests = [
        {
          payload: {
            name: '123456',
          },
          description: 'Update name should work',
        },
        {
          payload: {
            price: 10001,
          },
          description: 'Update price should work',
        },
        {
          payload: {
            variants: [{ color: 'red' }],
          },
          description: 'Update variants should work',
        },
      ];

      tests.forEach((test) => {
        it(test.description, (done) => {
          request(app)
            .put('/api/v1/products/6251c55732100eef0b1b3493')
            .set('content-type', 'application/json')
            .auth(dummyData.getAuthToken('VENDOR_1'), {
              type: 'bearer',
            })
            .send(test.payload)
            .expect(200)
            .then((res) => {
              expect(_.pick(res.body, _.keys(test.payload))).toStrictEqual(
                test.payload
              );
              done();
            })
            .catch(done);
        });
      });

      describe('When a product is published', () => {
        it('Should return status 400 ', (done) => {
          request(app)
            .put('/api/v1/products/6251c55732100eef0b1b3494')
            .set('content-type', 'application/json')
            .auth(dummyData.getAuthToken('VENDOR_1'), {
              type: 'bearer',
            })
            .send({ name: '12345678' })
            .expect(400)
            .then((res) => {
              expect(res.body.message).toEqual(
                'Cannot update information of a published product'
              );
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
