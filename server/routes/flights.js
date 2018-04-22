const express = require('express'),
    router = express.Router(),
    { mongoose } = require('../db/mongoose'),
    { Flight } = require('../models/Flight')

router.get('/', (req, res) => {
    Flight.find()
        .then(flights => {
            res.send(flights)
        }, e => {
            res.status(400).send(e)
        })
})

router.post('/api', (req, res) => {
    const arrival = new Flight({
        city:      req.body.city,
        country:   req.body.country,
        airport:   req.body.airport,
        isArrival: req.body.isArrival,
        date:      req.body.date
    })
    arrival.save()
        .then(doc => {
            console.log('success')
        }, e => {
            res.status(400).send(e)
        })
})

router.get('/api', (req, res) => {
    Flight.find()
        .then(flights => {
            res.render('about', { pageTitle: 'Title' , flight: flights })
        }, e => {
            res.status(400).send(e)
        })

})

router.get('/api/:id', (req, res) => {
    const id = req.params.id
    Flight.findById(id)
        .then(flight => {
            res.send({ flight })
        }, e => {
            res.status(400).send(e)
        })
})

// router.delete('/api/deleteall', (req, res) => {
//  AirportArrival.remove({})
//      .then(arrival => {
//          console.log(arrival)
//          res.send({ arrival })
//      }, e => {
//          res.status(400).send(e)
//      })
// })

router.delete('/api/:id', (req, res) => {
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

router.patch('/api/:id', (req, res) => {
    const id = req.params.id
    let body = _.pick(req.body, ['city', 'country', 'date', 'airport'])

    Flight.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(flight => {
            if(!flight) {
                return res.send(404).send()
            }
            res.send({ flight })

        }).catch(e => {
        res.status(400).send(e)
    })
})


module.exports = router
