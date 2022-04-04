var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";

    // DOM elements
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var cityNameBtnEl = document.querySelector("#city-name-btn")
var currentStatsEl = document.querySelector("#current-day")
var containerDaysEl = document.querySelector(".future-days");
var containerHistoryEl = document.querySelector(".history-container");
var fiveDayTitleEl = document.querySelector("#five-day-title")

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
            var cityUvi = document.createElement("span");
            cityUvi.innerHTML = "UVI Index: <tag id='uv-index'>"+data.daily[0].uvi;"+</tag>"
            cityUvi.style.color = "white" 

            fiveDayTitleEl.innerText = "5-Day Forecast"

                // display the weather ocnditions icon for the day
            var cityConditionToday = data.daily[0].weather[0].main
            var cityIconToday = document.createElement("img")
            cityIconToday.setAttribute("src", "./assets/svg/animated/"+cityConditionToday+".svg")

            currentStatsEl.append(cityDate, cityIconToday, cityTemp, cityWind, cityHumid, cityUvi);

                //change color in UVI index
            var uvIndexTagEl = document.querySelector("#uv-index");
            var uvIndex = data.daily[0].uvi
            if(uvIndex < 2.9){
                cityUvi.style.backgroundColor = "#639045"
            } else if (uvIndex >= 3 && uvIndex < 5.9){
                cityUvi.style.backgroundColor = "#E09200"
            } else if (uvIndex >= 5 && uvIndex < 7.9){
                cityUvi.style.backgroundColor = "#C66607"
            } else if (uvIndex >= 8  && uvIndex < 10.9){
                cityUvi.style.backgroundColor = "#AE2012"
            } else {
                cityUvi.style.backgroundColor = "#57229C"
            }


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

                    // display the weather coniditions and icon
                var cityCondition = data.daily[i].weather[0].main
                var cityIcon = document.createElement("img")
                cityIcon.setAttribute("src", "./assets/svg/animated/"+cityCondition+".svg")
                
                    //append to the container called card for each day
                dayCard.append(cityDate, cityTemp, cityWind, cityHumid, cityIcon);
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
    // console.log(recentCities)

    //iterate through the recentCities 
    // if a city matches a value don't run
    // return
    for (let i = 0; i < recentCities.length; i++) {
        if (name === recentCities[i]){
            return
        }
    }

    var cityButton = document.createElement("button");
    cityButton.className = "cityBtn bg-info d-block";
    cityButton.innerHTML = name;
    cityButton.addEventListener("click", function (){
        getWeatherInfo(name)
    })
    containerHistoryEl.append(cityButton);
 

        // push the name of the searched city inside the string
    recentCities.push(name)
}
