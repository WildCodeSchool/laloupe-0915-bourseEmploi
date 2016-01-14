/* ------------------------------------------------------------------------- *\
	 						    ROUTES PROMO
\* ------------------------------------------------------------------------- */

var Promo = require('../models/promo.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/api/promo', Auth.user.hasAuthorization, Promo.findAll);

    app.get('/api/promo_school', Auth.user.hasAuthorization, Promo.findBySchool);

    app.get('/api/promo/:id', Auth.user.hasAuthorization, Promo.findById);

    app.post('/api/promo', Auth.user.hasAuthorization, Promo.create);

    app.put('/api/promo/:id', Auth.user.hasAuthorization, Promo.update);

    app.delete('/api/promo/:id', Auth.user.hasAuthorization, Promo.delete);

}