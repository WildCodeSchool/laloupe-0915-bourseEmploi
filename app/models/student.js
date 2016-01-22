/* ------------------------------------------------------------------------- *\
                                MODEL STUDENT
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var generatePassword = require('password-generator');

var User = require('./user.js');
var Promos = require('./promo.js');

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
    region: String,
    city: String,
    gender: String,
    picture: String,
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

    findByPromo: function (req, res) {
        Student.model.find({
            promos: req.headers.promos
        }, function (err, promo) {
            res.json(promo);
        });
    },

    findBySkill: function (req, res) {
        Student.model.find({
                'skills.skill': {
                    $in: req.body.ids
                },
                _type: 'Student'
            })
            .populate('skills.skill')
            .exec(function (err, students) {
                var result = {};
                students.forEach(function (student) {
                    student.skills.forEach(function (s) {
                        if (req.body.ids.indexOf(s.skill._id.toString()) > -1) {
                            if (result.hasOwnProperty(s.skill.title))
                                result[s.skill.title] += 1;
                            else
                                result[s.skill.title] = 1;
                        }
                    })
                })
                console.log(result);
                res.json(result)

            })
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

    findAlumnis: function (req, res) {
        Promos.model.find({
                'endDate': {
                    $lt: new Date()
                }
            })
            .exec(function (err, promos) {
                Student.model.find({
                        'promos': {
                            $in: promos
                        }
                    })
                    .exec(function (err, alumnis) {
                        res.json(alumnis);
                    })

            })
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

    delete: function (req, res) {
        Student.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Student;