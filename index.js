const express = require('express'); 
const app = express(); 
const path = require('path');
const queryString = require('querystring'); 

app.use(express.static(path.join(__dirname, 'build'))); 

app.use(require('cors')());

app.get('/api/:p', (req, res) => {
	const url = 'https://api.deezer.com/'+req.params.p+'?'+queryString.stringify(req.query) ; 
	require('axios')
		.get(url)
		.then(response => res.send(response.data));
	console.log(url);
});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html')); 
});

app.listen(process.env.PORT || 8080);
