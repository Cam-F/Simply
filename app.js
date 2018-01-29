// Requiring Modules
const express = require('express');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes');

// Init app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware: BodyParse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware: Public Folder
app.use(express.static(__dirname + '/public'));

// Middleware: PUG Templating engine
app.set('view engine', 'pug');

// Handling Routes
app.use("/", mainRoutes);

// Creating an error handler
app.use( (err, req, res, next) => { // If an error has been passed from a middleware this error handler will catch it
    res.locals.err = err;
    res.render('error');
});

// Start Server
app.listen(PORT, () => console.log('Example app listening on port: ' + PORT));