const mongoose = require('mongoose')

const AirportArrival = mongoose.model('AirportArrival', {
	city:    {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	country: {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	airport: {
		type:     String,
		trim:     true
	},
	isArrival: {
		type: Boolean
	},
	date:    {
		type:     Date,
		required: true,
		default:  null
	}
})

module.exports = { AirportArrival }
