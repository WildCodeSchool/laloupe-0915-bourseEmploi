/* ------------------------------------------------------------------------- *\
	 						    ROUTES TODOS
\* ------------------------------------------------------------------------- */

var Todo = require('../models/todo.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/todos', Auth.user.hasAuthorization, Todo.findAll);

	app.post('/todos', Auth.user.hasAuthorization, Todo.create);

	app.put('/todos/:id', Auth.user.hasAuthorization, Todo.update);

	app.delete('/todos/:id', Auth.user.hasAuthorization, Todo.delete);

}