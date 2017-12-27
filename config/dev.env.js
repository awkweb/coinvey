'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  stripe: {
    key: '"pk_test_VFndrTFCnus2nq4FHBQIseds"',
  },
});
