const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    // Local Strategy
    passport.use(new LocalStrategy( (username, password, done) => {
        // Match Username
        let query = { username: username };
        models.Events.findOne({ where: query })
            .then( (err, event) => {
                console.log(event);
                if (err) throw err;
                if (!event) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                // Match Password
                console.log(bcrypt.compareSync(password, event.password));
            
            });
    }));

    passport.serializeUser(function(event, done) {
        done(null, event.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, event) {
          done(err, event);
        });
    });
};