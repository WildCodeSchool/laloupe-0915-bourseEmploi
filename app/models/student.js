/* ------------------------------------------------------------------------- *\
                                MODEL STUDENT
\* ------------------------------------------------------------------------- */


var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var User = require('./user.js');

var StudentSchema = User.model.schema.extend({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    gender: String,
    picture: String,
    birthDate: Date,
    studentPhone: String,
    description: String,
    wildSide: String,
    status: String,
    situation: String,
    classe: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    mobility: String,
    hobbies: { type : Array , "default" : [] },
    likes: [{
        like: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer'
        }
    }],
    skills: [{
        skill :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
    }]
});

var Student = {
    model: mongoose.model('Student', StudentSchema),

    find: function (req, res) {
        Student.model.findOne({
          _id: req.headers.id
        }, function(err, student){
            res.json(student);
        });
    },

    findByType: function (req, res) {
        Student.model.find({
          _type: req.params.type
        }, function(err, student){
            res.json(student);
        });
    },

    findAll: function (req, res) {
        Student.model.find({}, function (err, students) {
            res.json(students);
        });
    },

    findById: function (req, res) {
        Student.model.findById(req.params.id, function (err, student) {
            res.json(student);
        });
    },

    create: function (req, res) {
        Student.model.create(req.body, function (err, student) {
            res.json(student);
            console.log(err);
        });
    },

    update: function (req, res) {
        Student.model.findByIdAndUpdate(req.params.id, req.body, function (err, student) {
            res.json(student);
            console.log(err);
        });
    },

    delete: function (req, res) {
        Student.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Student;