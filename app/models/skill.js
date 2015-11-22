/* ------------------------------------------------------------------------- *\
	 							MODEL SKILL
\* ------------------------------------------------------------------------- */


var mongoose = require('mongoose');


var skillSchema = new mongoose.Schema({
  title: String,
  user_id: String
});

var Skill = {
    
    model: mongoose.model('Todo', todoSchema),
    
    create: function(req, res) {
		Skill.model.create({
			title: req.body.title
		}, function(){
			res.sendStatus(200);
		})
	},

	findAll: function(req, res) {
		Skill.model.find({
            user_id: req.headers.userid
		}, function (err, data) {
			res.json(data);
		});
	},

	update: function(req, res){
		Skill.model.findByIdAndUpdate(req.params.id, {
			title: req.body.title
		}, function(){
			res.sendStatus(200);
		})
	},

	delete: function(req, res){
		Skill.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}

    
    
}

module.exports = Skill;
