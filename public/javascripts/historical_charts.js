// What type of function declarations are these?
var parse_time = function(time, done) {
	// YYYY-MM-DDTHH:MM:SS.0007  to seconds
	// console.log("full time is " + time);
	console.log('string time:  ' + time);
	var year = parseInt(time.substr(0,4),10);
	var month = parseInt(time.substr(5,2),10)-1; // For the right month
	var day = parseInt(time.substr(8,2),10);
	var hour = parseInt(time.substr(11,2),10)-4; // For right time zone (sort of)
	var minute = parseInt(time.substr(14,2),10);
	var second = parseInt(time.substr(17,2),10);
	// console.log("time is: " + time_str);

	var time_date = new Date(year,month,day,hour,minute,second);

	// var offset = new Date().getTimezoneOffset();
	// time_date.setHours(time_date.getHours() + (offset/-60));
	console.log("time is: " + time_date);
	done(time_date);
};

var minTime = new Date(2016,09,16,22,1,1,1);
var maxTime = new Date(2016,09,17,22,1,1,1);


var sensor1_data = [];
var sensor2_data = [];
var sensor3_data = [];
var sensor4_data = [];
var sensor5_data = [];

var sensor1_chart = new CanvasJS.Chart("sensor1",{
	title :{
		text: "Cranky Dentist"
	},			
	axisX:{
		title:"Time",
		maximum: maxTime,
		minimum: minTime,
		labelFormatter: function (e) {
			return CanvasJS.formatDate( e.value, "DD MMM YYYY");
		}

	},
	axisY:{
		title:"Temperature (°F)",
		maximum: 85,
		minimum: 65,
	},
	data: [{
		type: "spline",
		dataPoints: sensor1_data 
	}]
});

var sensor2_chart = new CanvasJS.Chart("sensor2",{
	title :{
		text: "Monkey Cowboy"
	},			
	axisX:{
		title:"Time",
		maximum: maxTime,
		minimum: minTime,
		labelFormatter: function (e) {
			return CanvasJS.formatDate( e.value, "DD MMM YYYY");
		}
	},
	axisY:{
		title:"Temperature (°F)",
		maximum: 85,
		minimum: 65,
	},
	data: [{
		type: "spline",
		dataPoints: sensor2_data 
	}]
});

var sensor3_chart = new CanvasJS.Chart("sensor3",{
	title :{
		text: "Hobo Gerbil"
	},			
	axisX:{
		title:"Time",
		maximum: maxTime,
		minimum: minTime,
		labelFormatter: function (e) {
			return CanvasJS.formatDate( e.value, "DD MMM YYYY");
		}
	},
	axisY:{
		title:"Temperature (°F)",
		maximum: 85,
		minimum: 65,
	},
	data: [{
		type: "spline",
		dataPoints: sensor3_data 
	}]
});

var sensor4_chart = new CanvasJS.Chart("sensor4",{
	title :{
		text: "Trochee Wombat"
	},			
	axisX:{
		title:"Time",
		maximum: maxTime,
		minimum: minTime,
		labelFormatter: function (e) {
			return CanvasJS.formatDate( e.value, "DD MMM YYYY");
		}
	},
	axisY:{
		title:"Temperature (°F)",
		maximum: 85,
		minimum: 65,
	},
	data: [{
		type: "spline",
		dataPoints: sensor4_data 
	}]
});

var sensor5_chart = new CanvasJS.Chart("sensor5",{
	title :{
		text: "Jester Jetpack"
	},			
	axisX:{
		title:"Time",
		maximum: maxTime,
		minimum: minTime,
		labelFormatter: function (e) {
			return CanvasJS.formatDate( e.value, "DD MMM YYYY");
		}
	},
	axisY:{
		title:"Temperature (°F)",
		maximum: 85,
		minimum: 65,
	},
	data: [{
		type: "spline",
		dataPoints: sensor5_data 
	}]
});

$(document).ready(function () {
	window.onload = function () {
		$.get('/get_hist_sensor/1', function (s1_hist_data) {
			console.log('GETTING HIST 1 DATA...');
			for (var i = 0; i < s1_hist_data.length; i++) {
				var xtime;
				var xtemp = parseFloat(s1_hist_data[i].reading);
				
				parse_time(s1_hist_data[i].date_received, function(new_time) {
					xtime = new_time;
				});

				// Push it to the array for storage
				sensor1_data.push({
					x: xtime,
					y: xtemp
				});
			}

			sensor1_chart.render();
		});


		$.get('/get_hist_sensor/2', function (s2_hist_data) {
			for (var i = 0; i < s2_hist_data.length; i++) {
				var xtime;
				var xtemp = parseFloat(s2_hist_data[i].reading);
				
				parse_time(s2_hist_data[i].date_received, function(new_time) {
					xtime = new_time;
				});

				// Push it to the array for storage
				sensor2_data.push({
					x: xtime,
					y: xtemp
				});
			}

			sensor2_chart.render();
		});


		$.get('/get_hist_sensor/3', function (s3_hist_data) {
			for (var i = 0; i < s3_hist_data.length; i++) {
				var xtime;
				var xtemp = parseFloat(s3_hist_data[i].reading);
				
				parse_time(s3_hist_data[i].date_received, function(new_time) {
					xtime = new_time;
				});

				// Push it to the array for storage
				sensor3_data.push({
					x: xtime,
					y: xtemp
				});
			}
			sensor3_chart.render();
		});

		$.get('/get_hist_sensor/4', function (s4_hist_data) {
			for (var i = 0; i < s4_hist_data.length; i++) {
				var xtime;
				var xtemp = parseFloat(s4_hist_data[i].reading);
				
				parse_time(s4_hist_data[i].date_received, function(new_time) {
					xtime = new_time;
				});

				// Push it to the array for storage
				sensor4_data.push({
					x: xtime,
					y: xtemp
				});
			}
			sensor4_chart.render();
		});

		$.get('/get_hist_sensor/5', function (s5_hist_data) {
			for (var i = 0; i < s5_hist_data.length; i++) {
				var xtime;
				var xtemp = parseFloat(s5_hist_data[i].reading);
				
				parse_time(s5_hist_data[i].date_received, function(new_time) {
					xtime = new_time;
				});

				// Push it to the array for storage
				sensor5_data.push({
					x: xtime,
					y: xtemp
				});
			}
			sensor5_chart.render();
		});

		var dateFormat = "yy-mm-dd",
		  from = $( "#from" )
			.datepicker({
			  defaultDate: "+1w",
			  changeMonth: true,
			  numberOfMonths: 1,
		      dateFormat: "yy-mm-dd"
			})

		from.on( "change", function() {
			  to.datepicker( "option", "minDate", getDate( this ) );
			  s = from.val();
			  var year = parseInt(s.substring(0,4));
			  var month = parseInt(s.substring(5,7)) - 1;
			  var day = parseInt(s.substring(8,10));
			  minTime = new Date(year,month,day,1,1,1);
			  console.log("MinTime: " + minTime);
			  sensor1_chart.options.axisX.minimum = minTime;
			  sensor1_chart.render();
			  sensor2_chart.options.axisX.minimum = minTime;
			  sensor2_chart.render();
			  sensor3_chart.options.axisX.minimum = minTime;
			  sensor3_chart.render();
			  sensor4_chart.options.axisX.minimum = minTime;
			  sensor4_chart.render();
			  sensor5_chart.options.axisX.minimum = minTime;
			  sensor5_chart.render();
		}),
		to = $( "#to" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			dateFormat: "yy-mm-dd"
		})
		to.on( "change", function() {
			from.datepicker( "option", "maxDate", getDate( this ) );
			s = to.val();
			var year = parseInt(s.substring(0,4));
			var month = parseInt(s.substring(5,7)) - 1;
			var day = parseInt(s.substring(8,10));
			maxTime = new Date(year,month,day,1,1,1);
			console.log("MaxTime: " + maxTime);
			sensor1_chart.options.axisX.maximum = maxTime;
			sensor1_chart.render();
			sensor2_chart.options.axisX.maximum = maxTime;
			sensor2_chart.render();
			sensor3_chart.options.axisX.maximum = maxTime;
			sensor3_chart.render();
			sensor4_chart.options.axisX.maximum = maxTime;
			sensor4_chart.render();
			sensor5_chart.options.axisX.maximum = maxTime;
			sensor5_chart.render();
		});
		 
		function getDate( element ) {
		  var date;
		  try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		  } catch( error ) {
			date = null;
		  }
	 
		  return date;
		}
	}
});
