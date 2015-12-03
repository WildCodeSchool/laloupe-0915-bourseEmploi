/* --------------------------------------------- *\
					PASSPORT
\* --------------------------------------------- */

var passport		= require('passport');
var LocalStrategy	= require('passport-local').Strategy;
var User			= require('../app/models/user.js');
var Recruiter		= require('../app/models/recruiter.js');


module.exports = function () {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


  passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	function(username, password, done) {
		User.find(username, password, function(err, user){
			if (user === null)
				return done(null, false, {message: "E-mail et/ou mot de passe incorrecte"});
			else
				return done(null, user);
		});
	}));

};



/*
module.exports = function () {
  // serialize sessions
  passport.serializeRecruiter(function(recruiter, done) {
    done(null, recruiter);
  });

  passport.deserializeRecruiter(function(recruiter, done) {
    done(null, recruiter);
  });


  passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	function(username, password, done) {
		Recruiter.find(username, password, function(err, recruiter){
			if (recruiter === null)
				return done(null, false, {message: "E-mail et/ou mot de passe incorrecte"});
			else
				return done(null, recruiter);
		});
	}));

};

*/