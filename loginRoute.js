const express = require('express');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (knex) => {
	const router = new express.Router();

	router.post('/', (req,res) => {
		const email = req.body.email;
		const password = req.body.password;
		var hashedPassword;

		if (!email || !password) {
			req.flash('login-error', 'please enter your email and password');
			res.redirect('/');
		}

		knex('users').where('email', email).select('password_digest').then((rows) => {
			hashedPassword = rows[0].password_digest;
		});

		knex('users').where({
			'email': email,
			'password_digest': bcrypt.compare(password, hashedPassword, (err,res) => {
					if (err) {
						req.flash('login-error', err)
					}
				})
			}).then((rows) => {
			if (rows.length === 0) {
				return Promise.reject({
					message: 'Not found, please try again'
				});
			} else {
				return rows[0].id
			}
		}).then((id) => {
			req.session.userId = id;
			req.flash('login-info', `Welcome ${email}`);
			res.redirect('/');
		}).catch((error) => {
			req.flash('login-error', error.message);
			res.redirect('/');
		})
	});

	return router;
}