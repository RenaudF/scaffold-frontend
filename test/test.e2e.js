/*global browser, By */


var Q = require('q');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;
chai.should();

var driver = browser.driver;

before(function(){
	driver.get('http://localhost:'+browser.params.port);
	
});

describe('Testing environment', function(){
	it('should work with the "assert" syntax', function(){
		var heading = driver.findElement(By.tagName('h1'));
		heading.getText().then(function(text){
			assert.equal(text, 'Running!');
		});
	});
	it('should work with the "expect" syntax', function() {
		var heading = driver.findElement(By.tagName('h1'));
		expect(heading.getText()).to.eventually.eql('Running!');
	});
	it('should work with the "should" syntax', function() {
		var heading = driver.findElement(By.tagName('h1'));
		// Note that webdriver promises must be wrapped in a Q promise
		// in order to be used with the 'eventually' sugar syntax.
		// This is due to chai-as-promised not supporting the same
		// promise implementation as webdriverjs and protractor.
		new Q(heading.getText()).should.eventually.eql('Running!');
	});
});
