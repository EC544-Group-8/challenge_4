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
                title:"Time"
            },
            axisY:{
                title:"Temperature (°F)",
                maximum: 90,
                minimum: 60,
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
                title:"Time"
            },
            axisY:{
                title:"Temperature (°F)",
                maximum: 90,
                minimum: 60,
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
                title:"Time"
            },
            axisY:{
                title:"Temperature (°F)",
                maximum: 90,
                minimum: 60,
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
                title:"Time"
            },
            axisY:{
                title:"Temperature (°F)",
                maximum: 90,
                minimum: 60,
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
                title:"Time"
            },
            axisY:{
                title:"Temperature (°F)",
                maximum: 90,
                minimum: 60,
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
        var updateChart1 = function() {      
            $.get('/get_most_recent_sensor/1', function(data) {
                temp = parseFloat(data.reading);
                console.log('the temp is:');
                console.log(temp);
                parse_time(data.date_received, function(new_time) {
                    time = new_time;
                }); 
                console.log("Data Recorded Time...");
                console.log(time);
                console.log('PREV TIME...');
                console.log(prevTime);
                // Update the charts if there is a new average reading
                if (temp > -500){
                    // Add the new reading to the realtime chart
                        realtime_data1.push({
                            x: time,
                            y: temp
                        });
                        // Scroll Realtime Chart if necessary
                        if (realtime_data1.length > dataLength) {
                            // pop the oldest reading
                            realtime_data1.shift();
                        };
                        console.log('ABOUT to render chart ');
                        
                }
                prevTime = time;
                chart1.render();
            });      
        };
        var updateChart2 = function() {      
            $.get('/get_most_recent_sensor/2', function(data) {
                temp = parseFloat(data.reading);
                console.log('the temp is:');
                console.log(temp);
                parse_time(data.date_received, function(new_time) {
                    time = new_time;
                }); 
                console.log("Data Recorded Time...");
                console.log(time);
                console.log('PREV TIME...');
                console.log(prevTime);
                // Update the charts if there is a new average reading
                if (temp > -500){
                    // Add the new reading to the realtime chart
                        realtime_data2.push({
                            x: time,
                            y: temp
                        });
                        // Scroll Realtime Chart if necessary
                        if (realtime_data2.length > dataLength) {
                            // pop the oldest reading
                            realtime_data2.shift();
                        };
                        console.log('ABOUT to render chart ');
                        
                }
                prevTime = time;
                chart2.render();
            });      
        };
        var updateChart3 = function() {      
            $.get('/get_most_recent_sensor/3', function(data) {
                temp = parseFloat(data.reading);
                console.log('the temp is:');
                console.log(temp);
                parse_time(data.date_received, function(new_time) {
                    time = new_time;
                }); 
                console.log("Data Recorded Time...");
                console.log(time);
                console.log('PREV TIME...');
                console.log(prevTime);
                // Update the charts if there is a new average reading
                if (temp > -500){
                    // Add the new reading to the realtime chart
                        realtime_data3.push({
                            x: time,
                            y: temp
                        });
                        // Scroll Realtime Chart if necessary
                        if (realtime_data3.length > dataLength) {
                            // pop the oldest reading
                            realtime_data3.shift();
                        };
                        console.log('ABOUT to render chart ');
                        
                }
                prevTime = time;
                chart3.render();
            });      
        };
        var updateChart4 = function() {      
            $.get('/get_most_recent_sensor/4', function(data) {
                temp = parseFloat(data.reading);
                console.log('the temp is:');
                console.log(temp);
                parse_time(data.date_received, function(new_time) {
                    time = new_time;
                }); 
                console.log("Data Recorded Time...");
                console.log(time);
                console.log('PREV TIME...');
                console.log(prevTime);
                // Update the charts if there is a new average reading
                if (temp > -500){
                    // Add the new reading to the realtime chart
                        realtime_data4.push({
                            x: time,
                            y: temp
                        });
                        // Scroll Realtime Chart if necessary
                        if (realtime_data4.length > dataLength) {
                            // pop the oldest reading
                            realtime_data4.shift();
                        };
                        console.log('ABOUT to render chart ');
                        
                }
                prevTime = time;
                chart4.render();
            });      
        };
        var updateChart5 = function() {      
            $.get('/get_most_recent_sensor/5', function(data) {
                temp = parseFloat(data.reading);
                console.log('the temp is:');
                console.log(temp);
                parse_time(data.date_received, function(new_time) {
                    time = new_time;
                }); 
                console.log("Data Recorded Time...");
                console.log(time);
                console.log('PREV TIME...');
                console.log(prevTime);
                // Update the charts if there is a new average reading
                if (temp > -500){
                    // Add the new reading to the realtime chart
                        realtime_data5.push({
                            x: time,
                            y: temp
                        });
                        // Scroll Realtime Chart if necessary
                        if (realtime_data5.length > dataLength) {
                            // pop the oldest reading
                            realtime_data5.shift();
                        };
                        console.log('ABOUT to render chart ');
                        
                }
                prevTime = time;
                chart5.render();
            });      
        };
        // update displays after specified time. 
        setInterval(function(){updateChart1();}, 2000);
        setInterval(function(){updateChart2();}, 3000);
        setInterval(function(){updateChart3();}, 4000);
        setInterval(function(){updateChart4();}, 5000);
        setInterval(function(){updateChart5();}, 6000);
        //setInterval(function(){updateSensorCharts();}, updateInterval);
    };
});
