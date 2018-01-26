// Require Modules
const express = require('express');
const router = express.Router();

// GET "/": Display homepage
router.get('/', (req, res) => {
    res.render("index");
});

// GET "/signup": User signs up
router.get('/signup', (req, res) => {
    res.render("register");
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