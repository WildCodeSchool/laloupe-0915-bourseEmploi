var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    phone: String,
    website: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
    github: String
}, {
    collection: 'user',
    discriminatorKey: '_type'
});

var User = {
    model: mongoose.model('User', UserSchema),

    find: function (email, password, callback) {
        User.model.findOne({
            email: email,
            password: password
        }, callback);
    },
    findAll: function (req, res) {
        User.model.find({}, function (err, users) {
            if (err)
                console.log(err);
            res.json(users);
        });
    }

}

module.exports = User;