var mongoose = require('mongoose');
var moment = require('moment');

var offerSchema = new mongoose.Schema({
    skills: [{
<<<<<<< HEAD
        skill :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
=======
        type: String,
        required: true
>>>>>>> d6ebaa449ad9632b842ff4fd56de96b1b8672d6b
    }],
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name_referent: {
        type: String,
        required: true
    },
    tel: Number,
    description: {
        type: String,
        required: true
    },
    type_of_contract: {
        type: String,
        required: true
    },
    salary: Number,
    experience: {
        type: String,
        required: true
    },
    responsability: {
        type: String,
        required: true
    },
    why_choose_our_company: String,
    startDate: {
        type: Date,
        required: true
    },
<<<<<<< HEAD
=======
    endDate: {
        type: Date,
        required: true
    },
>>>>>>> d6ebaa449ad9632b842ff4fd56de96b1b8672d6b
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
<<<<<<< HEAD
    zipCode:{
=======
    zipCode: {
>>>>>>> d6ebaa449ad9632b842ff4fd56de96b1b8672d6b
        type: Number,
        required: true
    }
});

var Offer = {
    model: mongoose.model('Offer', offerSchema),

    find: function (req, res) {
        Offer.model.findOne({
          _id: req.headers.id
		}, function(err, offer){
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
            title: req.body.title,
            email: req.body.email,
            name_referent: req.body.name,
            tel: req.body.tel,
            description: req.body.description,
            type_of_contract: req.body.type,
            salary: req.body.salary,
            experience: req.body.experience,
            responsability: req.body.responsability,
            why_choose_our_company: req.body.why,
            startDate: req.body.startDate,
            endDate: moment(req.body.enDate).add(3, 'months'),
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zipCode: req.body.zipCode
        }, function (err, offer) {

            if (!err){
                for (var i = 0; i < req.body.skills.length ; i++){
                    Offer.model.findByIdAndUpdate(offer.id,{ $push: {
                        skills: {
                            skill: req.body.skills[i]
                        }
                    }}, function (err, offer) {
                        //nothing
                        console.log(err);
                    });
                }
                res.json(offer);
            } else {
                res.sendStatus(500);
            }
            
        });
    },

    update: function (req, res) {
        Offer.model.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            email: req.body.email,
            name_referent: req.body.name,
            tel: req.body.tel || 0,
            description: req.body.description,
            type_of_contract: req.body.type,
            salary: req.body.salary || 0,
            experience: req.body.experience,
            responsability: req.body.responsability,
            why_choose_our_company: req.body.why,
            startDate: req.body.startDate,
            endDate: moment(req.body.enDate).add(3, 'months'),
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zipCode: req.body.zipCode

        }, function (err, offer) {
            Offer.model.findByIdAndUpdate(offer.id,{ $push: {
                skills: {
                    skill: req.body.skill
                }
            }}, function (err, offer) {
                res.json(offer);
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