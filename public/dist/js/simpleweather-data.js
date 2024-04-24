/*SimpleWeather Init*/

"use strict";

$(document).ready(function() {  
  getWeather(); //Get the initial weather.
  getCurrentTime(); //Get the initial weather.
  //setInterval(getWeather, 10000); //Update time after every sec.
});

/*Current Time Cal*/
var getCurrentTime = function(){
	var nowDate = moment().format('L');
	var nowDay = moment().format('dddd');
	$('.nowday').html(nowDay);
	$('.nowdate').html(nowDate);
};

/*Get Current Weather*/
var getWeather = function() {
	
	if( $('#weather_1').length > 0 ){ 
		/*With Forcast*/
		$.simpleWeather({
		location: 'Cape Town, Western Cape, ZA',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var $this = $('#weather_1');
			var htmlCity = weather.city;
			$this.find('.panel-heading button > span').html(htmlCity);
			var html='<span className="block temprature pull-left">'+weather.temp+'<span className="unit">&deg;'+weather.units.temp+'</span></span><span className="block temprature-icon pull-left"><img src="dist/img/weathericons/'+weather.code+'.svg"/></span><div className="clearfix"></div><span className="block currently">'+weather.currently+'</span><ul className="other-details"><li><span className="spec-label">wind</span> <span className="wind-speed">'+weather.wind.speed+''+weather.units.speed+'</span><span className="spec-label">humidity</span><span className="humidity">'+weather.humidity+'%</span></li><li><span className="spec-label">sunrise</span><span className="sunrise">'+weather.sunrise+'</span><span className="spec-label">high</span><span className="hightem">'+weather.high+'&deg;'+weather.units.temp+'</span></li></ul>';
			
			html += '<ul className="forcast-days">';
			
			/*Add below snippet if forcast required*/
			for(var i=1;i<weather.forecast.length -2 ;i++) {
				html += '<li><span className="forcast-day block">'+weather.forecast[i].day+'</span><img className="block" src="dist/img/weathericons/'+weather.code+'.svg"/><span className="forcast-high-deg block">'+weather.forecast[i].high+'&deg;C</span></li>';
			}
			html += '</ul>';
			$this.find(".weather").html(html);
		},
		error: function(error) {
			$this.find(".weather").html('<p>'+error+'</p>');
		}
	  });
	}

   if( $('#weather_2').length > 0 ){
    
		/*Without Forcast*/
		$.simpleWeather({
		location: 'Beijing, Beijing, CN',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var $this = $('#weather_2');
			var html='<span className="block temprature ">'+weather.temp+'<span className="unit">&deg;'+weather.units.temp+'</span></span>';
			$this.find('.left-block').html(html);
			//alert(this.id);
			html='<span className="block temprature-icon "><img src="dist/img/weathericons/'+weather.code+'.svg"/></span><h6>'+weather.city+'</h6>';
			
			$this.find('.right-block').html(html);
		},
		error: function(error) {
			console.log(error);
		}
	  });
   }
   
    if( $('#weather_3').length > 0 ){
    
		/*Without Forcast*/
		$.simpleWeather({
		location: 'Cape Town, Western Cape, ZA',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var $this = $('#weather_3');
			var html='<span className="block temprature">'+weather.temp+'<span className="unit">&deg;'+weather.units.temp+'</span></span>';
			$this.find('.left-block').html(html);
			//alert(this.id);
			html='<span className="block temprature-icon"><img src="dist/img/weathericons/'+weather.code+'.svg"/></span><h6>'+weather.city+'</h6>';
			
			$this.find('.right-block').html(html);
		},
		error: function(error) {
			console.log(error);
		}
	  });
   }
   
    if( $('#weather_4').length > 0 ){
    
		/*Without Forcast*/
		$.simpleWeather({
		location: 'Sydney, NSW, AU',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var $this = $('#weather_4');
			var html='<span className="block temprature">'+weather.temp+'<span className="unit">&deg;'+weather.units.temp+'</span></span>';
			$this.find('.left-block').html(html);
			//alert(this.id);
			html='<span className="block temprature-icon"><img src="dist/img/weathericons/'+weather.code+'.svg"/></span><h6>'+weather.city+'</h6>';
			
			$this.find('.right-block').html(html);
		},
		error: function(error) {
			console.log(error);
		}
	  });
   }
   
    if( $('#weather_5').length > 0 ){
    
		/*Without Forcast*/
		$.simpleWeather({
		location: 'Rome, LZ, IT',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var $this = $('#weather_5');
			var html='<span className="block temprature">'+weather.temp+'<span className="unit">&deg;'+weather.units.temp+'</span></span>';
			$this.find('.left-block').html(html);
			//alert(this.id);
			html='<span className="block temprature-icon"><img src="dist/img/weathericons/'+weather.code+'.svg"/></span><h6>'+weather.city+'</h6>';
			
			$this.find('.right-block').html(html);
		},
		error: function(error) {
			console.log(error);
		}
	  });
   }
   
};	

