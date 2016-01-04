/* 
 *  User authorization routing middleware
 */

var jwt = require('jsonwebtoken');

exports.user = {

    hasAuthorization: function (req, res, next) {
        /*        console.log(req.headers)
                if (req.headers.authorization) {
                    jwt.verify(req.headers.authorization, 'tokenSecret', function (err, decoded) {
                        if (err)
                            return res.sendStatus(403);
                        else
                            next();
                    });
                } else {
>>>>>>> da54e078d8673c339a106a9bd3189a01b99b9351
                    return res.sendStatus(403);
                }*/
        next();
    },

    isAdministrator: function (req, res, next) {
        /*         if (req.headers.authorization) {
                    jwt.verify(req.headers.authorization, 'tokenSecret', function (err, decoded) {
                        if (err)
                            return res.sendStatus(401);
                        else if (!decoded.admin)
                            return res.sendStatus(401);
                        else
                            next();
                    });
                } else {
                    return res.sendStatus(401);
                }*/
        next();
    }
};