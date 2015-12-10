var database = require('../config/database')
var assert = require('assert');
var request = require('supertest');
var app = "http://localhost:8000";

var administrator;
var student;
var token_admin;
var token_student;


describe('API RECRUITER', function () {

    after(function () {
        database.connection.db.dropDatabase();
    });

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

    it('should find all recruiters', function (done) {
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

     it('should delete student', function (done) {
        request(app)
            .delete('/api/students/' + administrator._id)
            .set('Authorization', token_admin)
            .end(function (err, res) {
                if (err)
                    throw err;

                assert.equal(res.statusCode, 200);
                done();
            });
    });

});

