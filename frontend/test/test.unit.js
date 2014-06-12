'use strict';

// Define your unit tests in requirejs modules
// You can inject any module from your app within the tests.
define(['chai', 'libs/d3/d3', 'config'], function (chai, d3, q) {
	// chai must be required through requirejs, chai-as-promised
	// sinon and should are already exported to the global scope
	var assert = chai.assert;
	var expect = chai.expect;
	describe('Testing environment', function () {
		it('should work with chai', function () {
			assert.equal('test', 'test');
			expect('test').to.equal('test');
			('test').should.equal('test');
		});
		it("should work with sinon", function () {
			var spy = sinon.spy();
			spy.should.not.have.been.called;
		});
		it('should find modules', function(){
			config.should.exist;
		});
		it('should find dependencies', function(){
			d3.should.exist;
		});
	});
});
