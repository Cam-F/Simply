// Require Modules
const express = require('express');
const router = express.Router();

// GET "/": Display homepage
router.get('/', (req, res) => {
    res.render("index");
});

router.get('/events', (req, res) => {
    const user = [
        {
            id: 123,
            name: "Jean Paul",
            type: "BBQ",
            city: "Orlando",
            state: "FL"
        },
        {
            id: 456,
            name: "Madison",
            type: "BBQ",
            city: "Orlando",
            state: "FL"
        },
        {
            id: 789,
            name: "Harmin",
            type: "Wedding",
            city: "Sanford",
            state: "FL"
        },
        {
            id: 645,
            name: "Cameron",
            type: "Birthday",
            city: "Melbourne",
            state: "FL"
        }
    ]

    res.render("events2", { user });

});

// POST "/signup": User signs up
router.post('/register', (req, res, next) => {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.confirmPassword) {
            // All fields are filled out
            // Check if matching password
            if (req.body.password !== req.body.confirmPassword) {
                let err = new Error("Password do not match");
                err.status = 400;
                next(err);
            } 
            // If passwords match match
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password 
            };
            
            // CREATE USER IN DB
            // CODE!!!!
                // store user's ID from DB into the sesssion (so user is immediately logged in)
                req.session.userId = user._id;
                res.redirect('/user');
    }
    else {
        // If a field is blank
        let err = new Error("All fields are required");
        err.status = 400;
        next(err);
    }

});

// POST "/login": User logs in
router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        // If both fields are filled out
        // Authenticate on database PENDING!!!!!
            // CODE TO AUTHENTICATE ON DB

            // If there's an error or the user doesn't exist
            if (error || !user) {
                const err = new Error('Wrong email or password');
                err.status = 401;
                next(err);
            }
            else {
                // store user's ID from DB into the sesssion
                req.session.userId = user._id;
                res.redirect('/user');
            }
    }
    else {
        // If a field is blank
        let err = new Error("All fields are required");
        err.status = 400;
        next(err);
    }
});

// POST "/createEvents": Creating events
router.post('/createEvents', (req, res, next) => {
    // All fields 
    if (req.body.newEventName &&
        req.body.newEventType &&
        req.body.newEventCode) {

            const newEvent = {
                name: req.body.newEventName,
                type: req.body.newEventType,
                code: req.body.newEventType
            }

            // Store it in DB
                // CODE!!!!!
    }
    else {
        // If a field is blank
        let err = new Error("All fields are required");
        err.status = 400;
        next(err);
    }
});

// POST "/joinEvents": Joining existing events
router.post('/joinEvents', (req, res, next) => {
    if (req.body.newEventName) {
        // look for the event in the db
            // If event not found
            if (!event) {
                // If a field is blank
                let err = new Error("All fields are required");
                err.status = 400;
                next(err);
            } 
            else {
                res.redirect('/user')
            }
        
    }
    else {
        // If a field is blank
        let err = new Error("All fields are required");
        err.status = 400;
        next(err);
    }
});

// GET "/user": Dashboard
router.get('/user', (req, res) => {
    res.render("user"); // Pass all data needed
});

module.exports = router;