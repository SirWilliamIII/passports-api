const mongoose = require('mongoose')

const Article = mongoose.model('Article', {
	title:       {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	body:        {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	createdAt:   {
		type: Date
	},
	updatedAt:   {
		type: Date
	},
	tagList:     {
		type: Array
	},
	description: {
		type:     String,
		required: false,
		trim:     true
	},
	author:      {
		type:      String,
		minlength: 1,
		required:  true,
		trim:      true
	},
	username:    {
		type: String,
		required: false
	},
	bio:         {
		type: String,
		required: false
	},
	image:       {
		type: String,
		required: false
	}
})

module.exports = { Article }
