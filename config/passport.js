const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const bcrypt = require('bcryptjs');


module.exports = function(passport, user){

    passport.serializeUser(function(event, done) {
        done(null, event.id);
    });
        
    passport.deserializeUser(function(id, done) {
        models.Events.findById(id, function(err, event) {
            done(err, event);
        });
    });
//LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
    
        function(req, email, password, done) {
            var isValidPassword = function(userpass, password){
                return bcrypt.compareSync(password, userpass);
            };
    
            models.Events.findOne({ where : { email: email } }).then(function (user) {
                
                if (!user) {
                    console.log("email not found");
                    return done(null, false);
                }
    
                if (!isValidPassword(user.password, password)) {
                    console.log("WRONG PASSWORD");
                    return done(null, false);
                }
                
                // user.get() => gets the revelant part of the user info from the db
                var userinfo = user.get();
                // Storing the username into the req.session to make it available to all routes
                req.session.userId = userinfo.username;
                // Authenticating session
                req.session.authenticated = true;
                // return the user info to our routes
                return done(null, userinfo);
    
            }).catch(function(err){
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));


};