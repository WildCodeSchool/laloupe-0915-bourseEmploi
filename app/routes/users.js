/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var User = require('../models/user.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/users', Auth.user.isAdministrator, User.findAll);

	app.get('/users/:id', Auth.user.isAdministrator, User.findById);

	app.post('/users', User.create);

	app.put('/users/:id', Auth.user.hasAuthorization, User.update);

	app.delete('/users/:id', Auth.user.isAdministrator, User.delete);

}