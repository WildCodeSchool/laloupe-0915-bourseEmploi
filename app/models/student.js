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
    teaser: String,
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
    }],
    formations: [{
        formation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Formation'
        }
    }],
    experiences: [{
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
        }
    }]
});

var Student = {
    model: mongoose.model('Student', StudentSchema),

    findByType: function (req, res) {
        Student.model.find({
                _type: 'Student'
            })
            .populate('skills.skill')
            .populate('likes.like')
            .exec(function (err, users) {
                res.json(users);
            });
    },

    findById: function (req, res) {
        Student.model.findById(req.params.id)
            .populate('skills.skill')
            .populate('likes.like')
            .populate('formations.formation')
            .populate('experiences.experience')
            .exec(function (err, student) {
                res.json(student);
            });
    },

    findInfo: function (req, res) {
        Student.model.find({
            _type: 'Student'
        }, function (err, student) {
            var infos = {}
            infos.nb_student = student.length;
            Student.model.find({
                _type: 'Student',
                situation: "En recherche d'emploi"
            }, function (err, student_stage) {
                infos.nb_student_stage = student_stage.length;
                Student.model.find({
                    _type: 'Student',
                    status: 'Ouvert aux opportunités',
                }, function (err, student_job) {
                    infos.nb_student_job = student_job.length;
                    res.json(infos);
                });
            });
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
            if (err)
                console.log(err);
            res.json(student);
        });
    },

    delete: function (req, res) {
        Student.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Student;