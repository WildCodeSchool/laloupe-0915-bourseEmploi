/* ------------------------------------------------------------------------- *\
	 						    ROUTES Students
\* ------------------------------------------------------------------------- */

var Student = require('../models/student.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {


    app.get('/students/id/:id', Student.findById);

    app.get('/students/:type', Student.findByType);

    app.get('/students', Student.findAll);

    app.post('/students', Student.create);

    app.put('/students/:id', Student.update);

    app.delete('/students/:id', Student.delete);

}