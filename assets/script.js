let openWeatherKey = "ad6dc8b5eb7ef3c2731462f979925677";

//let presentWeatherPart = function(searchedCity) {
    //fetch(`api.openweathermap.org`)
//}

// let presentWeatherPart = function(searchedCity)
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={ad6dc8b5eb7ef3c2731462f979925677}`)
    // .then(function(response) {
    // return response.json();
    // })
    

//let forecastFiveDayPart = 


$("#search-button").on("click",function(){
var searchValue = $("#search-input").val()
console.log(searchValue)
geoCode(searchValue)
})

//function for Geo Code
function geoCode(searchValue) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${openWeatherKey}`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
        currentWeather(data[0].lat,data[0].lon)
        //plug in forecast function just like currentWeather above
    })
}

function currentWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
        var temp = $("<h3>").text("temp:"+ data.main.temp)
        $("#temperature-present").append(temp)
        var humidity = $("<h3>").text("humidity:"+ data.main.humidity)
        $("#humidity-present").append(humidity)
    })
}

