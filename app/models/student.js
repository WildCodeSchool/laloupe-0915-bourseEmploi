/* ------------------------------------------------------------------------- *\
                                MODEL STUDENT
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var generatePassword = require('password-generator');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://wildfinder.wcs%40gmail.com:jecode4laloupe@smtp.gmail.com');

var User = require('./user.js');
var Recruiter = require('./recruiter.js');

var StudentSchema = User.model.schema.extend({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    blocked: {
        type: Boolean,
        default: true
    },
    logo: String,
    region: String,
    city: String,
    gender: String,
    birthDate: Date,
    studentPhone: String,
    description: String,
    wildSide: String,
    status: String,
    situation: String,
    teaser: String,
    promos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promo'
    },
    mobility: String,
    hobbies: {
        type: Array,
        "default": []
    },
    languages: [{
        language: {
            type: Array
        }
    }],
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
            .populate('promos')
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
            .populate('promos')
            .populate('skills.skill')
            .populate('likes')
            .populate('formations.formation')
            .populate('experiences.experience')
            .exec(function (err, student) {
                res.json(student);
            });
    },

    sendId: function (req, res) {
        Student.model.findById(req.params.id)
            .exec(function (err, student) {
                res.json(student);
                transporter.sendMail(require('../mails/Mail.js').id(student.email, student.email, student.password, student.name, student.firstName), function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            });
    },


    findByPromo: function (req, res) {
        Student.model.find({
            promos: req.headers.promos
        }, function (err, promo) {
            res.json(promo);
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
                    situation: "En recherche de stage",
                }, {
                    password: 0
                }, function (err, student_job) {
                    infos.nb_student_job = student_job.length;
                    res.json(infos);
                });
            });
        });
    },

    findFiltered: function (req, res) {
        var status = req.body.status;
        var region = req.body.region;
        var situation = req.body.situation;
        var promos = req.body.promos;
        var query = Student.model.find({
            _type: 'Student'
        }, {
            password: 0
        });
        if (status)
            query = query.where('status').equals(status);
        if (region)
            query = query.where('region').equals(region);
        if (situation)
            query = query.where('situation').equals(situation);
        if (promos)
            query = query.where('promos').equals(promos);
        if (req.body.skill)
            query = query.where('skills.skill').equals(req.body.skill);

        query.populate("skills.skill")
            .populate('promos')
            .exec(function (err, students) {
                if (err) {
                    res.status(400);
                    console.log(err);
                } else {
                    students = students.filter(function (student) {
                        console.log(student.promos);
                        if (req.body.school)
                            return (student.promos ? student.promos.schoolId == req.body.school : false);
                        return true;
                    })
                    res.json(students);
                }
            });
    },

    create: function (req, res) {
        req.body.password = generatePassword(6, false);
        req.body._type = 'Student';
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

    howManyLiked: function (req, res) {
        Student.model.find({
            'likes': req.params.id
        }).exec(function (err, students) {
            res.json(students.length);
        });
    },

    delete: function (req, res) {
        Student.deleteById(req.params.id);
        res.status(200)
    },

    deleteById: function (id) {
        Student.model.findByIdAndRemove(id, function () {
            Recruiter.model.find({
                'likes': id
            }).exec(function (err, recruiters) {
                recruiters.forEach(function (recruiter) {
                    var newLikes = [];
                    for (var i = 0; i < recruiter.likes.length; i++) {
                        if (recruiter.likes[i] != id) {
                            newLikes.push(recruiter.likes[i]);
                        }
                    }
                    Recruiter.model.findByIdAndUpdate(recruiter._id, {
                        likes: newLikes
                    }).exec();
                });
            });
        })
    }
}

module.exports = Student;