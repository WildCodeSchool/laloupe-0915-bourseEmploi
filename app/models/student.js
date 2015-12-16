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
    hobbies: {
        type: Array,
        "default": []
    },
    likes: [{
        like: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer'
        }
    }],
    skills: [{
        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
    }]
});

var Student = {
    model: mongoose.model('Student', StudentSchema),

    findById: function (req, res) {
        Student.model.findById(req.params.id)
            .populate("skills.skill")
            .exec(function (err, student) {
                res.json(student);
            });
    },

    create: function (req, res) {
        Student.model.create(req.body, function (err, student) {
            res.json(student);
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