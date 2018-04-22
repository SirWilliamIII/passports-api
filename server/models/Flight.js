const mongoose = require('mongoose')
const Flight = mongoose.model('Flight', {
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
		type:     String
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

module.exports = { Flight }
