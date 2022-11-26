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
  var id;
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
          id = res.body.data._id;
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
  //test 12:Get all Notes
  describe('Get All Note', () => {
    it('Given User Should Give All notes', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  //test 13:Get all Notes
  describe('Get All Note', () => {
    it('Given invalid token should throw error', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
  //test 14:Get By Id
  describe('Get By Id', () => {
    it('Given Note By Id Should Get', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  //test 15:Get By Id
  describe('Get By Id', () => {
    it('Given invalid id should throw error', (done) => {
      request(app)
        .get(`/api/v1/notes/esresgvghftdb`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 16:Update By Id
  describe('Update By Id', () => {
    const inputBody = {
      "Title": "Note-1",
      "Descreption": "ngygytyne",

    }
    it('Given Note By Id Should Update Color', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });
  //test 17:Update By Id
  describe('Update By Id', () => {
    const inputBody = {
      "Title": "g"
    }
    it('Given invalid Descri should throw error', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //test 18:Update By Id
  describe('Update By Id', () => {
    const inputBody = {
      "Descreptio": "nhuhj",
    }
    it('Given invalid Descreption should throw error', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //test 19 :Update Isarchived
  describe('archived By Id', () => {
    it('Given id should change is archived field', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/archived`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  //test 20 :Update IsDelete
  describe('Add In to trash by Id', () => {
    it('Given id should change is isdelete field', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/trash`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  //test 21 :Delete By Id
  describe('Delete By Id', () => {
    it('Given Note Should be Delete By Id', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  //test 22 :Delete By Id
  describe('Delete By Id', () => {
    it('Given invalid id should throw error', (done) => {
      request(app)
        .delete(`/api/v1/notes/vfsfufeh`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});