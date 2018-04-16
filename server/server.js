const express = require('express'),
      bodyParser = require('body-parser')


const { mongoose } = require('./db/mongoose')
const { AirportArrival } = require('./models/AirportArrival')

const app = express(),
      port = 3333

app.use(bodyParser.json())

app.post('/api', (req, res) => {
	const arrival = new AirportArrival({
		city: req.body.city,
		country: req.body.country,
		airport: req.body.airport,
		date: req.body.date
	})
	arrival.save()
		.then(doc => {
			res.send(doc)
		}, e => {
			res.status(400).send(e)
		})
})

app.get('/api', (req, res) => {
	AirportArrival.find()
		.then(arrival => {
			res.send({ arrival })
		}, e => {
			res.status(400).send(e)
		})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

module.exports = { app }
