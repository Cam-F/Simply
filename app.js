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
app.use(express.static("app/public"));

// Handling Routes
app.use("/", mainRoutes);

// Start Server
app.listen(3000, () => console.log('Example app listening on port 3000!'));