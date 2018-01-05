const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')[env];
const knex = require('knex')(knexConfig);
const knexLogger = require('knex-logger'); 
const usersRoutes = require('./usersRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(8080, () => {
	console.log("server is up at PORT 8080")
});

app.use('/users', usersRoutes(knex));

app.get('/', (req,res) => {
	res.render('index');
});