/* ------------------------------------------------------------------------- *\
                                MODEL OFFER
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');
var moment = require('moment');
moment.locale('fr');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://wildfinder.wcs%40gmail.com:jecode4laloupe@smtp.gmail.com');

var offerSchema = new mongoose.Schema({
    skills: [{
        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
    }],
    referentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    referentEmail: {
        type: String,
        required: true
    },
    referentName: {
        type: String,
        required: true
    },
    referentPhone: String,
    description: {
        type: String,
        required: true
    },
    contract: {
        type: String,
        required: true
    },
    salary: String,
    experience: {
        type: String,
        required: true
    },
    responsability: {
        type: String,
        required: true
    },
    wildSide: String,
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    endOfPublish: {
        type: Date,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

var Offer = {
    model: mongoose.model('Offer', offerSchema),

    find: function (req, res) {
        Offer.model.findOne({
            _id: req.headers.id
        }, function (err, offer) {
            res.json(offer);
        });
    },

    findFiltered: function (req, res) {
        var contract = req.body.contract;
        var region = req.body.region;
        var experience = req.body.experience;
        var skill = {
            'skills': {
                $elemMatch: req.body.language
            },
            'skills.skill': {
                $in: req.body.skills
            }
        };

        var query = Offer.model.find({
            'startDate': {
                $lt: new Date()
            },
            'endDate': {
                $gte: new Date()
            }
        });

        if (contract)
            query = query.where('contract').equals(contract);
        if (region)
            query = query.where('region').equals(region);
        if (experience)
            query = query.where('experience').equals(experience);
        if (req.body.skill)
            query = query.where('skills.skill').equals(req.body.skill);

        query.populate("skills.skill").populate("referentId", "-password").exec(function (err, offer) {
            if (err) {
                res.status(400);
                console.log(err);
            } else
                res.json(offer);
        });
    },

    findAll: function (req, res) {
        Offer.model.find({})
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offers) {
                res.json(offers);
            });
    },

    findAllCurrent: function (req, res) {
        Offer.model.find({
                'startDate': {
                    $lt: new Date()
                },
                'endDate': {
                    $gte: new Date()
                }
            })
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offers) {
                console.log(err)
                res.json(offers);
            });
    },

    findById: function (req, res) {
        Offer.model.findById(req.params.id)
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offer) {
                res.json(offer);
            });
    },

    findByUser: function (req, res) {
        Offer.model.find({
                referentId: req.params.id
            })
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offer) {
                res.json(offer);
            });
    },

    findBySkill: function (req, res) {
        Offer.model.find({
                'skills': {
                    $elemMatch: req.body.language
                },
                'skills.skill': {
                    $in: req.body.skills
                },
                'startDate': {
                    $lt: new Date()
                },
                'endDate': {
                    $gte: new Date()
                }
            })
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offer) {
                if (err) {
                    res.status(400);
                    console.log(err);
                } else
                    res.json(offer);
            });
    },

    findNotPublished: function (req, res) {
        Offer.model.find({
                published: false
            })
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offers) {
                if (err) {
                    res.status(400);
                    console.log(err);
                } else
                    res.json(offers);
            });
    },

    findSoonEnded: function (req, res) {
        Offer.model.find({
                'endOfPublish': {
                    $lt: new Date()
                },
                'endDate': {
                    $gt: new Date()
                }
            })
            .populate("skills.skill")
            .populate("referentId", "-password")
            .exec(function (err, offers) {
                if (err) {
                    res.status(400);
                    console.log(err);
                } else
                    res.json(offers);
            });
    },

    create: function (req, res) {
        Offer.model.create(req.body, function (err, offer) {
            if (err)
                console.log(err);
            res.json(offer);
            transporter.sendMail(require('../mails/Mail.js').newOfferMail(offer.referentEmail, offer.title), function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
        });
    },

    update: function (req, res) {
        Offer.model.findByIdAndUpdate(req.params.id, req.body, function (err, offer) {
            res.json(offer);
        });
    },

    validate: function (req, res) {
        Offer.model.findByIdAndUpdate(req.params.id, req.body, function (err, offer) {
            res.json(offer);
            transporter.sendMail(require('../mails/Mail.js').validateOfferMail(offer.referentEmail, offer.title, moment(offer.startDate).format('DD MMMM YYYY'), moment(offer.endDate).format('DD MMMM YYYY')), function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
        });
    },

    delete: function (req, res) {
        Offer.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Offer;