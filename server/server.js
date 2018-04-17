const express      = require('express'),
      bodyParser   = require('body-parser'),
      _            = require('lodash'),
      { ObjectID } = require('mongodb')


const { mongoose } = require('./db/mongoose')
const { Flight } = require('./models/Flight')

const app  = express(),
      port = process.env.PORT || 3333

app.use(bodyParser.json())

app.post('/api', (req, res) => {
	const arrival = new Flight({
		city:      req.body.city,
		country:   req.body.country,
		airport:   req.body.airport,
		isArrival: req.body.isArrival,
		date:      req.body.date
	})
	arrival.save()
		.then(doc => {
			res.send(doc)
		}, e => {
			res.status(400).send(e)
		})
})

app.get('/api', (req, res) => {
	Flight.find()
		.then(flight => {
			res.send({ flight })
		}, e => {
			res.status(400).send(e)
		})
})

app.get('/api/:id', (req, res) => {
	const id = req.params.id
	Flight.findById(id)
		.then(flight => {
			res.send({ flight })
		}, e => {
			res.status(400).send(e)
		})
})

// app.delete('/api/deleteall', (req, res) => {
// 	AirportArrival.remove({})
// 		.then(arrival => {
// 			console.log(arrival)
// 			res.send({ arrival })
// 		}, e => {
// 			res.status(400).send(e)
// 		})
// })

app.delete('/api/:id', (req, res) => {
	const id = req.params.id
	Flight.findByIdAndRemove(id)
		.then(flight => {
			if(!flight) {
				return res.status(400).send()
			}
			res.send('Flight deleted')
		})
		.catch(e => {
			res.status(400).send(e)
		})
})

app.patch('/api/:id', (req, res) => {
	const id = req.params.id
	let body = _.pick(req.body, ['city', 'country', 'date', 'airport'])

	Flight.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then(flight => {
			if(!flight) {
				return res.send(404).send()
			}
			res.send({flight})

		}).catch(e => {
			res.status(400).send(e)
	})
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

module.exports = { app }
