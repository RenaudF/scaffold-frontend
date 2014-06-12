'use strict';

// Define your unit tests in requirejs modules
// You can inject any module from your app within the tests.
define(['chai', 'libs/q/q'], function (chai, q) {
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
		it('should find modules', function(done){
			// using deferred syntax
			var deferred = q.defer();
			require(['config'], function(config){
				deferred.resolve(config);
			});
			deferred.promise.should.eventually.be.fulfilled.notify(done);
		});
		it('should find dependencies', function(done){
			// using promise syntax
			q.promise(function(resolve, reject, notify){
				require(['libs/d3/d3'], function(d3){
					resolve(d3);
				});
			}).should.eventually.be.fulfilled.notify(done);
		});
	});
});
