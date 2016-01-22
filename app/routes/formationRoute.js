/* ------------------------------------------------------------------------- *\
	 						    ROUTES Formation
\* ------------------------------------------------------------------------- */

var Formation = require('../models/formation.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/api/students/formations/:id', Auth.user.hasAuthorization, Formation.findByStudent);

	app.get('/api/formations/:id', Auth.user.hasAuthorization, Formation.findById);

	app.post('/api/formations', Auth.user.hasAuthorization, Formation.create);

	app.put('/api/formations/:id', Auth.user.hasAuthorization, Formation.update);

	app.delete('/api/formations/:id', Auth.user.hasAuthorization, Formation.delete);
}