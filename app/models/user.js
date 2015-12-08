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
    phone: String,
    website: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String
}, {collection: 'user', discriminatorKey : '_type' });

var User = {
    model: mongoose.model('User', UserSchema),

    find: function(email, password, callback){
        User.model.findOne({
          email: email,
          password: password
        }, callback);
    }

}

module.exports = User;