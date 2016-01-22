// var database = require('../config/database')
// var assert = require('assert');
// var request = require('supertest');
// var app = "http://localhost:8000";

// var student,
//     token_student,
//     skill;

// describe('API SKILL', function () {


//    // /!\ Connexion obligatoire afin d'avoir le jeton d'authentification pour les autres requetes /!\
//     it('should connect with student to get token AUTH', function (done) {
//         request(app)
//             .post('/api/login')
//             .send({
//                 email: 'student@email.fr',
//                 password: 'student'
//             })
//             .end(function (err, res) {
//                 if (err)
//                     throw err;

//                 token_student = res.body.token;
//                 assert.notEqual(token_student, "");
//                 done();
//             });
//     });

//     it('should create skill', function (done) {
//         request(app)
//             .post('/api/skills')
//             .set('Authorization', token_student)
//             .send({
//                title: 'title'
//             })
//             .end(function (err, res) {
//                 if (err)
//                     throw err;

//                 skill = res.body;
//                 assert.equal(skill.title, "title");
//                 done();
//             });
//     });

//     it('should find skill by id', function (done) {
//         request(app)
//             .get('/api/skills/' + skill._id)
//             .set('Authorization', token_student)
//             .end(function (err, res) {
//                 if (err)
//                     throw err;
                
//                 assert.equal(res.body.title, skill.title);
//                 done();
//             });
//     });

//     it('should find all skills', function (done) {
//         request(app)
//             .get('/api/skills')
//             .set('Authorization', token_student)
//             .end(function (err, res) {
//                 if (err)
//                     throw err;

//                 assert.equal(res.body.length, 1);
//                 done();
//             });
//     });

//     it('should update skill title', function (done) {
//         request(app)
//             .put('/api/skills/' + skill._id)
//             .set('Authorization', token_student)
//             .send({
//                 title: 'title'
//             })
//             .end(function (err, res) {
//                 if (err)
//                     throw err;

//                 assert.equal(res.body.title, 'title');
//                 done();
//             });
//     });


    
//  });    