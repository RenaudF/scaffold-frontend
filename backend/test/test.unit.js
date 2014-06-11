describe('My example module', function(){
	it('should load asynchronously', function(){
'use strict';

		require('../app/module').should.eventually.equal('async module');
	});
});