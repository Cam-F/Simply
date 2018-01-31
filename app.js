// Requiring Modules
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes');
const passport = require('passport');
const models = require('./models');
require('./config/passport')(passport);


// Init app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: BodyParse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

// Middleware: Public Folder
app.use(express.static(__dirname + '/public'));

// Middleware: PUG Templating engine
app.set('view engine', 'pug');

// Middleware: Passport
app.use(passport.initialize());
app.use(passport.session());

// Handling Routes
app.use("/", mainRoutes);

// Creating an error handler
app.use( (err, req, res, next) => { // If an error has been passed from a middleware this error handler will catch it
    res.locals.err = err;
    res.render('error');
});

// Start Server after connection to DB
models.sequelize
    .sync()
        .then( () => {
            app.listen(PORT, () => console.log('Simply app listening on port: ' + PORT));
        });


