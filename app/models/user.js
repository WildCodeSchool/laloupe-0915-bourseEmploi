var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
 name: { type: String, required: true, unique: true },
 first_name: String,
 photo: String,
 age: Number,
 description: String,
 wild_side: String,
 training: String,
 previous_work: String,
 email: String,
 tel: Number,
 password: String
});

var User = {
   model: mongoose.model('User', userSchema),
   
  find: function(req, res) {
        Offer.model.findOne({
          _id: req.body.id
        }, function(err, user){
      res.json(user);
    });
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
            first_name: req.body.first_name,
            photo: req.body.photo,
            age: req.body.age,
            description: req.body.description,
            wild_side: req.body.wild_side,
            training: req.body.training,
            previous_work: req.body.previous_work,
            email: req.body.email,
            tel: req.body.tel,
            password: req.body.password
        }, function(err, user) {
            res.json(user);
        });
    },

    update: function(req, res) {
        User.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            first_name: req.body.first_name,
            photo: req.body.photo,
            age: req.body.age,
            description: req.body.description,
            wild_side: req.body.wild_side,
            training: req.body.training,
            previous_work: req.body.previous_work,
            email: req.body.email,
            tel: req.body.tel,
            password: req.body.password
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