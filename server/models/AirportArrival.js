const mongoose = require('mongoose')

const AirportArrival = mongoose.model('AirportArrival', {
	arrivalCity:    {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	arrivalCountry: {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	airportName:    {
		type:     String,
		required: true,
		trim:     true,
		default:  null
	},
	arrivalDate:    {
		type:     Date,
		required: true,
		default:  null
	}
})

module.exports = { AirportArrival }
