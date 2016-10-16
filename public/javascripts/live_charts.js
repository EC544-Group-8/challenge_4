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

$(document).ready(function () {

    window.onload = function () {

        var realtime_data = []; 

        var chart1 = new CanvasJS.Chart("scroller",{
            title :{
                text: "Real Time Average Temperature"
            },          
            axisX:{
                title:"Time (s)"
            },
            axisY:{
                title:"Temperature (°C)",
                maximum: 40,
                minimum: 0,
            },
            data: [{
                type: "line",
                dataPoints: realtime_data
            }]
        });

        var chart2 = new CanvasJS.Chart("scroller",{
            title :{
                text: "Real Time Average Temperature"
            },          
            axisX:{
                title:"Time (s)"
            },
            axisY:{
                title:"Temperature (°C)",
                maximum: 40,
                minimum: 0,
            },
            data: [{
                type: "line",
                dataPoints: realtime_data
            }]
        });

        var chart3 = new CanvasJS.Chart("scroller",{
            title :{
                text: "Real Time Average Temperature"
            },          
            axisX:{
                title:"Time (s)"
            },
            axisY:{
                title:"Temperature (°C)",
                maximum: 40,
                minimum: 0,
            },
            data: [{
                type: "line",
                dataPoints: realtime_data
            }]
        });

        var chart4 = new CanvasJS.Chart("scroller",{
            title :{
                text: "Real Time Average Temperature"
            },          
            axisX:{
                title:"Time (s)"
            },
            axisY:{
                title:"Temperature (°C)",
                maximum: 40,
                minimum: 0,
            },
            data: [{
                type: "line",
                dataPoints: realtime_data
            }]
        });

        var chart5 = new CanvasJS.Chart("scroller",{
            title :{
                text: "Real Time Average Temperature"
            },          
            axisX:{
                title:"Time (s)"
            },
            axisY:{
                title:"Temperature (°C)",
                maximum: 40,
                minimum: 0,
            },
            data: [{
                type: "line",
                dataPoints: realtime_data
            }]
        });


        // Prepare the historical chart
        var time = new Date(2012,01,1);
        var temp = -500;    
        var updateInterval = 1000;
        var dataLength = 300; // number of dataPoints visible at any point

        var prevTime = 0;
        var updateChart = function () {
            // Get current avg temp and time
            $.get('/get_current_avg_temp', function(data) {
                temp = parseFloat(data.avg_reading);
                // console.log('DATA: '+data.date_received);
                parse_time(data.date_received, function(new_time) {
                    time = new_time;
                });
            
                // var currentTime = new Date();
                // var offset = new Date().getTimezoneOffset();
                // currentTime.setHours(currentTime.getHours() + (offset/-60));
                // console.log("in chart.js current time is:");
                console.log(time);
                if(time > prevTime){
                    console.log("Time within conditional")
                    console.log(time);
                    console.log(prevTime);
                    // Update the charts if there is a new average reading
                    if (temp > -500){
                        // Add the new reading to the realtime chart
                        realtime_data.push({
                            x: time,
                            y: temp
                        });
                        // Add the new reading to the historical chart
                        // historical_data.push({
                        //  x: time,
                        //  y: temp
                        // });
                    }

                    // Scroll Realtime Chart if necessary
                    if (realtime_data.length > dataLength) {
                        // pop the oldest reading
                        realtime_data.shift();
                    }
                    
                    // Update Chart
                    chart.render();
                    //history_chart.render();
                    prevTime = time;
                }
            });

        };

        // This function needs to update the current temp variable every interval
        var updateCurrentTemp = function() {
            // Go to the route on the server that is designed to return the most recent average
            $.get('/get_current_avg_temp', function(data) {
                // Update the HTML element that displays this data, and change its value
                $('#average').html(data.avg_reading.toFixed(2) + "&deg;C");
            });
        };
        // generates first set of dataPoints...Only runs once then 
        updateChart(dataLength);

        // update displays after specified time. 
        setInterval(function(){updateChart(1);}, updateInterval);
        setInterval(function(){updateCurrentTemp();}, updateInterval);
        setInterval(function() {document.getElementById('heatMapFrame').contentWindow.location.reload();},updateInterval);
        //setInterval(function(){updateSensorCharts();}, updateInterval);

    };
});
