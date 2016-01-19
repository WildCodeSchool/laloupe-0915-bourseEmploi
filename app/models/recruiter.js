var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var User = require('./user.js');

var RecruiterSchema = User.model.schema.extend({
    admin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    logo: String,
    picture: String,
    description: {
        type: String,
        required: true
    },
    businessSector: {
        type: String,
        required: true
    },
    wildSide: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var Recruiter = {
    model: mongoose.model('Recruiter', RecruiterSchema),

    findByType: function (req, res) {
        Recruiter.model.find({
            _type: 'Recruiter'
        }, {
            password: 0
        }, function (err, users) {
            res.json(users);
        });
    },

    findAll: function (req, res) {
        Recruiter.model.find({}, {
            password: 0
        }, function (err, recruiters) {
            res.json(recruiters);
        });
    },

    findById: function (req, res) {
        Recruiter.model.findById(req.params.id, {
            password: 0
        }, function (err, recruiter) {
            if (err)
                console.log(err);
            res.json(recruiter);
        });
    },

    findByEmail: function (req, res) {
        Recruiter.model.findOne({
            email: req.headers.email
        }, {
            password: 0
        }, function (err, data) {
            if (data)
                res.status(409).send("Un compte existe déjà avec l'adresse mail " + req.headers.email);
            else
                res.status(200).send();
        });
    },

    create: function (req, res) {
        Recruiter.model.create(req.body, function (err, recruiter) {
            if (err)
                console.log(err);
            res.json(recruiter);
        });
    },

    update: function (req, res) {
        Recruiter.model.findByIdAndUpdate(req.params.id, req.body, function (err, recruiter) {
            return Recruiter.findById(req, res);
        });
    },

    like: function (req, res) {
        Recruiter.model.findById(req.params.id, function (err, student) {
            student.likes.push(req.body.like);
            student.save();
            res.json(student);
        });
    },

    unlike: function (req, res) {
        Recruiter.model.findById(req.params.id, function (err, student) {
            var index = student.likes.indexOf(req.body.unlike);
            if (index > -1) {
                student.likes.splice(index, 1);
            }
            student.save();
            res.json(student);
        });
    },

    delete: function (req, res) {
        Recruiter.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}


module.exports = Recruiter;