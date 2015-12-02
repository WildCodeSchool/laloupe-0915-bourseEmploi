/* ------------------------------------------------------------------------- *\
	 						ROUTES CONNECT
\* ------------------------------------------------------------------------- */

var User = require('../models/user.js');
var Recruiter = require('../models/recruiter.js');

module.exports 	= function(app, passport) {

	app.get('/loggedin', function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.post('/login', passport.authenticate('local'), function(req, res) {
	  res.send(req.user);
	});

	app.post('/logout', function(req, res){
	  req.logOut();
	  res.sendStatus(200);
	});
}