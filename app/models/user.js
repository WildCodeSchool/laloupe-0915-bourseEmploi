var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    first_name: String,
    photo: String,
    age: Number,
    description: String,
    wild_side: String,
    training: String,
    previous_work: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: Number,
    classes: String,
    school: String,
    password: String
});

var User = {
    model: mongoose.model('User', userSchema),

    find: function (req, res) {
        User.model.findOne({
          _id: req.headers.id
        }, function(err, user){
      res.json(user);
    });
},
   

    findAll: function (req, res) {
        User.model.find({}, function (err, users) {
            res.json(users);
        });
    },

    findById: function(req, res) {
        User.model.findById(req.params.id, function (err, user) {
             res.json(user);
        });
    },

    create: function (req, res) {
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
        }, function (err, user) {
            res.json(user);
        });
    },

    update: function (req, res) {
        User.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            first_name: req.body.first_name,
            photo: req.body.photo,
            age: req.body.age || 0,
            description: req.body.description,
            wild_side: req.body.wild_side,
            training: req.body.training,
            previous_work: req.body.previous_work,
            email: req.body.email,
            tel: req.body.tel || 0,
            password: req.body.password
        }, function (err, user) {
            res.json(user);
        });
    },

    delete: function (req, res) {
        User.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = User;