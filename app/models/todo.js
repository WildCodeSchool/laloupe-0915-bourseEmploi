/* ------------------------------------------------------------------------- *\
	 							MODEL TODO
\* ------------------------------------------------------------------------- */


var mongoose = require('mongoose');


var todoSchema = new mongoose.Schema({
  description: String,
  user_id: String
});

var Todo = {
    
    model: mongoose.model('Todo', todoSchema),
    
    create: function(req, res) {
		Todo.model.create({
			description: req.body.description,
			user_id: req.headers.userid
		}, function(){
			res.sendStatus(200);
		})
	},

	findAll: function(req, res) {
		Todo.model.find({
            user_id: req.headers.userid
		}, function (err, data) {
			res.json(data);
		});
	},

	update: function(req, res){
		Todo.model.findByIdAndUpdate(req.params.id, {
			description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},

	delete: function(req, res){
		Todo.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}

    
    
}

module.exports = Todo;

