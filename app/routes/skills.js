/* ------------------------------------------------------------------------- *\
	 						    ROUTES SKILLS
\* ------------------------------------------------------------------------- */

var Skill = require('../models/todo.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/skills', Auth.user.hasAuthorization, Skill.findAll);

	app.post('/skills', Skill.create);

	app.put('/skills/:id', Auth.user.hasAuthorization, Skill.update);

	app.delete('/skills/:id', Auth.user.hasAuthorization, Skill.delete);

}