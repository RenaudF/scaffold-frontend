var driver = browser.driver;

before(function(done){
	driver.get('http://localhost:8000/index.htm').then(done);
})

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
});

var assert = chai.assert;
describe('assert syntax', function() {
	it('should be Running!', function() {
		var heading = driver.findElement(By.tagName('h1'));
		heading.getText().then(function(text){
			assert.equal(text, 'Running!');
		})
	});
});
