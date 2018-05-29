var tempf;
var tempc;
$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var reqURL = 'https://api.darksky.net/forecast/24281708fc69374c4b7a60f7c92dd1e4/' + latitude + ','+ longitude;
            $('#latitude').html(latitude.toFixed(2));
            $('#longitude').html(longitude.toFixed(2));
            $.ajax({
                url:reqURL,
                dataType:"jsonp",
                type:"GET",
                data:{},
                success:function (data) {
                    $('#city').html(data.timezone);
                    $('#summary').html(data.currently.summary);
                    tempf = data.currently.temperature;
                    tempc = (tempf - 32)* 5/9;
                    $('#tempf').html(tempf.toFixed(0) + " ºF");
                    $('#tempf').click(function () {
                        $(this).hide();
                        $('#tempc').show();
                        $('#tempc').html(tempc.toFixed(0) + " ºC");
                    });
                    $('#tempc').click(function () {
                        $(this).hide();
                        $('#tempf').show();
                    });
                    checkTemp(tempc);
                }
            });
        });
    }
    function checkTemp(Celsius){
        if(Celsius>0 && Celsius <10){
            $('#start-pad').attr("src","images/021-snowing.png");
        }
        else if(Celsius >12 && Celsius <20){
            $('#start-pad').attr("src","images/021-winter.png");
        }
        else if(Celsius>20 && Celsius<=29){
            $('#start-pad').attr ("src","images/021-rain-1.png");
        }
        else if(Celsius >= 30 && Celsius <=34){
            $('#start-pad').attr("src","images/021-cloudy-1.png");
        }
        else if(Celsius>34){
            $('#start-pad').attr("src","images/021-sun.png");
        }
    }
});