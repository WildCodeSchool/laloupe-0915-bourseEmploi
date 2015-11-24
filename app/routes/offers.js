/* ------------------------------------------------------------------------- *\
	 						    ROUTES OFFERS
\* ------------------------------------------------------------------------- */

var Offer = require('../models/offer.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/offers', Offer.findAll);

	app.get('/offers/:id', Offer.findById);

	app.post('/offers', Offer.create);

	app.put('/offers/:id', Offer.update);

	app.delete('/offers/:id', Offer.delete);

}