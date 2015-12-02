/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var User = require('../models/user.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {


    app.get('/users/one/:id', Auth.user.hasAuthorization, User.find);

    app.get('/users', Auth.user.hasAuthorization, User.findAll);

    app.get('/users/:id', Auth.user.hasAuthorization, User.findById);

    app.post('/users', User.create);

    app.put('/users/:id', Auth.user.hasAuthorization, User.update);

    app.delete('/users/:id', Auth.user.hasAuthorization, User.delete);

}