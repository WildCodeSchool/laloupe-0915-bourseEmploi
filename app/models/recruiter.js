var mongoose = require('mongoose');

var recruiterSchema = new mongoose.Schema({
    name_company: String,
    size_company: Number,
    logo: String,
    business_sector: String,
    description: String,
    function_post: String,
    country: String,
    region: String,
    city: String, 
    address: String,
    email: String,
    tel: Number,
    website: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
    tilder: String
});

var Recruiter = {
   model: mongoose.model('Recruiter', recruiterSchema),
   
     find: function(req, res) {
        Offer.model.findOne({
          _id: req.body.id
        }, function(err, recruiter){
      res.json(recruiter);
    });
},
   
   findAll: function(req, res) {
        Recruiter.model.find({}, function (err, recruiters) {
            res.json(recruiters);
        });
    },

    findById: function(req, res) {
        Recruiter.model.findById(req.headers.id, function (err, recruiter) {
             res.json(recruiter);
        });
    },

    create: function(req, res) {
        Recruiter.model.create({
            name_company: String,
            size_company: Number,
            logo: String,
            business_sector: String,
            description: String,
            function_post: String,
            country: String,
            region: String,
            city: String, 
            address: String,
            email: String,
            tel: Number,
            website: String,
            twitter: String,
            facebook: String,
            linkedin: String,
            instagram: String
        }, function(err, user) {
            res.json(user);
        });
    },

    update: function(req, res) {
        Recruiter.model.findByIdAndUpdate(req.params.id, {
            name_company: String,
            size_company: Number,
            logo: String,
            business_sector: String,
            description: String,
            function_post: String,
            country: String,
            region: String,
            city: String, 
            address: String,
            email: String,
            tel: Number,
            website: String,
            twitter: String,
            facebook: String,
            linkedin: String,
            instagram: String
        }, function(err, recruiter) {
            res.json(recruiter);
        });
    },

    delete: function(req, res){
        Recruiter.model.findByIdAndRemove(req.params.id, function(){
            res.sendStatus(200);
        })
    }
}


module.exports = Recruiter;