exports.cachePath = `${__dirname}/postgraphile.cache`
exports.options = {
  dynamicJson: true,
  disableDefaultMutations: true,
  graphqlRoute: '/.netlify/functions/graphql',
  graphiql: false,
  disableQueryLog: true
}
