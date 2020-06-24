const Joi = require('@hapi/joi');
const bcp47 = require('bcp47');

module.exports = {
  type: 'bcp47',
  base: Joi.string(),
  messages: {
    invalidSyntax: '"{{#label}}" must be a valid BCP47 language tag'
  },
  rules: {
    parse: {
      convert: true,
      method() {
        return this.$_setFlag('parse', true);
      }
    }
  },
  validate(value, helpers) {
    const parsedTag = bcp47.parse(value);

    if (!parsedTag) {
      return { value, errors: helpers.error('invalidSyntax')};
    }

    // The value must be a string for validation, so we can't use coerce to convert as this runs before validation
    if (helpers.schema.$_getFlag('parse') && helpers.prefs.convert) {
      return {value: parsedTag};
    }

    return {value};
  }
};
