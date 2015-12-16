// var database = require('../config/database')
// var assert = require('assert');
// var request = require('supertest');
// var app = "http://localhost:8000";

// var recruiter,
//     token_student,
//     offer;

// describe('API OFFER', function () {

// // /!\ Connexion obligatoire afin d'avoir le jeton d'authentification pour les autres requetes /!\
//     it('should connect with recruiter to get token AUTH', function (done) {
//         request(app)
//             .post('/api/login')
//             .send({
//                 email: 'admin@email.fr',
//                 password: 'admin'
//             })
//             .end(function (err, res) {
//                 if (err)
//                     throw err;

//                 recruiter = res.body.user;
//                 token_student = res.body.token;
//                 assert.notEqual(token_student, "");
//                 done();
//             });
//     });

//     it('should create offer', function (done) {
//         request(app)
//             .post('/api/offers')
//             .set('Authorization', token_student)
//             .send({
//                referentId: recruiter._id,
//                title: 'title',
//                referentEmail: 'recruiter@email.fr',
//                referentName: 'name',
//                description: 'description',
//                contract: 'cdi',
//                experience: 'junior',
//                responsability: 'responsability',
//                startDate: '19/03/2016',
//                endDate: '01/01/2060',
//                address: 'address',
//                city: 'BAYONNE',
//                country: 'PAYS BASQUE',
//                zipCode: '00000'

//             })
//             .end(function (err, res) {
//                 if (err)
//                     throw err;

//                 offer = res.body;
//                 assert.equal(offer.contract, "cdi");
//                 done();
//             });
//     });

//  });