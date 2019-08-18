const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../index')

describe('Unit testing the /snake route', function() {

    it('should return OK status', function () {
      return request(app)
        .get('/snake/cobra')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return Not Found status', function () {
        return request(app)
          .get('/snake/asdlkjlkj')
          .then(function(response) {
              expect(response.status).to.equal(404)
          })
    })

    it('should NOT return verbose message > 100 chars', function () {
        return request(app)
          .get('/snake/asdlkjlkj')
          .then(function(response) {
              expect(response.text).to.have.length.lessThan(100)
          })
    })
});