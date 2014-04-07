var gul = require('../module/gul.js');


exports.list = function (req, res){
	gul.urlSearch('https://www.youtube.com/playlist?list=FL9A-5lIghoTDc3PFibahx4g');
	var urlsComplete = gul.getListUrls(function(data){
		console.log('acabou');
		res.render('links', { urls : data });	
	});
}