/* ------------------------------------------------------------------------- *\
	 						    ROUTES SKILLS
\* ------------------------------------------------------------------------- */

var Skill = require('../models/skill.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/api/skills', Auth.user.hasAuthorization, Skill.findAll);

    app.get('/api/skills/:id', Auth.user.hasAuthorization, Skill.findById);

    app.get('/api/checkskill', Auth.user.hasAuthorization, Skill.checkSkill);

    app.post('/api/skills', Auth.user.hasAuthorization, Skill.create);

    app.put('/api/skills/:id', Auth.user.hasAuthorization, Skill.update);

    app.delete('/api/skills/:id', Auth.user.hasAuthorization, Skill.delete);

}