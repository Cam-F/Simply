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
            }).then( user => {
                req.session.userId = user.username;
                req.session.authenticated = true;
                console.log(req.session);
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
router.post('/login', 
    passport.authenticate('local-signin',  
    { 
        successRedirect: '/user',
        failureRedirect: '/'
    }
));


// PUT "/createEvents": Creating events
router.put('/createEvents', (req, res, next) => {
    //res.send(req.body);
    // Check that all fields have been filled by user
    if (req.body.newEventName &&
        req.body.newEventType &&
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
                where: { username: req.session.userId }    // Only update this user
            }
        )
        .then( data => {
            req.session.eventCreated = req.body.newEventCode;
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

// POST "/joinEvents": Joining existing events
router.put('/joinEvent', (req, res) => {
    models.Events.findOne({ where: { code: req.body.newEventCode} })
        .then( event => {
            console.log(event.dataValues);

            models.Events.update({ 
                name: event.dataValues.name,
                type: event.dataValues.type,
                date: event.dataValues.date,
                city: event.dataValues.city,
                state: event.dataValues.state, 
                code: req.body.newEventCode
            },
                {
                    where: { username: req.session.userId }    // Only update this user
                }
            )
            .then( data => res.redirect('/user') );
        });
});


// GET "/user": Dashboard
router.get('/user', (req, res, next) => {
    models.Events.findOne({ where: { username: req.session.userId } })
        .then( events => {
            if (events.dataValues.code !== 0) {
                models.Events.findAll({ where: { code: events.dataValues.code } })
                    .then( allEvents => {

                        res.render('user', { events: events.dataValues, allEvents: allEvents });
                    });
            }
            else {
                res.render('user', { events: events.dataValues });
            }
    });
});

router.put('/newItem', (req, res) => {
    // Update the records using this new data
    models.Events.update({ items: req.body.newItem },
        {
            where: { username: req.session.userId }    // Only update this user
        }
    )
    .then( data => res.redirect('/user') );
});


// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;