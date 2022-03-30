var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";
// DOM elements
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var cityNameBtnEl = document.querySelector("#city-name-btn")


 //API call function
var getWeatherInfo = function(){fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid="+apiKey)
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
        });//end of inner.then
    });//end of .then
};


    //SUBMIT form function
var cityNameSubmit = function(event) {
    event.preventDefault();
    console.log(event);
}


    //submit form with user input
cityFormEl.addEventListener("submit", cityNameSubmit);


getWeatherInfo()

