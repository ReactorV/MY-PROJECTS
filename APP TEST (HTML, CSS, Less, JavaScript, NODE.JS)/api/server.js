const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  	fs = require('file-system'),
	  	dataFile = 'questions.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/questions', (req, res) => {
	res.send(fs.readFileSync(dataFile, 'utf8'));
});

app.listen(3000, () =>  console.log('Server has been started...'));