var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";

    // DOM elements
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var cityNameBtnEl = document.querySelector("#city-name-btn")
var currentStatsEl = document.querySelector("#current-day")
var containerDaysEl = document.querySelector(".future-days");
var containerHistoryEl = document.querySelector(".history-container");

    //CREATE the date
var now = luxon.DateTime.now().toFormat("yyyy LLL dd")


    //1st API call Searching the cities longitude and latitude stats
var getWeatherInfo = function(cityName){fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&cnt=5&appid="+apiKey)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                currentStatsEl.innerHTML = ""
                containerDaysEl.innerHTML = ""

                    // create title for the current day stats
                var cityTitle = document.createElement("h2");
                cityTitle.innerText = data.name + ", " + data.sys.country;
                currentStatsEl.appendChild(cityTitle);

                    // send the name of the city as parameter to create a button for search history
                saveCity(data.name);

                    //capture the longitude and latitude of the city and send them as parameters
                var longitude = data.coord.lon;
                var latitude = data.coord.lat;
                getDailyWeather(latitude, longitude)
            });//end of inner.then
        } else {
            alert("City name not found, please try again")

            currentStatsEl.innerHTML = ""
            containerDaysEl.innerHTML = ""
        }
    });//end of .then
};

    // 2nd API call: for daily weather
var getDailyWeather = function(lat, lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=hourly,minutely&units=metric&cnt=5&appid="+apiKey)
   .then(function(response){
       response.json().then(function(data){
           console.log(data);

                // create the HTML elements for the current day stats
            var cityDate = document.createElement("p");
            cityDate.className = "badge bg-dark";
            cityDate.innerText = now;
            var cityTemp = document.createElement("p");
            cityTemp.innerHTML = "<span class='alert-dark'>Temprature:</span>"+" "+ data.daily[0].temp.day +"°C";
            var cityWind = document.createElement("p");
            cityWind.innerHTML = "<span class='alert-dark'>Wind Speed:</span>"+" "+ data.daily[0].wind_speed +" Km/h";
            var cityHumid = document.createElement("p");
            cityHumid.innerHTML = "<span class='alert-dark'>Humidity:</span>"+" "+ data.daily[0].humidity +"%";
            var cityUvi = document.createElement("p");
            cityUvi.innerHTML = "<span class='alert-dark'>UVI Index:</span>"+" "+ data.daily[0].uvi;
            currentStatsEl.append(cityDate, cityTemp, cityWind, cityHumid, cityUvi);

                // dynamically generate 5 day forecast
            for (var i = 1; i < 6; i++) {
                // dynamic date
                var dyDate = luxon.DateTime.now().plus({ days: i }).toFormat("dd LLL yyyy");
                    
                    //card element
                var dayCard = document.createElement("div")
                    //5 coming days
                var cityDate = document.createElement("p");
                cityDate.className = "badge bg-dark";
                cityDate.innerText = dyDate;
                var cityTemp = document.createElement("p");
                cityTemp.innerHTML = "<span class='alert-dark'>Temprature:</span>"+" "+ data.daily[i].temp.day +"°C";
                var cityWind = document.createElement("p");
                cityWind.innerHTML = "<span class='alert-dark'>Wind Speed:</span>"+" "+ data.daily[i].wind_speed +" Km/h";
                var cityHumid = document.createElement("p");
                cityHumid.innerHTML = "<span class='alert-dark'>Humidity:</span>"+" "+ data.daily[i].humidity +"%";
                var cityUvi = document.createElement("p");
                cityUvi.innerHTML = "<span class='alert-dark'>UVI Index:</span>"+" "+ data.daily[i].uvi;
                dayCard.append(cityDate, cityTemp, cityWind, cityHumid, cityUvi);

                    //append all to the document
                containerDaysEl.append(dayCard);
            }//end of for loop

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


var recentCities = [];

var saveCity = function(name){
    console.log('This functions creates a button for: '+ name)
    
    var cityButton = document.createElement("button");
    cityButton.className = "cityBtn bg-info d-block";
    cityButton.innerHTML = name;
    containerHistoryEl.append(cityButton);

        // push the name of the searched city inside the string
    recentCities.push(name)
    console.log("recentCities: "+recentCities)
}
