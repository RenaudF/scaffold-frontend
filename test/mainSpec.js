/*global describe, it */
define(['config'], function (config) {
	describe('Give it some context', function () {
		describe('maybe a bit more context here', function () {
			it('should work with chai', function () {
				expect(config.test).to.equal('test');
				config.test.should.equal('test');
			});
			it("should work with sinon", function () {
				var spy = sinon.spy();
				spy.should.not.have.been.called;
			});
		});
	});
});
