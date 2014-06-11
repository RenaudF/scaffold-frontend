describe('My example module', function(){
	it('should load asynchronously', function(){
'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;
chai.should();

		require('../app/module').should.eventually.equal('async module');
	});
});