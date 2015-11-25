var mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
    skill: String,
    title: String,
    email: String,
    name_referent: String,
    tel: Number,
    description: String,
    type_of_contract: String,
    salary: Number,
    experience: String,
    responsability: String,
    why_choose_our_company: String
});

var Offer = {
    model: mongoose.model('Offer', offerSchema),

    find: function (req, res) {
        Offer.model.findOne({
            _id: req.body.id
        }, function (err, offer) {
            res.json(offer);
        });
    },

    findAll: function (req, res) {
        Offer.model.find({}, function (err, offers) {
            res.json(offers);
        });
    },

    findById: function (req, res) {
        Offer.model.findById(req.params.id, function (err, offer) {
            res.json(offer);
        });
    },

    create: function (req, res) {
        Offer.model.create({
            skill: req.body.skill,
            title: req.body.title,
            email: req.body.email,
            name_referent: req.body.name,
            tel: req.body.tel,
            description: req.body.description,
            type_of_contract: req.body.type,
            salary: req.body.salary,
            experience: req.body.experience,
            responsability: req.body.responsability,
            why_choose_our_company: req.body.why
        }, function (err, offer) {
            res.json(offer);

        });
    },

    update: function (req, res) {
        Offer.model.findByIdAndUpdate(req.params.id, {
            skill: req.body.skill,
            title: req.body.title,
            email: req.body.email,
            name_referent: req.body.name,
            tel: req.body.tel || 0,
            description: req.body.description,
            type_of_contract: req.body.type,
            salary: req.body.salary || 0,
            experience: req.body.experience,
            responsability: req.body.responsability,
            why_choose_our_company: req.body.why
        }, function (err, offer) {
            res.json(offer);
        });
    },

    delete: function (req, res) {
        Offer.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Offer;