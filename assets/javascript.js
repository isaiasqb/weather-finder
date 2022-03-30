var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";

var getWeatherInfo = function(){fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid="+apiKey)
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
        });//end of inner.then
    });//end of .then
};

getWeatherInfo()