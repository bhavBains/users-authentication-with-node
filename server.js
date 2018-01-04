const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(8080, () => {
	console.log("server is up at PORT 8080")
});

app.get('/', (req,res) => {
	res.render('index');
});