/* ------------------------------------------------------------------------- *\
	 							MODEL EXPERIENCE
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');
var Student = require('./student');
extend = require('mongoose-schema-extend');

var ExperienceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    job: {
        type: String,
        required: true
    },
    company: String,
    companyDescription: String,
    contract: String,
    monthStart: String,
    yearStart: String,
    monthEnd: String,
    yearEnd: String,
    country: String,
    city: String,
    missions: String,
    website: String,
    detailsExp: String
});

var Experience = {
    model: mongoose.model('Experience', ExperienceSchema),

    findByStudent: function (req, res) {
        Experience.model.find({
            studentId: req.params.id
        }, function (err, experience) {
            if (err)
                console.log(err);
            res.json(experience);
        });
    },

    findById: function (req, res) {
        Experience.model.findById(req.params.id, function (err, experience) {
            res.json(experience);
        });
    },

    create: function (req, res) {
        Experience.model.create(req.body, function (err, experience) {
            if (err)
                console.log(err);

            //Update Student
            Student.model.findById(req.body.studentId, function (err, student) {
                student.experiences.push({
                    experience: experience._id
                });
                student.save();
            })
            res.json(experience);
        });
    },

    update: function (req, res) {
        Experience.model.findByIdAndUpdate(req.params.id, req.body, function (err, experience) {
            if (err)
                console.log(err);
            res.json(experience);
        });
    },

    delete: function (req, res) {
        Experience.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Experience;