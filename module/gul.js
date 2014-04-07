var request = require('request'),
    cheerio = require('cheerio');

var urlList = 'https://www.youtube.com/playlist?list=FL-eZSaKsu7dlcBJo9N776Kg';

exports.urlSearch = function(url){
    url = urlList;
};

exports.getListUrls = function(callback){

    var urls = [];

    request(urlList, function (err, resp, html){
        
        if(err) throw err;

        var $ = cheerio.load(html);
        $('.pl-video').each(function(){
            var linkVideo = $(this, '.pl-video-title').find('a.pl-video-title-link').attr('href');
            urls.push('http://youtube.com' + linkVideo);
        });
        var urlNext = $('.load-more-button').attr('data-uix-load-more-href');

        if(urlNext){
            continueRequest(urlNext,callback);
        } else{ callback(urls); }

    });

    function continueRequest(urlNext, callback){
        var url = 'http://youtube.com' + urlNext;
        var $;
        var content_html = "";
        var load_more = "";
        request(url, 'content-type:application/json; charset=UTF-8', function   (err, resp, html){
            
            if(err) throw err;

            var parseJSON = JSON.parse(html);
            content_html = parseJSON['content_html'];
            load_more = parseJSON['load_more_widget_html'];
            $ = cheerio.load(content_html);
            $('.pl-video').each(function(){
                var linkVideo = $(this, '.pl-video-title').find('a.pl-video-title-link').attr('href');
                urls.push('http://youtube.com' + linkVideo);
            });
            if(load_more){
                $ = cheerio.load(load_more);
                var newUrlNext = $('.load-more-button').attr('data-uix-load-more-href');
                continueRequest(newUrlNext, callback);
            }else{ callback(urls); }
        });
    }
}