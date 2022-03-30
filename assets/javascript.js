var apiKey = "5dacd7c8902f3b17b76a6c25dd7320ee";
// DOM elements
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var cityNameBtnEl = document.querySelector("#city-name-btn")


 //API call function
var getWeatherInfo = function(cityName){fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey)

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
        //get the name of the city from the input of the user
    var cityName = cityNameEl.value.trim()

        //if there is a name make the API call
    if(cityName){
        console.log("searching for the weather in: "+ cityName)
        getWeatherInfo(cityName)
        cityNameEl.value = "";
    } else {        //if no name, please enter a name
        alert("Please enter the name of a City");
    }
}


    //submit form with user input
cityFormEl.addEventListener("submit", cityNameSubmit);



