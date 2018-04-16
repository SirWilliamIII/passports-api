const express = require('express'),
      bodyParser = require('body-parser')


const { mongoose } = require('./db/mongoose')
const { AirportArrivals } = require('./models/AirportArrival')

const app = express(),
      port = 3333

app.use(bodyParser.json())

app.post('/arrivals', (req, res) => {

	res.send(req.body)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
