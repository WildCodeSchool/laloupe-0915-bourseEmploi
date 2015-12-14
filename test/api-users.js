var database = require('../config/database')
var assert = require('assert');
var request = require('supertest');
var app = "http://localhost:8000";

var administrator,
    token_admin,
    student,
    recruiter,
    skill,
    offer,
    token_student;

describe('API RECRUITER', function () {

    // after(function () {
    //     database.connection.db.dropDatabase();
    // });

    it('should create administrator', function (done) {
        request(app)
            .post('/api/recruiters')
            .send({
                email: 'admin@email.fr',
                password: 'administrator',
                admin: true,
                name: 'name',
                size: '12',
                description: 'description',
                businessSector: 'businessSector',
                country: 'FR',
                region: 'CENTRE',
                city: 'LA LOUPE',
                address: 'Au milieu de rien',
                zipCode: '28240'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                administrator = res.body;
                assert.equal(administrator.email, "admin@email.fr");
                done();
            });
    });

    // /!\ Connexion obligatoire afin d'avoir le jeton d'authentification pour les autres requetes /!\
    it('should connect with administrator to get token AUTH', function (done) {
        request(app)
            .post('/api/login')
            .send({
                email: 'admin@email.fr',
                password: 'administrator'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                token_admin = res.body.token;
                assert.notEqual(token_admin, "");
                done();
            });
    });

    it('should find administrator by id', function (done) {
        request(app)
            .get('/api/recruiters/' + administrator._id)
            .set('Authorization', token_admin)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.email, administrator.email);
                done();
            });
    });

    it('should find recruiter email', function (done) {
            request(app)
                .get('/api/recruiters/email')
                .end(function (err, res) {
                    if (err)
                        throw err;

                    assert.equal(res.statusCode, 200);
                    done();
                });
    });

    it('should find all users', function (done) {
        request(app)
            .get('/api/users/Recruiter')
            .set('Authorization', token_admin)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.length, 1);
                done();
            });
    });

    it('should update administrator password', function (done) {
        request(app)
            .put('/api/recruiters/' + administrator._id)
            .set('Authorization', token_admin)
            .send({
                password: 'admin'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.password, 'admin');
                done();
            });
    });

});


describe('API STUDENT', function () {

    it('should create student', function (done) {
        request(app)
            .post('/api/students')
            .set("Authorization", token_admin)
            .send({
                email: 'student@email.fr',
                password: 'student',
                name: 'name',
                firstName: 'first',
                school: 'wcs',
                classe: 'best'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                student = res.body;
                assert.equal(student.email, "student@email.fr");
                done();
            });
    });

    // /!\ Connexion obligatoire afin d'avoir le jeton d'authentification pour les autres requetes /!\
    it('should connect with student to get token AUTH', function (done) {
        request(app)
            .post('/api/login')
            .send({
                email: 'student@email.fr',
                password: 'student'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                token_student = res.body.token;
                assert.notEqual(token_student, "");
                done();
            });
    });


    it('should find student by id', function (done) {
        request(app)
            .get('/api/students/' + student._id)
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;
                
                assert.equal(res.body.classe, student.classe);
                done();
            });
    });

    it('should update student name', function (done) {
        request(app)
            .put('/api/students/' + student._id)
            .set('Authorization', token_student)
            .send({
                name: 'name'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.name, 'name');
                done();
            });
    });
});


describe('API SKILL', function () {


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
//                 done();\
//             });
//     });

    it('should create skill', function (done) {
        request(app)
            .post('/api/skills')
            .set('Authorization', token_student)
            .send({
               title: 'title'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                skill = res.body;
                assert.equal(skill.title, "title");
                done();
            });
    });

    it('should find skill by id', function (done) {
        request(app)
            .get('/api/skills/' + skill._id)
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;
                
                assert.equal(res.body.title, skill.title);
                done();
            });
    });

    it('should find all skills', function (done) {
        request(app)
            .get('/api/skills')
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.length, 1);
                done();
            });
    });

    it('should update skill title', function (done) {
        request(app)
            .put('/api/skills/' + skill._id)
            .set('Authorization', token_student)
            .send({
                title: 'title'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.title, 'title');
                done();
            });
    });

});

describe('API OFFER', function () {

// /!\ Connexion obligatoire afin d'avoir le jeton d'authentification pour les autres requetes /!\
    it('should connect with recruiter to get token AUTH', function (done) {
        request(app)
            .post('/api/login')
            .send({
                email: 'admin@email.fr',
                password: 'admin'
            })
            .end(function (err, res) {
                if (err)
                    throw err;

                recruiter = res.body.user;
                token_student = res.body.token;
                assert.notEqual(token_student, "");
                done();
            });
    });

    it('should create offer', function (done) {
        request(app)
            .post('/api/offers')
            .set('Authorization', token_student)
            .send({
               referentId: recruiter._id,
               title: 'title',
               referentEmail: 'recruiter@email.fr',
               referentName: 'name',
               description: 'description',
               contract: 'cdi',
               experience: 'junior',
               responsability: 'responsability',
               startDate: '03/19/2016',
               endDate: '01/01/2060',
               address: 'address',
               city: 'BAYONNE',
               country: 'PAYS BASQUE',
               zipCode: '00000'

            })
            .end(function (err, res) {
                if (err)
                    throw err;

                offer = res.body;
                assert.equal(offer.contract, "cdi");
                done();
            });
    });

    it('should find all offers', function (done) {
        request(app)
            .get('/api/offers')
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.body.length, 1);
                done();
            });
    });

    it('should find offer by id', function (done) {
        request(app)
            .get('/api/offers/' + offer._id)
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;
                
                assert.equal(res.body.title, offer.title);
                done();
            });
    });

    it('should find offer by user id', function (done) {
        request(app)
            .get('/api/offers/users/' + student._id)
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;
                
                assert.equal(res.body.referentName, offer.name);
                done();
            });
    });

    it('should update offer referentName', function (done) {
            request(app)
                .put('/api/offers/' + offer._id)
                .set('Authorization', token_student)
                .send({
                    referentName: 'name'
                })
                .end(function (err, res) {
                    if (err)
                        throw err;

                    assert.equal(res.body.referentName, 'name');
                    done();
                });
        });
 });


describe('API RECRUITER, STUDENT, SKILL DELETE', function () {

    it('should delete administrator', function (done) {
        request(app)
            .delete('/api/recruiters/' + administrator._id)
            .set('Authorization', token_admin)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should delete student', function (done) {
        request(app)
            .delete('/api/students/' + student._id)
            .set('Authorization', token_admin)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should delete skill', function (done) {
        request(app)
            .delete('/api/skills/' + skill._id)
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should delete offer', function (done) {
        request(app)
            .delete('/api/offers/' + offer._id)
            .set('Authorization', token_student)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.statusCode, 200);
                done();
            });
    });
});

