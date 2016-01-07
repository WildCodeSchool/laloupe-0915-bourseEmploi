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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
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
            }, {
                password: 0
            })
            .populate('skills.skill')
            .populate('likes')
            .exec(function (err, users) {
                res.json(users);
            });
    },

    findById: function (req, res) {
        Student.model.findById(req.params.id, {
                password: 0
            })
            .populate('skills.skill')
            .populate('likes')
            .populate('formations.formation')
            .populate('experiences.experience')
            .exec(function (err, student) {
                res.json(student);
            });
    },

    findInfo: function (req, res) {
        Student.model.find({
            _type: 'Student'
        }, {
            password: 0
        }, function (err, student) {
            var infos = {}
            infos.nb_student = student.length;
            Student.model.find({
                _type: 'Student',
                situation: "En recherche d'emploi"
            }, {
                password: 0
            }, function (err, student_stage) {
                infos.nb_student_stage = student_stage.length;
                Student.model.find({
                    _type: 'Student',
                    status: 'Ouvert aux opportunités',
                }, {
                    password: 0
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

    like: function (req, res) {
        Student.model.findById(req.params.id, function (err, offer) {
            offer.likes.push(req.body.like);
            offer.save();
            res.json(offer);
        });
    },

    unlike: function (req, res) {
        Student.model.findById(req.params.id, function (err, offer) {
            var index = offer.likes.indexOf(req.body.unlike);
            if (index > -1) {
                offer.likes.splice(index, 1);
            }
            offer.save();
            console.log(err)
            res.json(offer);
        });
    },

    delete: function (req, res) {
        Student.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Student;