var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var User = require('./user.js');

var RecruiterSchema = User.model.schema.extend({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    logo: String,
    picture: String,
    businessSector: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    likes: [{
        like :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]

});

var Recruiter = {
    model: mongoose.model('Recruiter', RecruiterSchema),

    find: function (req, res) {
        Recruiter.model.findOne({
          _id: req.headers.id
        }, function(err, recruiter){
      res.json(recruiter);
        });
    },

    findByType: function (req, res) {
        Recruiter.model.find({
          _type: req.params.type
        }, function(err, recruiter){
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
        Recruiter.model.create(req.body, function (err, recruiter) {
            console.log(err);
            res.json(recruiter);
        });
    },

    update: function (req, res) {
        Recruiter.model.findByIdAndUpdate(req.params.id, req.body, function (err, recruiter) {
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