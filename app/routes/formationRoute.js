/* ------------------------------------------------------------------------- *\
	 						    ROUTES Formation
\* ------------------------------------------------------------------------- */

var Formation = require('../models/formation.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/formations/:studentId', Auth.user.hasAuthorization, Formation.findByStudent);

	app.get('/formations/:id', Auth.user.hasAuthorization, Formation.findById);

	app.post('/formations', Auth.user.hasAuthorization, Formation.create);

	app.put('/formations/:id', Auth.user.hasAuthorization, Formation.update);

	app.delete('/formations/:id', Auth.user.hasAuthorization, Formation.delete);
}