/* ------------------------------------------------------------------------- *\
	 						    ROUTES Students
\* ------------------------------------------------------------------------- */

var Student = require('../models/student.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

	app.get('/students/id/:id', Auth.user.hasAuthorization, Student.findById);

	app.get('/students/:type', Auth.user.isAdministrator, Student.findByType);

	app.get('/students', Auth.user.isAdministrator, Student.findAll);

    app.post('/students', Student.create);

	app.put('/students/:id', Auth.user.hasAuthorization, Student.update);

	app.delete('/students/:id', Auth.user.isAdministrator, Student.delete);

}
