const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../index')

describe('Unit testing the /secret/tellme route', function() {

    it('should return OK status', function () {
      return request(app)
        .get('/secret/tellme?apikey=russiandonkey')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return FORBIDDEN status', function () {
        return request(app)
          .get('/secret/tellme?apikey=asdlkjlkj')
          .then(function(response) {
              expect(response.status).to.equal(401)
          })
    })
});