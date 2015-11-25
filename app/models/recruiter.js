var mongoose = require('mongoose');

var recruiterSchema = new mongoose.Schema({
    companyName: String,
    companySize: Number,
    logo: String,
    business_sector: String,
    companyDescription: String,
    functionReferent: String,
    country: String,
    region: String,
    city: String,
    address: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: Number,
    website: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String
});

var Recruiter = {
    model: mongoose.model('Recruiter', recruiterSchema),

    find: function (req, res) {
        Recruiter.model.findOne({
            _id: req.headers.id
        }, function (err, recruiter) {
            res.json(recruiter);
        });
    },

    findAll: function (req, res) {
        Recruiter.model.find({}, function (err, recruiters) {
            res.json(recruiters);
        });
    },

    findById: function (req, res) {
        Recruiter.model.findById(req.params.id, function (err, recruiter) {
            res.json(recruiter);
        });
    },

    create: function (req, res) {
        Recruiter.model.create({
            companyName: req.body.companyName,
            companySize: req.body.companySize,
            logo: req.body.logo,
            business_sector: req.body.businessSector,
            companyDescription: req.body.companyDescription,
            functionReferent: req.body.functionReferent,
            country: req.body.country,
            region: req.body.region,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            tel: req.body.tel,
            website: req.body.website,
            twitter: req.body.twitter,
            facebook: req.body.facebook,
            linkedin: req.body.linkedin,
            instagram: req.body.instagram
        }, function (err, user) {
            res.json(user);
        });
    },

    update: function (req, res) {
        Recruiter.model.findByIdAndUpdate(req.params.id, {
            companyName: req.body.companyName,
            companySize: req.body.companySize || 0,
            logo: req.body.logo,
            business_sector: req.body.businessSector,
            companyDescription: req.body.companyDescription,
            functionReferent: req.body.functionReferent,
            country: req.body.country,
            region: req.body.region,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            tel: req.body.tel || 0,
            website: req.body.website,
            twitter: req.body.twitter,
            facebook: req.body.facebook,
            linkedin: req.body.linkedin,
            instagram: req.body.instagram
        }, function (err, recruiter) {
            res.json(recruiter);
        });
    },

    delete: function (req, res) {
        Recruiter.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Recruiter;