import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });
  //test 1:registration successfully
  describe('UserRegistration', () => {
    const inputBody = {
      "firstName": "Sidh",
      "lastName": "Kamble",
      "email": "Sidh@gmail.com",
      "password": "Pass"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  //test 2:registration new user short firstName
  describe('UserRegistration', () => {
    const inputBody = {
      "firstName": "v",
      "lastName": "mehtra",
      "email": "Sidhlsm78125ehtr@gmail.com",
      "password": "57sbfj"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 3:registration new user short lastName
  describe('UserRegistration', () => {
    const inputBody = {
      "firstName": "Sidh",
      "lastName": "K",
      "email": "Sidh@gmail.com",
      "password": "Pass"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //test 4:registration new user large password
  describe('UserRegistration', () => {
    const inputBody = {
      "firstName": "Sidh",
      "lastName": "Kamble",
      "email": "Sidh@gmail.com",
      "password": "Passkkkkkkkkkkkkkkkk"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 5:registration wrong email
  describe('UserRegistration', () => {
    const inputBody = {
      "firstName": "Sidh",
      "lastName": "Kamble",
      "email": "Sidh@gmail",
      "password": "Pass"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  var token;
  //test 6:login
  describe('Login User', () => {
    const inputBody = {
      "email": "Sidh@gmail.com",
      "password": "Pass"
    }
    it('Given User Should Login', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  //test 7:login wrong email
  describe('Login User', () => {
    const inputBody = {
      "email": "Sidh@gmail",
      "password": "Pass"
    }
    it('Given invalid email should throw error', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 8:login wrong password
  describe('Login User', () => {
    const inputBody = {
      "email": "Sidh@gmail.com",
      "password": "Passadhhqfhalk"
    }
    it('Given invalid password should throw error', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 9:Create Note
  describe('Create Note', () => {
    const inputBody = {
      "Title": "Note-1",
      "Descreption": "note is create"
    }
    it('Given Note Should Be Save In Database', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  //test 10:Create Note
  describe('Create Note', () => {
    const inputBody = {
      "Title": "N",
      "Descreption": "note is create"
    }
    it('Given invalid title should throw error', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 11:Create Note
  describe('Create Note', () => {
    const inputBody = {
      "Title": "Note",
      "Descreption": "n"
    }
    it('Given invalid descreption should throw error', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});