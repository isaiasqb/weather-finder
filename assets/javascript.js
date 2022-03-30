var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";
    // DOM elements
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var cityNameBtnEl = document.querySelector("#city-name-btn")
var currentStatsEl = document.querySelector("#current-day")


    //1st API call Searching the cities longitude and latitude stats
var getWeatherInfo = function(cityName){fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&cnt=7&appid="+apiKey)
    .then(function(response){
        response.json().then(function(data){

                // create title for the current day stats
            var cityTitle = document.createElement("h2");
            cityTitle.innerText = data.name + ", " + data.sys.country;
            currentStatsEl.appendChild(cityTitle);
                //capture the longitude and latitude of the city and send them as parameters
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;
            getDailyWeather(latitude, longitude)
        });//end of inner.then
    });//end of .then
};

    // 2nd API call: for daily weather
var getDailyWeather = function(lat, lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=hourly,minutely&units=metric&appid="+apiKey)
   .then(function(response){
       response.json().then(function(data){
           console.log(data);

                // create the HTML elements for the current day stats
            var cityTemp = document.createElement("p");
            cityTemp.innerHTML = "<span class='alert-dark'>Temprature:</span>"+" "+ data.daily[0].temp.day +"°C";

            var cityWind = document.createElement("p");
            cityWind.innerHTML = "<span class='alert-dark'>Wind Speed:</span>"+" "+ data.daily[0].wind_speed +" Km/h";

            var cityHumid = document.createElement("p");
            cityHumid.innerHTML = "<span class='alert-dark'>Humidity:</span>"+" "+ data.daily[0].humidity +"%";

            var cityUvi = document.createElement("p");
            cityUvi.innerHTML = "<span class='alert-dark'>UVI Index:</span>"+" "+ data.daily[0].uvi;
            currentStatsEl.append(cityTemp, cityWind, cityHumid, cityUvi);

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




