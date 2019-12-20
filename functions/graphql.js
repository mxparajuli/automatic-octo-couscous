// lambda.js
'use strict'

const app = require('./graphql/graphql')
const serverless = require('serverless-http')

exports.handler = serverless(app)
