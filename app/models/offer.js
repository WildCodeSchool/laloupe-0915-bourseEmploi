var mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
  title: String, 
  address: String,
  city: String,
  logo: Text,
  name_referent: { type: String, required: true, unique: true },
  contact_referent: Number,
  description: String,
  type_of_contract: String,
  salary: Number,
  skill: String,
  start_date: Date,
  end_date: Date,
  website: String
});

var Offer = {
    model: mongoose.model('Offer', userSchema),
    
    find: function(name, password, callback) {
        Offer.model.findOne({
          title: title, 
          address: address,
          city: city,
          logo: logo,
          name_referent: name,
          contact_referent: contact,
          description: description,
          type_of_contract: contract,
          salary: salary,
          skill: skill,
          start_date: start,
          end_date: end,
          website: website
		}, callback);
	},
    
    findAll: function(req, res) {
		Offer.model.find({}, function (err, users) {
			res.json(users);
		});
	},

	findById: function(req, res) {
		Offer.model.findById(req.headers.id, function (err, user) {
			 res.json(user);
		});
	},

	create: function(req, res) {
		Offer.model.create({
			title: req.body.title,
  			address: req.body.address,
  			city: req.body.city,
  			logo: req.body.logo,
  			name_referent: req.body.name,
  			contact_referent: req.body.contact,
  			description: req.body.description,
  			type_of_contract: req.body.contract,
  			salary: req.body.salary,
  			skill: req.body.skill,
  			start_date: req.body.start,
  			end_date: req.body.end,
  			website: req.body.website
		}, function(err, user) {
			res.json(user);
	    });
	},

	update: function(req, res) {
		Offer.model.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
  			address: req.body.address,
  			city: req.body.city,
  			logo: req.body.logo,
  			name_referent: req.body.name,
  			contact_referent: req.body.contact,
  			description: req.body.description,
  			type_of_contract: req.body.contract,
  			salary: req.body.salary,
  			skill: req.body.skill,
  			start_date: req.body.start,
  			end_date: req.body.end,
  			website: req.body.website
		}, function(err, user) {
			res.json(user);
	    });
	},

	delete: function(req, res){
		Offer.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}
}


module.exports = User;