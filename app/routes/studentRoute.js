/* ------------------------------------------------------------------------- *\
	 						    ROUTES Students
\* ------------------------------------------------------------------------- */

var Student = require('../models/student.js');
var User = require('../models/user.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/api/users/allUsers', Auth.user.isAdministrator, User.findAll); //find all users ( recruiters include)

    app.get('/api/users/students', Auth.user.hasAuthorization, Student.findByType);

    app.get('/api/students/:id', Auth.user.hasAuthorization, Student.findById);

    app.get('/api/infos/students', Auth.user.hasAuthorization, Student.findInfo);

    app.get('/api/students_promo', Auth.user.isAdministrator, Student.findByPromo);

    app.get('/api/alumnis', Auth.user.isAdministrator, Student.findAlumnis);

    app.post('/api/students', Auth.user.isAdministrator, Student.create);

    app.post('/api/statLang', Auth.user.isAdministrator, Student.findBySkill);

    app.post('/api/students/filter', /*Auth.user.isAdministrator,*/ Student.findFiltered);

    app.put('/api/students/:id', /*Auth.user.hasAuthorization,*/ Student.update);

    app.put('/api/like/students/:id', Auth.user.hasAuthorization, Student.like);

    app.put('/api/unlike/students/:id', Auth.user.hasAuthorization, Student.unlike);

    app.delete('/api/students/:id', Auth.user.isAdministrator, Student.delete);

}