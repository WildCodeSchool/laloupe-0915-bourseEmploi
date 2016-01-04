/* ------------------------------------------------------------------------- *\
	 							MODEL SKILL
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');


var SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: Boolean,
        default: false
    }
});

var Skill = {

    model: mongoose.model('Skill', SkillSchema),

    find: function (req, res) {
        Skill.model.findOne({
            _id: req.headers.id
        }, function (err, skill) {
            res.json(skill);
        });
    },

    findAll: function (req, res) {
        Skill.model.find({}, function (err, skills) {
            res.json(skills);
        });
    },

    findById: function (req, res) {
        Skill.model.findById(req.params.id, function (err, skill) {
            res.json(skill);
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
            res.sendStatus(200);
        })
    }




}

module.exports = Skill;