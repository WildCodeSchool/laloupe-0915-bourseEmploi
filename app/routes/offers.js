/* ------------------------------------------------------------------------- *\
	 						    ROUTES OFFERS
\* ------------------------------------------------------------------------- */

var Offer = require('../models/offer.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/offers', Auth.user.hasAuthorization, Offer.findAll);

	app.get('/offers/:id', Auth.user.isAdministrator, Offer.findById);

	app.post('/offers', Auth.user.hasAuthorization, Offer.create);

	app.put('/offers/:id', Auth.user.hasAuthorization, Offer.update);

	app.delete('/offers/:id', Auth.user.hasAuthorization, Offer.delete);

}