'use strict';

// Define your unit tests in requirejs modules
// You can inject any module from your app within the tests.
define(['libs/d3/d3', 'config'], function (d3, config) {
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
