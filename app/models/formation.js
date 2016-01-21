/* ------------------------------------------------------------------------- *\
	 							MODEL FORMATION
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');
var Student = require('./student');


var FormationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    school: String,
    description: String,
    monthStart: String,
    yearStart: String,
    monthEnd: String,
    yearEnd: String,
    country: String,
    city: String,
    website: String,
    graduate: String
})

var Formation = {
    model: mongoose.model('Formation', FormationSchema),

    findByStudent: function (req, res) {
        Formation.model.find({
            studentId: req.params.studentId
        }, function (err, formation) {
            res.json(formation);
        });
    },

    findById: function (req, res) {
        Formation.model.findById(req.params.id, function (err, formation) {
            res.json(formation);
        });
    },

    create: function (req, res) {
        Formation.model.create(req.body, function (err, formation) {
            if (err)
                console.log(err);

            //Update Student
            Student.model.findById(req.body.studentId, function (err, student) {
                student.formations.push({
                    formation: formation._id
                });
                student.save();
            })
            res.json(formation);
        });
    },

    update: function (req, res) {
        Formation.model.findByIdAndUpdate(req.params.id, req.body, function (err, formation) {
            if (err)
                console.log(err);
            res.json(formation);
        });
    },

    delete: function (req, res) {
        Formation.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Formation;