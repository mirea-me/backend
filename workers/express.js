/* Dependencies */
const express = require('express')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('../classes/logger.js')

const a = new logger('express')

/* Mongoose connect */
mongoose.connect(`mongodb://localhost/${global.config.db}`)

const db = mongoose.connection

db.on('disconnected', () => {
  a.log('db disconnected')
})

db.once('open', () => {
  a.log('db connected')
})

process.on('SIGINT', () => {
  db.close(() => {
    process.exit(0)
  })
})

/* ExpressJS stuff */
const app = express()

/* HTTPS */
if(global.config.express.https) {
  app.enable('trust proxy')

  app.all('*', (req, res, next) => {
    if(req.protocol === 'https') return next()
    res.redirect(global.config.express.host + req.url)
  })
}

/* Helmet middleware */
app.use(helmet())

/* Setting access */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

/* Setting up middlewares */
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(require('../middlewares/log.js'))

app.listen(global.config.express.port, () => {
  a.log(`listening on port ${global.config.express.port}`)
})

/* Session routes */
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

/* Setting up controllers */
app.use('/api', require('../controllers'))