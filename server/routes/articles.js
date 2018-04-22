const express = require('express'),
      router = express.Router(),
      { mongoose } = require('../db/mongoose'),
      { Article } = require('../models/Article')


router.get('/', (req, res) => {
	Article.find()
		.then(articles => {
			console.log(articles)
			res.send(articles)
		}, e => {
			res.status(400).send(e)
		})
})

router.post('/api', (req, res) => {
	const article = new Article({
		title: req.body.title,
		body: req.body.body,
		createdAt: req.body.createdAt,
		updatedAt: req.body.updatedAt,
		tagList: req.body.tagList,
		description: req.body.description,
		author: req.body.author,
		username: req.body.username,
		bio: req.body.bio,
		image: req.body.image
	})
	article.save()
		.then(doc => {
			console.log('success')
			res.send(doc.json())
		}, e => {
			res.status(400).send(e)
		})
})

module.exports = router
