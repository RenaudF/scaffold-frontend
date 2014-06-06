require.config({
	baseUrl: 'app',
	paths: {
		"libs": "../libs"
	}
});

require(['libs/d3/d3', 'config'], function(d3){
	console.log('d3', d3);
});
