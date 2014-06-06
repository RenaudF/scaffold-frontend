// Unlike unit tests in karma, the e2e tests in protractor run on the server.
// As such you can decide directly which testing libraries you want to use.
var Q = require('q');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;
chai.should();

var driver = browser.driver;

before(function(){
	// Start by navigating to the right page.
	// Note that a webserver must be running for these tests to execute.
	// Protractor does not manage webservers, this must be done separately.

	// The webserver configuration for testing is set to run on port 8001.
	// This configuration also points to the minified version of the app.
	// See the 'connect' task in the 'Gruntfile.js' for more details.
	driver.get('http://localhost:'+browser.params.port);
	
	// Note also that there is no need to explicitly invoke 'done' as protractor
	// tests are completely asynchronous. For more details about control flow:
	// https://github.com/angular/protractor/blob/master/docs/control-flow.md
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
