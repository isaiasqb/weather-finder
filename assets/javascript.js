var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";
    // DOM elements
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var cityNameBtnEl = document.querySelector("#city-name-btn")
var currentStatsEl = document.querySelector("#current-day")


    //API call function for searching by City Name
var getWeatherInfo = function(cityName){fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&cnt=7&appid="+apiKey)

    .then(function(response){
        response.json().then(function(data){
            //console.log(data);

            console.log("longitude: " + data.coord.lon);
            var longitude = data.coord.lon;
            console.log("latitude: " + data.coord.lat);
            var latitude = data.coord.lat;

            getDailyWeather(latitude, longitude)
        });//end of inner.then
    });//end of .then
};


    // API call for daily weather
var getDailyWeather = function(lat, lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=hourly,minutely&units=metric&appid="+apiKey)
   .then(function(response){
       response.json().then(function(data){
           console.log(data);
       });//end of inner.then
   });//end of .then
};


    //SUBMIT form function
var cityNameSubmit = function(event) {
    event.preventDefault();

        //get the name of the city from the input of the user
    var cityName = cityNameEl.value.trim()

        //if there is a name make the API call for the weather stats
    if(cityName){
        console.log("searching for the weather in: "+ cityName)
        getWeatherInfo(cityName)
        cityNameEl.value = "";
    } else {        //if no name, please enter a name
        alert("Please enter the name of a City");
    }
}


    //SUBMIT form with user input
cityFormEl.addEventListener("submit", cityNameSubmit);




