/* ------------------------------------------------------------------------- *\
	 							MODEL SKILL
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');
var Student = require('./student.js');
var Offer = require('./offer.js');

var SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Skill = {

    model: mongoose.model('Skill', SkillSchema),

    findById: function (req, res) {
        Skill.model.findOne({
            _id: req.headers._id
        }, function (err, skill) {
            res.json(skill);
        });
    },
    checkSkill: function (req, res) {
        Skill.model.findOne({
            title: req.headers.title
        }, function (err, data) {
            if (data)
                res.status(409).send("La compétence " + req.headers.title + " existe déjà");
            else
                res.status(200).send();
        });
    },
    findAll: function (req, res) {
        Skill.model.find({}, function (err, skills) {
            res.json(skills);
        });
    },
    create: function (req, res) {
        Skill.model.create(req.body, function (err, skill) {
            if (err) {
                res.sendStatus(400)
            } else
                res.json(skill);
        })
    },

    update: function (req, res) {
        Skill.model.findByIdAndUpdate(req.params.id, req.body, function (err, skill) {
            res.json(skill);
        })
    },

    delete: function (req, res) {
        Skill.model.findByIdAndRemove(req.params.id, function () {
            Student.model.find({
                'skills.skill': req.params.id
            }).exec(function (err, students) {
                students.forEach(function (student) {
                    var newSkills = [];
                    for (var i = 0; i < student.skills.length; i++) {
                        if (student.skills[i].skill != req.params.id) {
                            newSkills.push(student.skills[i]);
                        }
                    }
                    Student.model.findByIdAndUpdate(student._id, {
                        skills: newSkills
                    }).exec();
                });
            });
            Offer.model.find({
                'skills.skill': req.params.id
            }).exec(function (err, offers) {
                if (offers.length > 0) {
                    offers.forEach(function (offer) {
                        var newSkills = [];
                        for (var i = 0; i < offer.skills.length; i++) {
                            if (offer.skills[i].skill != req.params.id) {
                                newSkills.skills.push(offer.skills[i]);
                            }
                        }
                        Offer.model.findByIdAndUpdate(offer._id, {
                            skills: newSkills
                        }).exec();
                    });
                };
            });
            res.sendStatus(200);
        });
    }
}

module.exports = Skill;