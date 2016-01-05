/* ------------------------------------------------------------------------- *\
	 						    ROUTES OFFERS
\* ------------------------------------------------------------------------- */

var Offer = require('../models/offer.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/offers', Auth.user.hasAuthorization, Offer.findAll);

    app.get('/offers/currents', Auth.user.hasAuthorization, Offer.findAllCurrent);

    app.get('/offers/:id', Auth.user.hasAuthorization, Offer.findById);

    app.get('/offersUsers/:id', Auth.user.hasAuthorization, Offer.findByUser);

    app.post('/offers', Auth.user.hasAuthorization, Offer.create);

    app.put('/offers/:id', Auth.user.hasAuthorization, Offer.update);

    app.delete('/offers/:id', Auth.user.hasAuthorization, Offer.delete);

    app.post('/api/offers/skills', Auth.user.hasAuthorization, Offer.findBySkill);

}