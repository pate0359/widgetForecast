var widgetContainer;
var widgetDiv;
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function buildWidget(classname) {

	var css = document.createElement("link");
  	css.setAttribute("rel", "stylesheet");
  	css.setAttribute("href", "css/widget.css");
	 document.querySelector("head").appendChild(css);
	
	widgetContainer = classname;
	
	$(classname).load("widget.html" );
	gotHTML();
//	$.ajax({
//		url: "widget.html",
//		dataType: "html",
//	}).done(gotHTML).fail(badStuff);
}

function gotHTML(data) {
//	$(widgetContainer).html(data);

	$.ajax({
		url: "https://api.forecast.io/forecast/b2f42472109aec4def423f21a8da5c8f/45.348391,-75.757045",
		dataType: "jsonp",
		type: "POST",
		data: {
			units: "ca"
		},
		//		crossDomain: true;
		//		xmlFields:
		//		{
		//			withCredentials: true;
		//		}
	}).done(gotData).fail(badStuff);
}

function gotData(data) {
	
	var test=data.hourly.data[0];
	console.log(test);
	
	var today = new Date();
	var dateIndex=today.getDay();

	for(var i=0; i<24; i++)
	{		
		var hour=data.hourly.data[i];
		$('#'+i+'').attr("date",hour.time);
		$('#'+i+'').attr("icon",hour.icon);
		$('#'+i+'').attr("summary",hour.summary);
		$('#'+i+'').attr("feels_like",hour.apparentTemperature);
		$('#'+i+'').attr("humidity",hour.humidity);
		$('#'+i+'').attr("visibility",hour.visibility);
		$('#'+i+'').attr("wind",hour.windSpeed);
		$('#'+i+'').attr("dew",hour.dewPoint);
		$('#'+i+'').attr("summary",hour.summary);
		$('#'+i+'').attr("ozone",hour.ozone);
		$('#'+i+'').attr("preci",hour.precipIntensity);
				
		var date = new Date(hour.time * 1000);
		$('#'+i+'').attr("day",weekday[date.getDay()]);
		
		if(dateIndex != date.getDay())
		{
			//$('#'+i+'').find(".hourText").addClass('hourText_light');
			$('#'+i+'').find(".tempText").addClass('tempText_light');
		}
		
		var time = formatAMPM(date);
		
		$('#'+i+'').find(".hourText").text(time);
		$('#'+i+'').find(".tempText").text(''+hour.temperature.toPrecision(2) +'\u00B0');
	}
	
	//Make first div as default selection
	$('.isSelected').removeClass('isSelected');
	$('#0').addClass('isSelected');
	insertValues($('#0'));

	$('.hour').click(function (ev) {
			$('.isSelected').removeClass('isSelected');
			$(this).addClass('isSelected');
			//ev.currentTarget;
			//alert( $(this).find(".tempText").text() );
			insertValues($(this));
		});	
}

function insertValues(detailDiv)
{
	// Add values
		$('.sundirection_highlow .highlow .high .value').text(detailDiv.attr("feels_like"));
		$('.sundirection_highlow .highlow .low .value').text(detailDiv.attr("humidity"));
		$('.sundirection_highlow .sundirection .sunrise .value').text(detailDiv.attr("visibility"));
		$('.sundirection_highlow .sundirection .sunset .value').text(detailDiv.attr("wind"));
		
		$('.moredetails .highlow .high .value').text(detailDiv.attr("dew"));
		$('.moredetails .highlow .low .value').text(detailDiv.attr("summary"));
		$('.moredetails .sundirection .sunrise .value').text(detailDiv.attr("ozone"));
		$('.moredetails .sundirection .sunset .value').text(detailDiv.attr("preci"));
	
	$('.day_name').text(detailDiv.attr("day"));
	$('.day_text_wrapper .day_text').text(detailDiv.attr("summary"));
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function badStuff(error) {
	console.log(error);
}