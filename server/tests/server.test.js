const expect = require('expect')
const request = require('supertest')

const { app }            = require('./../server'),
      { AirportArrival } = require('../models/AirportArrival')

beforeEach(done => {
	AirportArrival.remove({})
		.then(() => {
			done()
		})
})


describe('POST /arrivals', () => {
	it('should create a new arrival CITY and COUNTRY', done => {
		var city = 'Somity'

		request(app)
			.post('/arrivals')
			.send({ city })
			.expect(200)

			.end((err, res) => {
				if(err) {
					return done(err)
				}
				AirportArrival.find()
					.then(arrivals => {
						expect((arrivals.length).toBe(1))
						done()
					})
					.catch(e => {
						done(e)
					})
			})
	})
})
