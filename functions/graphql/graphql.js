const express = require('express')
const cors = require('cors')

const { postgraphile } = require('postgraphile')
const { options, cachePath } = require('./postgraphileOptions')

const schemas = ['public']

const connection = process.env.DATABASE_URL
const graphqlServer = postgraphile(connection, schemas, {
  ...options,
  readCache: cachePath
})

const hackReq = fn => (req, res, next) => {
  if (req.method === 'GET') {
    const payload = {
      query: req.query.query,
      operationName: req.query.operationName,
      variables: req.query.variables
    }
    const originalBody = req.body
    req.body = payload
    req.method = 'POST'
    delete req.headers['content-type']
    fn(req, res, err => {
      req.body = originalBody
      req.method = 'GET'
      next(err)
    })
  } else {
    fn(req, res, next)
  }
}

const app = express()
app.use(cors())
app.use(hackReq(graphqlServer))

module.exports = app
