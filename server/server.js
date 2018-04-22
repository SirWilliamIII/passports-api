const express      = require('express'),
      path         = require('path'),
      bodyParser   = require('body-parser'),
      _            = require('lodash'),
      { ObjectID } = require('mongodb'),
      logger = require('morgan')

const flightsRouter = require('./routes/flights')
const articleRouter = require('./routes/articles')

const app  = express(),
      hbs  = require('hbs'),
      port = process.env.PORT || 3333

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

app.use('/flights', flightsRouter)
app.use('/articles', articleRouter)

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/welcome.html'))
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

module.exports = { app }
