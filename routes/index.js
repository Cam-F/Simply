const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../config/passport')(passport);

// Requiring Model
const models = require('../models');


// GET "/": Display homepage
router.get('/', (req, res) => {
    res.render('index');
});

// GET "/events": Display all events available
router.get('/events', (req, res) => {
    // Look for all events in the database
    models.Events.findAll()
        .then( (dataDB) => {
            res.render('events2', { dataDB });
        });
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
            
            // CREATE USER IN DB
            models.Events.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }).then( (dataDB) => {
                // store user's ID from DB into the sesssion (so user is immediately logged in)
                //req.session.userId = user._id;
                res.redirect('/user');
            });
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
            passport.authenticate('local', { 
                successRedirect: '/user',
                failureRedirect: '/' 
            })(req, res, next);
            // // If there's an error or the user doesn't exist
            // if (error || !user) {
            //     const err = new Error('Wrong email or password');
            //     err.status = 401;
            //     next(err);
            // }
            // else {
            //     // store user's ID from DB into the sesssion
            //     req.session.userId = user._id;
            //     res.redirect('/user');
            // }
    }
    else {
        // If a field is blank
        let err = new Error("All fields are required");
        err.status = 400;
        next(err);
    }
});

// PUT "/createEvents": Creating events
router.put('/createEvents', (req, res, next) => {
    
    // Check that all fields have been filled by user
    if (req.body.newEventName &&
        req.body.newEventType &&
        req.body.newEventCode &&
        req.body.newEventDate &&
        req.body.newEventCity &&
        req.body.newEventState &&
        req.body.newEventCode) {
        
        // Update the records using this new data
        models.Events.update(
            {   
                name: req.body.newEventName,
                type: req.body.newEventType,
                date: req.body.newEventDate,
                city: req.body.newEventCity,
                state: req.body.newEventState,
                code: req.body.newEventCode
            },
            {
                where: { username: 'jpgiraldo' }    // Only update this user
            }
        )
        .then( (rowsUpdated) => {
            console.log(rowsUpdated);
        });
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
    // Look for all events in the database with a specific code
    models.Events.findAll({
        where: {
            code: '111'
        }
    })
    .then( (dataDB) => {
        let guests = [];
        dataDB.forEach( guest => {
            guests.push(guest.dataValues);
        })
        res.render('user', { user: guests });
    });
});

router.put('/user/item', (req, res) => {
    // console.log(req.body);
    const user = {
        item: req.body
    };
    console.log(user);
});

module.exports = router;