var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
 name: { type: String, required: true, unique: true },
 first_name: String,
 photo: Text,
 age: Number,
 description: String,
 wild side: String,
 training: String,
 previous work: String,
 skill: String, 
 email: String,
 tel: Number
});

var User = {
   model: mongoose.model('User', userSchema),
   
   find: function(name, password, callback) {
       User.model.findOne({
           name: name,
           password: password
        }, callback);
    },
   
   findAll: function(req, res) {
        User.model.find({}, function (err, users) {
            res.json(users);
        });
    },

    findById: function(req, res) {
        User.model.findById(req.headers.id, function (err, user) {
             res.json(user);
        });
    },

    create: function(req, res) {
        User.model.create({
            name: req.body.name,
            password: req.body.password,
            admin: req.body.admin
        }, function(err, user) {
            res.json(user);
        });
    },

    update: function(req, res) {
        User.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            password: req.body.password,
            admin: req.body.admin
        }, function(err, user) {
            res.json(user);
        });
    },

    delete: function(req, res){
        User.model.findByIdAndRemove(req.params.id, function(){
            res.sendStatus(200);
        })
    }
}


module.exports = User;