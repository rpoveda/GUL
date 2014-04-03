var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

var url_list = 'https://www.youtube.com/playlist?list=FL9A-5lIghoTDc3PFibahx4g';
var fileLinks = 'c:/temp/linksyoutubebig.txt';

function init() {
    request(url_list, function (err, resp, body) {
        var $ = cheerio.load(body);
        $(".pl-video").each(function () {
            var linkVideo = $(this, '.pl-video-title').find('a.pl-video-title-link').attr('href');
            fs.appendFile(fileLinks, 'http://youtube.com' + linkVideo + '\r\n');
        });
        var url_more = $('.load-more-button').attr('data-uix-load-more-href');
        continueRequest(url_more);
    });
    function continueRequest(urlNext) {
        var url = 'http://youtube.com' + urlNext;
        var $$;
        request(url, 'content-type:application/json; charset=UTF-8', function (err, resp, body) {
            var t = JSON.parse(body);
            $$ = cheerio.load(t['content_html']);
            $$(".pl-video").each(function () {
                var linkVideo = $$(this, '.pl-video-title').find('a.pl-video-title-link').attr('href');
                fs.appendFile(fileLinks, 'http://youtube.com' + linkVideo + '\r\n');
            });
            if (t['load_more_widget_html']) {
                $$ = cheerio.load(t['load_more_widget_html']);
                var url_more = $$('.load-more-button').attr('data-uix-load-more-href');
                continueRequest(url_more);
            } else {
                return;
            }
        });
    }
}

init();