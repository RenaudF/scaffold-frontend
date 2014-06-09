describe('My example module', function(){
	it('should load asynchronously', function(){
		require('../app/module').should.eventually.equal('async module');
	});
});