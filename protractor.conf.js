exports.config = {
	specs: ['test/test.e2e.js'],
	framework: 'mocha',
	mochaOpts: {
		reporter: 'spec',
		slow: 100
	}
}
