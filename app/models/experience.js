/* ------------------------------------------------------------------------- *\
	 							MODEL EXPERIENCE
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');

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
        startDate: String,
        endDate: String,
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
          studentId: req.params.studentId
        }, function(err, experience){
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
            res.json(experience);
            console.log(err);
        });
    },

    update: function (req, res) {
        Experience.model.findByIdAndUpdate(req.params.id, req.body, function (err, experience) {
            res.json(experience);
            console.log(err);
        });
    },

    delete: function (req, res) {
        Experience.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Experience;