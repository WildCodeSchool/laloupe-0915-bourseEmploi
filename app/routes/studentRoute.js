/* ------------------------------------------------------------------------- *\
	 						    ROUTES Students
\* ------------------------------------------------------------------------- */

var Student = require('../models/student.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/api/students/:id', Auth.user.hasAuthorization, Student.findById);

    app.post('/api/students', Auth.user.isAdministrator, Student.create);

    app.put('/api/students/:id', Auth.user.hasAuthorization, Student.update);

    app.delete('/api/students/:id', Auth.user.isAdministrator, Student.delete);

}