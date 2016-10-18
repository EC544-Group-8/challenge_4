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

        var realtime_data1 = []; 
        var realtime_data2 = []; 
        var realtime_data3 = []; 
        var realtime_data4 = []; 
        var realtime_data5 = []; 

        var chart1 = new CanvasJS.Chart("sensor1",{
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
                dataPoints: realtime_data1
            }]
        });

        var chart2 = new CanvasJS.Chart("sensor2",{
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
                dataPoints: realtime_data2
            }]
        });

        var chart3 = new CanvasJS.Chart("sensor3",{
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
                dataPoints: realtime_data3
            }]
        });

        var chart4 = new CanvasJS.Chart("sensor4",{
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
                dataPoints: realtime_data4
            }]
        });

        var chart5 = new CanvasJS.Chart("sensor5",{
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
                dataPoints: realtime_data5
            }]
        });

        chart1.render();
        chart2.render();
        chart3.render();
        chart4.render();
        chart5.render();






        // Prepare the historical chart
        var time = new Date(2012,01,1);
        var temp = -500;    
        var updateInterval = 2000;
        var dataLength = 300; // number of dataPoints visible at any point

        var prevTime = 0;
        var updateChart = function () {
            // Get current avg temp and time
            for(for i = 0; i < 5; i++){ 
                $.get('/get_most_recent_sensor/' + i.toString(), function(data) {
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
                            switch(i){
                                case 0:
                                    realtime_data1.push({
                                        x: time,
                                        y: temp
                                    });
                                    // Scroll Realtime Chart if necessary
                                    if (realtime_data1.length > dataLength) {
                                        // pop the oldest reading
                                        realtime_data1.shift();
                                    }
                                    break;
                                case 1:
                                    realtime_data2.push({
                                        x: time,
                                        y: temp
                                    });
                                    // Scroll Realtime Chart if necessary
                                    if (realtime_data2.length > dataLength) {
                                        // pop the oldest reading
                                        realtime_data2.shift();
                                    }
                                    break;
                                case 2:
                                    realtime_data3.push({
                                        x: time,
                                        y: temp
                                    });
                                    // Scroll Realtime Chart if necessary
                                    if (realtime_data3.length > dataLength) {
                                        // pop the oldest reading
                                        realtime_data3.shift();
                                    }
                                    break;
                                case 3:
                                    realtime_data4.push({
                                        x: time,
                                        y: temp
                                    });
                                    // Scroll Realtime Chart if necessary
                                    if (realtime_data4.length > dataLength) {
                                        // pop the oldest reading
                                        realtime_data4.shift();
                                    }
                                    break;
                                case 4:
                                    realtime_data5.push({
                                        x: time,
                                        y: temp
                                    });
                                    // Scroll Realtime Chart if necessary
                                    if (realtime_data5.length > dataLength) {
                                        // pop the oldest reading
                                        realtime_data5.shift();
                                    }
                                    break;
                            }
                        }
                        
                        // Update Chart
                        switch(i){
                            case 0:
                                chart1.render();
                                break;
                            case 1:
                                chart2.render();
                                break;
                            case 2:
                                chart3.render();
                                break;
                            case 3:
                                chart4.render();
                                break;
                            case 4:
                                chart5.render();
                                break;
                        }
                        
                        //history_chart.render();
                        prevTime = time;
                    }
                });
            }
        };

        // This function needs to update the current temp variable every interval
        // var updateCurrentTemp = function() {
        //     // Go to the route on the server that is designed to return the most recent average
        //     $.get('/get_current_avg_temp', function(data) {
        //         // Update the HTML element that displays this data, and change its value
        //         $('#average').html(data.avg_reading.toFixed(2) + "&deg;C");
        //     });
        // };
        // generates first set of dataPoints...Only runs once then 
        //updateChart(dataLength);

        // update displays after specified time. 
        setInterval(function(){updateChart(1);}, updateInterval);
        //setInterval(function(){updateCurrentTemp();}, updateInterval);
        //setInterval(function() {document.getElementById('heatMapFrame').contentWindow.location.reload();},updateInterval);
        //setInterval(function(){updateSensorCharts();}, updateInterval);

    };
});
