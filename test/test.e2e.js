/*global browser, By */
var driver = browser.driver;


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
describe('expect syntax', function() {
	it('should be Running!', function() {
		var heading = driver.findElement(By.tagName('h1'));
		expect(heading.getText()).to.eventually.eql('Running!');
	});
});

chai.should();
describe('synchronous should syntax', function() {
	it('should be Running!', function() {
		var heading = driver.findElement(By.tagName('h1'));
		heading.getText().then(function(text){
			text.should.eql('Running!');
		});
	});
});

describe('asynchronous should syntax', function() {
	it('should be Running!', function() {
		var heading = driver.findElement(By.tagName('h1'));
		heading.getText().should.eventually.eql('Running!');
	});
before(function(){
	driver.get('http://localhost:'+browser.params.port);
});
});

var assert = chai.assert;
describe('assert syntax', function() {
	it('should be Running!', function() {
		var heading = driver.findElement(By.tagName('h1'));
		heading.getText().then(function(text){
			assert.equal(text, 'Running!');
		});
	});
});
