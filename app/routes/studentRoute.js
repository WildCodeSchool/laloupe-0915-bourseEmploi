/* ------------------------------------------------------------------------- *\
	 						    ROUTES Students
\* ------------------------------------------------------------------------- */

var Student = require('../models/student.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {


	app.get('/students/one/:id', Student.find);

	app.get('/students/:type', Student.findByType);

	app.get('/students', Student.findAll);

	app.get('/students/:id', Student.findById);

	app.post('/students', Student.create);

	app.put('/students/:id', Student.update);

	app.delete('/students/:id', Student.delete);

}

