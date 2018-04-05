const logger = require('../classes/logger.js')

const a = new logger('ratelimit')

let ips = []
let rejects = []
let rejects_limit = 10
let limit = 3

setInterval(() => {
  for(let i = 0; i < ips.length; i++) {
    if(ips[i] > limit) {
      if(!rejects[ip]) rejects[ip] = 0

      rejects[ip]++
    }
  }

  ips = []
}, 1000)

setInterval(() => { rejects = [] }, 60000)

function ratelimit(req, res, next) {
  let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '')

  if(!rejects[ip]) rejects[ip] = 0

  if(rejects[ip] > rejects_limit) {
    a.log('rejected (hard)', req.path, ip)

    return res.json({ success: false, err: 'Rate limit' })
  }

  if(!ips[ip]) ips[ip] = 0

  ips[ip]++

  if(ips[ip] > limit) {
    a.log('rejected', req.path, ip)

    return res.json({ success: false, err: 'Rate limit' })
  }

  next()
}

module.exports = ratelimit