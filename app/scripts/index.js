

var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

var url = "https://api.etsy.com/v2/listings/active.js?api_key=r7wy0zesz2l7yto1p8p8coo0&keywords=tacos&includes=Images,Shop";

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
var source = $("#show-template").html();
var template = handlebars.compile(source);

function logData(data){
 var dataSearchResults = data.results;
 console.log(dataSearchResults);
  dataSearchResults.forEach(function(value, index, thisArray){
    console.log("success")
      var context = {
       price: thisArray[index].price,
       title: thisArray[index].title,
       currency_code: thisArray[index].currency_code,
       images:thisArray[index].Images[0].url_75x75,
     }
   $('.thumbnail').append(template(context));
 })
}

fetchJSONP(url, logData);
