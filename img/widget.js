//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/
var scriptsLoaded = 0;
var weatherData;

document.addEventListener('DOMContentLoaded', function(){
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.addEventListener('load', function(){
        scriptsLoaded++;
        if(scriptsLoaded === 2){
            //call the function in My widget script to load the JSON and build the widget
            buildWidget('.mywidget');
            console.log('both scripts loaded');
        }
    });
    css.setAttribute('href', 'main.css');
    document.querySelector('head').appendChild(css);
    //loads the CSS file and applies it to the page
    var scriptsLoaded = 0;

    var jq = document.createElement('script');
    jq.addEventListener('load', function(){
        scriptsLoaded++;
        if(scriptsLoaded === 2){
            //call the function in My widget script to load the JSON and build the widget
            buildWidget('.mywidget');
            console.log('both scripts loaded');
        }
    });
    document.querySelector('head').appendChild(jq);
    jq.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js');

});

function buildWidget(){
	$.ajax({
		url: 'https://api.forecast.io/forecast/500ff5743785ab1747287586679c7325/45.348391,-75.757045',
		dataType: 'jsonp', data: 'units=ca'
	}).done( gotData ).fail( loadFailed );

    function gotData(data){
        //building the widget:
        var html = '<h1>' + 'Weather Widget' + '</h1>';
        html += '<table>';
        html += '<caption>' + 'Hourly Weather Data for ' + Date() + '</caption>';
        html += '<thead>';
        html += '<tr>'
        html += '<th>' + 'Hour' + '</th>';
        html += '<th>' + 'Humidity' + '</th>';
        html += '<th>' + 'Cloud Cover' + '</th>';
        html += '<th>' + 'Temperature' + '</th>';
        html += '<th>' + 'Wind Speed' + '</th>';
        html += '<th>' + 'Icon' + '</th>';
        html += '<th>' + 'Summary' + '</th>';
        html += '</thead>';
        html += '<tbody>';
        html += '<tr>';
        html += '<td>' + Math.floor(((data.hourly.data[0].time % 31536000) % 86400) / 3600); + '</th>';
        html += '<td>' + data.hourly.data[0].humidity + '%' + '</td>';
        html += '<td>' + data.hourly.data[0].cloudCover + '%' + '</td>';
        html += '<td>' + data.hourly.data[0].temperature + '°' + '</td>';
        html += '<td>' + data.hourly.data[0].windSpeed + ' ' + 'km/h' + '</td>';
        html += '<td>' + '<img src=' + 'img/' + data.hourly.data[0].icon + '.svg' + '/>' + '</td>';
        html += '<td>' + data.hourly.data[0].summary + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>' + Math.floor(((data.hourly.data[1].time % 31536000) % 86400) / 3600); + '</th>';
        html += '<td>' + data.hourly.data[1].humidity + '%' + '</td>';
        html += '<td>' + data.hourly.data[1].cloudCover + '%' + '</td>';
        html += '<td>' + data.hourly.data[1].temperature + '°' + '</td>';
        html += '<td>' + data.hourly.data[1].windSpeed + ' ' + 'km/h' + '</td>';
        html += '<td>' + '<img src=' + 'img/' + data.hourly.data[1].icon + '.svg' + '/>' + '</td>';
        html += '<td>' + data.hourly.data[1].summary + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>' + Math.floor(((data.hourly.data[2].time % 31536000) % 86400) / 3600); + '</th>';
        html += '<td>' + data.hourly.data[2].humidity + '%' + '</td>';
        html += '<td>' + data.hourly.data[2].cloudCover + '%' + '</td>';
        html += '<td>' + data.hourly.data[2].temperature + '°' + '</td>';
        html += '<td>' + data.hourly.data[2].windSpeed + ' ' + 'km/h' + '</td>';
        html += '<td>' + '<img src=' + 'img/' + data.hourly.data[2].icon + '.svg' + '/>' + '</td>';
        html += '<td>' + data.hourly.data[2].summary + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        $('.mywidget').append(html);
        weatherData = data;
    }
    function loadFailed(){
        var p = document.createElement('p');
        p.innerHTML = "Failed to load data... It's probably your fault. The computer is never wrong.";
        document.querySelector('.mywidget').appendChild(p);
    }
};