const expect = require('expect')
const request = require('supertest')

const { app }            = require('./../server'),
      { Flight } = require('../models/Flight')

beforeEach(done => {
	Flight.remove({})
		.then(() => {
			done()
		})
})


describe('POST /api', () => {
	it('should create a new arrival CITY and COUNTRY', done => {
		const city = 'Test City'

		request(app)
			.post('/api')
			.send({ city })
			.expect(200)

			.end((err, res) => {
				if(err) {
					return done(err)
				}
				Flight.find()
					.then(flights => {
						expect((flights.length).toBe(1))
						done()
					})
					.catch(e => {
						done(e)
					})
			})
	})
})
