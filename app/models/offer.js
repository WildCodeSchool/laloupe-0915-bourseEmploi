/* ------------------------------------------------------------------------- *\
                                MODEL OFFER
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');
var moment = require('moment');

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

    findByUser: function (req, res) {
        Offer.model.find({
            referentId: req.params.id
        }, function (err, offer) {
            res.json(offer);
        });
    },

    create: function (req, res) {
        Offer.model.create(req.body, function (err, offer) {
            res.json(offer);
            console.log(err);
        });
    },

    /*create: function (req, res) {
        Offer.model.create({
            title: req.body.title,
            referentEmail: req.body.referentEmail,
            referentName: req.body.referentName,
            referentPhone: req.body.referentPhone,
            description: req.body.description,
            contract: req.body.contract,
            salary: req.body.salary,
            experience: req.body.experience,
            responsability: req.body.responsability,
            wildSide: req.body.wildSide,
            startDate: req.body.startDate,

            endDate: moment(req.body.enDate).add(90, 'days'),
            
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zipCode: req.body.zipCode,
            referentId: req.body.referentId
        }, function (err, offer) {
console.log(err);
            // if (!err){
            //     for (var i = 0; i < req.bodls.y.skillength ; i++){
            //         Offer.model.findByIdAndUpdate(offer.id,{ $push: {
            //             skills: {
            //                 skill: req.body.skills[i]
            //             }
            //         }}, function (err, oo) {
            //             //nothing    
            //         });
                    
            //     }
            //     res.sendStatus(200);
            // } 
            // else {
            //     res.sendStatus(500);
            // }
            res.sendStatus(offer);
        });
    },*/


    update: function (req, res) {
        Offer.model.findByIdAndUpdate(req.params.id, req.body, function (err, offer) {
            res.json(offer);
        });
    },


    /*update: function (req, res) {
        Offer.model.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            email: req.body.email,
            referentName: req.body.referentName,
            referentPhone: req.body.referentPhone || 0,
            description: req.body.description,
            contract: req.body.contract,
            salary: req.body.salary || 0,
            experience: req.body.experience,
            responsability: req.body.responsability,
            wildSide: req.body.wildSide,
            startDate: req.body.startDate,

            endDate: moment(req.body.enDate).add(90, 'days'),

            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zipCode: req.body.zipCode

        }, function (err, offer) {
           // for (var i = 0; i < req.body.skills.length ; i++){
           //          Offer.model.findByIdAndUpdate(offer.id,{ $push: {
           //              skills: {
           //                  skill: req.body.skills[i]
           //              }
           //          }}, function (err, oo) {
           //              //nothing    
           //          });
                    
           //      }
                res.sendStatus(200);
        });    
    },*/

    delete: function (req, res) {
        Offer.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Offer;