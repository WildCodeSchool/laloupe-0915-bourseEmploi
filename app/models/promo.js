/* ------------------------------------------------------------------------- *\
                                MODEL PROMO
\* ------------------------------------------------------------------------- */


var mongoose = require('mongoose');

var Promo = require('./promo.js');

var PromoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
})

var Promo = {
    model: mongoose.model('Promo', PromoSchema),

    findAll: function (req, res) {
        Promo.model.find({}, function (err, promo) {
            res.json(promo);
        });
    },
    findBySchool: function (req, res) {
        Promo.model.find({
            schoolId: req.headers._id
        }, function (err, promo) {
            res.json(promo);
        });
    },
    findById: function (req, res) {
        Promo.model.findById(req.params.id, function (err, promo) {
            if (err)
                console.log(err);
            res.json(promo);
        });
    },

    create: function (req, res) {
        Promo.model.create(req.body, function (err, promo) {
            if (err)
                console.log(err);
            res.json(promo);
        });
    },

    update: function (req, res) {
        Promo.model.findByIdAndUpdate(req.params.id, req.body, function (err, promo) {
            if (err)
                console.log(err);
            res.json(promo);
        });
    },

    delete: function (req, res) {
        Promo.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }

}

module.exports = Promo;