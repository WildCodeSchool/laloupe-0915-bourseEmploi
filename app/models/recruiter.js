var mongoose = require('mongoose');

var recruiterSchema = new mongoose.Schema({
  companyName: String, 
  companySize: String,
  businessSector: String,
  companyDescription: String,
  functionReferent: String,
  country: String,
  region: String,
  city: String,
  adress: String,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
  email: String,
  phoneNumber: Number
});

var Recruiter = {
    model: mongoose.model('Recruiter', recruiterSchema),
    
        find: function(name, password, callback) {
            Recruiter.model.findOne({
              companyName: companyName, 
              companySize: companySize,
              businessSector: businessSector,
              companyDescription: companyDescription,
              functionReferent: functionReferent,
              country: country,
              region: region,
              city: city,
              adress: adress,
              website: website,
              facebook: facebook,
              twitter: twitter,
              instagram: instagram,
              linkedin: linkedin,
              email: email,
              phoneNumber: phoneNumber
                }, callback);
	},
    
   findAll: function(req, res) {
		Reruiter.model.find({}, function (err, users) {
			res.json(users);
		});
	},
    
    findById: function(req, res) {
		Recruiter.model.findById(req.headers.id, function (err, user) {
			 res.json(user);
		});
	},
    
    create: function(req, res) {
        Offer.model.create({
              companySize: req.body.companySize,
              businessSector: req.body.businessSector,
              companyDescription: req.body.companyDescription,
              functionReferent: req.body.functionReferent,
              country: req.body.country,
              region: req.body.region,
              city: req.body.city,
              adress: req.body.adress,
              website: req.body.website,
              facebook: req.body.facebook,
              twitter: req.body.twitter,
              instagram: req.body.instagram,
              linkedin: req.body.linkedin,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber
                }, function(err, user) {
			res.json(user);
	    });
	},
    
    update: function(req, res) {
		Recruiter.model.findByIdAndUpdate(req.params.id, {
            companySize: req.body.companySize,
              businessSector: req.body.businessSector,
              companyDescription: req.body.companyDescription,
              functionReferent: req.body.functionReferent,
              country: req.body.country,
              region: req.body.region,
              city: req.body.city,
              adress: req.body.adress,
              website: req.body.website,
              facebook: req.body.facebook,
              twitter: req.body.twitter,
              instagram: req.body.instagram,
              linkedin: req.body.linkedin,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber
                }, function(err, user) {
			res.json(user);
	    });
	},
    
    delete: function(req, res){
		Recruiter.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}
}

module.exports = Recruiter;
