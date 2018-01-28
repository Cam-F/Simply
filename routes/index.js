// Require Modules
const express = require('express');
const router = express.Router();

// GET "/": Display homepage
router.get('/', (req, res) => {
    res.render("index");
});

// POST "/signup": User signs up
router.post('/register', (req, res, next) => {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.confirmPassword) {
            // All fields filled 
            // Check if matching password
            if (req.body.passwor !== req.body.confirmPassword) {
                let err = new Error("Password do not match");
                err.status = 400;
                next(err);
            } 
            // If they match
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password 
            };

            // CREATE USER IN DB
        }
    else {
        // If a field is blank
        let err = new Error("All fields are required");
        err.status = 400;
        next(err);
    }

    console.log(req.body);
    res.end();
});

// GET "/login": User logs in
router.get('/login', (req, res) => {
    res.render("login");
});

// GET "/create": Creating events
router.get('/events', (req, res) => {
    res.render("events");
});

// GET "/join": Join events
router.get('/create', (req, res) => {
    res.render("create");
});

router.get('/join', (req, res) => {
    res.render("join");
});

router.get('/user', (req, res) => {
    res.render("user");
});

module.exports = router;