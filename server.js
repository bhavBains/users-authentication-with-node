const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('cookie-session');
const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')[env];
const knex = require('knex')(knexConfig);
const knexLogger = require('knex-logger'); 
const usersRoutes = require('./usersRoutes');
const loginRoute = require('./loginRoute');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET || 'it is a secret to everyone'
}));


app.listen(8080, () => {
	console.log("server is up at PORT 8080")
});

app.use('/users', usersRoutes(knex));
app.use('/login', loginRoute(knex));

app.get('/', (req,res) => {
	res.render('index', {
		errors: req.flash('error'),
		info: req.flash('info'),
		loginErrors: req.flash('login-error'),
		loginInfo: req.flash('login-info'),
		
	});
});