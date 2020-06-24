# joi-bcp47

[![Build Status](https://travis-ci.org/tjdavey/joi-bcp47.svg?branch=master)](https://travis-ci.org/tjdavey/joi-bcp47)
[![Coverage Status](https://coveralls.io/repos/github/tjdavey/joi-bcp47/badge.svg)](https://coveralls.io/github/tjdavey/joi-bcp47)
[![Known Vulnerabilities](https://snyk.io/test/github/tjdavey/joi-bcp47/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjdavey/joi-bcp47?targetFile=package.json)
[![npm version](https://badge.fury.io/js/joi-bcp47.svg)](https://badge.fury.io/js/joi-bcp47)

Provides a Joi rule to validate and parse BCP47 language tags (eg. `en-US`, `ur-PK`, `zh-Hant-TW`). 

Note: Only supports Joi 16.x or higher. Does not validate the components of the BCP47 tag (eg. language or region codes)

## Installation:

**npm:** `npm install joi-bcp47`

**yarn:** `yarn add joi-bcp47`

## Usage

```js
import BaseJoi from 'joi';
import JoiBcp47 from 'joi-bcp47';

const Joi = BaseJoi.extend(JoiBcp47);

Joi.bcp47().validate('en-US');
// returns {error: null, value: 'en-US'}
```

### Rules

#### `parse` - Parse the BCP47 tag into an object

When added to the validation chain returns a [bcp47 parse object](https://github.com/gagle/node-bcp47/blob/master/examples/sample.js) which parses the BCP47 tag out to its individual components. 

```js
Joi.bcp47().parse().validate('hy-Latn-IT-arevela');
/*
    returns {
        error: null,
        value: {
            langtag: {
                language: {
                    language: "hy",
                    extlang: []
                },
                script: "Latn",
                region: "IT",
                variant: ["arevela"],
                extension: [],
                privateuse: []
            },
            privateuse: [],
            grandfathered: {
                irregular: null,
                regular: null
            }
        }
    }
*/
```
