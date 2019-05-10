var axios = require("axios");
var models = require("../../models");
const chai = require('chai');
var expect = chai.expect;

describe('ordersController', function() {
  after(async () => {
    await models.Order.destroy({
            where: {},
            truncate: true
          });
	});

  describe('#index()', function() {

    it('should return auth error code', async function() {
      try{
        await axios.get('http://localhost:3000')
      }catch(err){
        expect(err.response.status).to.equal(401);
      }
    });
  });

  describe('#create', function(){
    it('should return created order', function(done) {
      models.Order.create({status: 'created', sum: 10}
      ).then(order => {
        axios.get('http://localhost:3000/orders', {
          headers: {
            "x-access-token": "foo"
          }
        }).then( (resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.data.length).to.equal(1);
          done()
        }).catch(err => {
          done(err);
        });
      }).catch(err => {
        done(err);
      });
    });

    it('returns error about sent 0 items to create payment', function(done) {
      axios.post('http://localhost:3000/orders', {}, {
        headers: {
          "x-access-token": "foo"
        }
      }).then( resp => {
        expect(resp.data.status).to.eq(false);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('returns error because item with negative price was sent', function(done) {
      axios.post('http://localhost:3000/orders', {
        "items": [
          {name: 'Foo', price: '-10'},
          {name: 'Bar', price: '10'}
        ]
      }, {
        headers: {
          "x-access-token": "foo"
        }
      }).then( resp => {
        expect(resp.data.status).to.eq(false);
        expect(resp.data.error).to.eq("Item`s price can not be negative");
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('creates order with status created', function(done) {
      axios.post('http://localhost:3000/orders', {
        "items": [
          {name: 'Foo', price: '10'},
          {name: 'Bar', price: '10'}
        ]
      }, {
        headers: {
          "x-access-token": "foo"
        }
      }).then( resp => {
        expect(resp.data.sum).to.eq(20);
        expect(resp.data.status).to.eq('created');
        done();
      }).catch(err => {
        done(err);
      });
    });
  });
});
