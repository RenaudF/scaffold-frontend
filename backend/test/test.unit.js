'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;
chai.should();

describe('Testing environment', function(){
	it('should work with the "assert" syntax', function(){
		require('../app/module').then(function(text){
			assert.equal(text, 'Running!');
		});
	});
	it('should work with the "expect" syntax', function() {
		expect(require('../app/module')).to.eventually.equal('async module');
	});
	it('should work with the "should" syntax', function(){
		require('../app/module').should.eventually.equal('async module');
	});
});