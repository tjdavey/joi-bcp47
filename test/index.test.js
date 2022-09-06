const BaseJoi = require('joi');
const {assert} = require('chai');
const JoiBcp47 = require('../lib');

const Joi = BaseJoi.extend(JoiBcp47);

describe('string', () => {
  describe('bcp47()', () => {
    it('validates a basic valid bcp47 tag', () => {
      const testValue = Joi.bcp47().validate('en-AU');
      assert.isNotOk(testValue.error, 'should not produce an error');
      assert.equal(testValue.value, 'en-AU');
    });

    it('validates a more complex valid bcp47 tag', () => {
      const testValue = Joi.bcp47().validate('ms-Arab-CC'); // Malay written in Arabic script
      assert.isNotOk(testValue.error, 'should not produce an error');
      assert.equal(testValue.value, 'ms-Arab-CC');
    });

    it('validates a valid bcp47 tag and returns an object with parse flag enabled', () => {
      const testValue = Joi.bcp47().parse().validate('zh-Hant-HK');
      assert.isNotOk(testValue.error, 'should not produce an error');
      assert.deepEqual(testValue.value, {
        langtag: {
          language: {language: 'zh', extlang: []},
          script: 'Hant',
          region: 'HK',
          variant: [],
          extension: [],
          privateuse: []
        },
        privateuse: [],
        grandfathered: {irregular: null, regular: null}
      });
    });

    it('return error for a valid bcp47 tag', () => {
      const testValue = Joi.bcp47().validate('-ABC');
      assert.isOk(testValue.error, 'should produce an error');
      assert.equal(testValue.error.details[0].message, '"value" must be a valid BCP47 language tag',
        'should produce a string error');
    });

    it('return error if bcp47 tag is not a string', () => {
      const testValue = Joi.bcp47().validate(2);
      assert.isOk(testValue.error, 'should produce an error');
      assert.equal(testValue.error.details[0].message, '"value" must be a string', 'should produce a string error');
    });
  });
});
