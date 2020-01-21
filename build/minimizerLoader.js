'use strict'

const TerserPlugin = require('terser-webpack-plugin')

function getMinimizerLoaders() {
  const minimizers = process.env.NODE_ENV !== 'production' ? [] : []

  return minimizers
}

module.exports = getMinimizerLoaders
