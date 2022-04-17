import Joi from 'joi';

import validatePayloadAndThrowIfNotValid from '../validate-payload-and-throw-if-not-valid.helper';

describe(validatePayloadAndThrowIfNotValid.name, () => {
  it('Should throw ValidationError when schema and payload do not match', () => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
    });

    try {
      validatePayloadAndThrowIfNotValid(schema, {});
    } catch (error) {
      expect(error).toBeInstanceOf(Joi.ValidationError);
    }
  });

  it('Should validate successfully when schema and payload match', () => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
    });

    const result = validatePayloadAndThrowIfNotValid(schema, {
      name: 'test',
    });

    expect(result).toStrictEqual({ name: 'test' });
  });
});
