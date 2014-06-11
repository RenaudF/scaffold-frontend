'use strict';

var Q = require('q');

var deferred = Q.defer();
setTimeout(function(){
	deferred.resolve('async module');
}, 1000);

module.exports = deferred.promise;
