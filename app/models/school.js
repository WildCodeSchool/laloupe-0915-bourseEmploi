/* ------------------------------------------------------------------------- *\
                                MODEL SCHOOL
\* ------------------------------------------------------------------------- */


var mongoose = require('mongoose');

var School = require('./school.js');

var Promo = require('./promo.js');

var SchoolSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    CP: {
        type: String,
        required: true
    }
})

var School = {
    model: mongoose.model('School', SchoolSchema),

    findAll: function (req, res) {
        School.model.find({}, function (err, school) {
            res.json(school);
        });
    },

    findById: function (req, res) {
        School.model.findById(req.params.id, function (err, school) {
            if (err)
                console.log(err);
            res.json(school);
        });
    },

    create: function (req, res) {
        School.model.create(req.body, function (err, school) {
            if (err)
                console.log(err);
            res.json(school);
        });
    },

    update: function (req, res) {
        School.model.findByIdAndUpdate(req.params.id, req.body, function (err, school) {
            if (err)
                console.log(err);
            res.json(school);
        });
    },

    delete: function (req, res) {
        School.model.findByIdAndRemove(req.params.id, function () {
            Promo.model.find({
                'schoolId': req.params.id
            }).exec(function (err, promos) {
                promos.forEach(function (promo) {
                    Promo.deleteById(promo._id)
                });
            })
            res.sendStatus(200);
        })
    }

}

module.exports = School;