const { createPostGraphileSchema } = require('postgraphile-core')
const { options, cachePath } = require('./postgraphileOptions')
const pg = require('pg')

const schemas = ['public']

async function main() {
  const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  })
  await createPostGraphileSchema(pgPool, schemas, {
    ...options,
    writeCache: cachePath
  })
  await pgPool.end()
}

main().then(null, e => {
  console.error(e)
  process.exit(1)
})
