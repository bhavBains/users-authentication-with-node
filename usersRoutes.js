const express = require('express');
const bcrypt = require('bcrypt');

module.exports = function (knex) {
	const router = new express.Router();
	
	router.post('/', (req,res) => {
		const {email,password} = req.body;
		if (!email || !password) {
			//if not using flash
			// let error = "All fields required";
			// res.status(400).render('index', {error: error})
			req.flash('error', 'All fields are required');
			res.redirect('/');
			return;
		}

		knex('users').select(1).where('email',email).then((rows) => {
			if (rows.length) {
				return Promise.reject({
					message: 'email is already taken'
				});
			} else {
				return bcrypt.hash(password, saltRounds);
			}
		}).then((passwordDigest) => {
			return knex('users').insert({
				email: email,
				password_digest: passwordDigest
			}) && id;
		}).then((id) => {
			req.session.userId = id;
			req.flash('info', 'Account successfully created');
			res.redirect('/');
		}).catch((error) => {
			req.flash('error', error.message);
			res.redirect('/');
		});
	});

	return router;
}