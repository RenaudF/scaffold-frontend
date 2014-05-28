require.config({
	baseUrl: '../app',
	paths: {
		"libs": "../bower_components"
	}
});

require(['libs/d3/d3'], function(d3){
	console.log('d3', d3);
});
