let openWeatherKey = "ad6dc8b5eb7ef3c2731462f979925677";

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

//variables and functions to label each item and append to
let searchedCity = $()
let searchCityDate = moment().format("");
searchedCity.text(`${}`)

//function to display current weather 
function currentWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
        let temp = $("<h3>").text("Temp: "+ data.main.temp + " \u00B0F")
        $("#temperature-present").append(temp)
        let humidity = $("<h3>").text("Humidity: "+ data.main.humidity + " %")
        $("#humidity-present").append(humidity)
    })
}

