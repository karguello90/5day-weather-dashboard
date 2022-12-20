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

//function to display current weather 
function currentWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
        let temp = $("<h3>").text("Temp: "+ data.main.temp + " \u00B0F ")
        $("#temperature-present").append(temp)
        let feels_like = $("<h3>").text("Feels Like: "+ data.main.feels_like + " \u00B0F")
        $("#feels-like-present").append(feels_like)
        let humidity = $("<h3>").text("Humidity: "+ data.main.humidity + " %")
        $("#humidity-present").append(humidity)
        let wind_speed = $("<h3>").text("Wind Speed: "+ data.wind.speed + " MPH")
        $("#wind-speed-present").append(wind_speed)
    })
}

