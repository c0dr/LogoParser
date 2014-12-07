var jsdom = require('jsdom');
var http = require('http');
var fs = require('fs');

//List of companies
var list = require('./companies.json');


var i = 0;
list.forEach(function (data, index, array){
    console.log("Loading #" + (index+1));
    loadImageForUrl(data.url, function (result) {
        list[index].logoUrl = result;
        if(i == (list.length - 1)) {
            console.log('Saving to file ...');
            var outputFilename = 'withimages.json';
            fs.writeFile(outputFilename, JSON.stringify(list, null, 4), function(err) {
                if(err) {
                    console.log(':/')
                } else {
                    console.log('Saved successfully')
                }
            })
        }
        i++;
    });
})


function loadImageForUrl (url, callback) {

    var url = 'http://' + url;
    jsdom.env(
        url, ['http://code.jquery.com/jquery.js'], (function(err, window) {

                //Fix strange issue which only occures when running with server listening
                if(!window) {
                    return 0;
                }

                if(!window.jQuery) {
                    return 0;
                }


                var $ = window.jQuery;
                var logo = '';

                if ($('.logo img').length > 0) {
                    logo = $('.logo img').attr('src');
                } else  if ($('#logo img').length > 0) {
                    logo = $('#logo img ').attr('src');
                } else if ($('img #logo').length > 0) {
                    logo = $('img #logo').attr('src');
                } else {

                    var images = $('img');

                    for (var i = 0; i < images.length; i++) {
                        if (images[i].src && images[i].src.indexOf('logo') > 0) {
                            logo = images[i].src;
                            i = images.length;
                        }

                        //Else 

                    }

                }


                if (logo.indexOf('://') < 0) {
                    logo = url + logo;
                }


                if (logo == url) {
                    logo = 'http://placehold.it/300&text=no+logo+available'
                }

                callback(logo);

           }


        ));
};
