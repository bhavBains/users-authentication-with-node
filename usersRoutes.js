const express = require('express');

module.exports = function (knex) {
	const router = new express.Router();
	
	router.post('/', (req,res) => {
		const {email,password} = req.body;
		if (!email || !password) {
			let error = "All fields required";
			res.status(400).render('index', {error: error})
		} else (
			res.status(200).redirect('/')
			)
	});

	return router;
}