var jsdom = require('jsdom');
var http = require('http');



http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    var query = require('url').parse(req.url, true).query;



    var url = 'http://' + query.url;

    jsdom.env(
        url, ['http://code.jquery.com/jquery.js'],
        function(err, window) {



            var logo = '';


            //Fix for strange issues related to node server.

            if (!window) {
                return 0;
            }

            if (!window.jQuery) {
                return 0;
            }

            var $ = window.jQuery;



            /*
            //TODO: Check if a image is set as a background image
            //JSDom return empty, even if it is set
            //If it contains url('xyz'), it returns empty on the server, if you run it in the browser it works fine.


            var filter = '.logo';



            if ($(filter).css('background-image') && $(filter).css('background-image').length > 0) {
                return $(filter).css('background-image').replace('url(', '').replace(')', '');
            } else if ($(filter).css('background-url') && $(filter).css('background-url').length > 0) {
                return $(filter).css('background-url');
            } else if ($(filter).css('background') && $(filter).css('background').length > 0) {
                return $(filter).css('background');
            } else {
                return "";
            }


            */

            if ($('.logo img').length > 0) {
                logo = $('.logo img').attr('src');
            } else  if ($('#logo img').length > 0) {
                logo = $('#logo img ').attr('src');
            } else if ($('img #logo').length > 0) {
                logo = $('img #logo').attr('src');
            } else {



                //No logo found by class/id, so let's check all images if they contain "logo" in the file name


                var images = $('img');

                for (var i = 0; i < images.length; i++) {
                    if (images[i].src && images[i].src.indexOf('logo') > 0) {
                        logo = images[i].src;
                        i = images.length;
                    }

                }

                //TODO: If no images contained logo, use the python machine learning part to filter it out.

            }


            //If it is a relative url, add the root to it.
            if (logo && logo.indexOf('//') < 0) {
                logo = url + logo;
            }


            //If no logo could be found at all, return the placeholder
            if (!logo | logo == url) {
                logo = 'http://placehold.it/300&text=no+logo+available'
            }

            res.end(logo);

        }


    );
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');