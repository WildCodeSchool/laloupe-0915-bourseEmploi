/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var User = require('../models/user.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/users/one/:id', User.find);

    app.get('/users', User.findAll);

    app.get('/users/:id', User.findById);

    app.post('/users', User.create);

    app.put('/users/:id', User.update);

    app.delete('/users/:id', User.delete);

}