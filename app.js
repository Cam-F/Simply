// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Express App
const app = express();
const PORT = process.env.PORT || 8080;


// Data Parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("app/public"));


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));