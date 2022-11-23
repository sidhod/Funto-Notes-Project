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

  //test 1:registration new user short firstName
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
  //test 1:registration new user short lastName
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

  //test 1:registration new user large password
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

  //test 1:registration new user short firstName
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
});