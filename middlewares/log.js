/* Dependencies */
const cluster = require('cluster')
const logger = require('../classes/logger.js')

const a = new logger('express')

/* Logs all the paths requested by some client */
function log(req, res, next) {
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '')

  a.log(`[${cluster.worker.id}]`, `${ip} -> ${req.path}`)

  if(req.body) a.log(req.body)

  res.json = (function() {
    const cached_function = res.json

    return function() {
      a.log(arguments[0])

      const result = cached_function.apply(this, arguments)

      return result
    }
  })()

  next()
}

module.exports = log