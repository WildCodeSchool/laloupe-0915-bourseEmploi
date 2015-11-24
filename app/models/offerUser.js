/* ------------------------------------------------------------------------- *\
	 							MODEL offerUser
\* ------------------------------------------------------------------------- */


var mongoose = require('mongoose');


var offerUserSchema = new mongoose.Schema({
  user_id: String,
  offer_id: String
});

var OfferUser = {
    
    model: mongoose.model('OfferUser', offerUserSchema),
    
    create: function(req, res) {
		OfferUser.model.create({
			user_id: req.headers.userid,
			offer_id: req.headers.offerid
		}, function(){
			res.sendStatus(200);
		})
	},

	findAll: function(req, res) {
		OfferUser.model.find({}, function (err, data) {
			res.json(data);
		});
	},

	update: function(req, res){
		OfferUser.model.findByIdAndUpdate(req.params.id, function(){
			res.sendStatus(200);
		})
	},

	delete: function(req, res){
		OfferUser.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}

    
    
}

module.exports = OfferUser;


