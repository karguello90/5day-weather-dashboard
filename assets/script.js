let openWeatherKey = "ad6dc8b5eb7ef3c2731462f979925677";
let searchHistory = JSON.parse (localStorage.getItem("historyArray")) || []
$("#search-button").on("click",function(){
let searchValue = $("#search-input").val()
console.log(searchValue)
geoCode(searchValue)
historyButton(searchValue)
})
geoCode("orlando")
for(var i = 0; i < searchHistory.length; i ++) {
    historyButton(searchHistory[i])
}

function historyButton (searchValue) {
    var historyBTN=$("<button>").text(searchValue)
    $(historyBTN).on("click", function (){
        geoCode(searchValue)
    })
    $("#search-history").append(historyBTN)
}

//function for Geo Code
function geoCode(searchValue) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${openWeatherKey}`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
        searchHistory.push(searchValue)
        localStorage.setItem("historyArray",JSON.stringify(searchHistory))
        currentWeather(data[0].lat,data[0].lon)
        //need create forecast function just like currentWeather above
        currentForecast(data[0].lat,data[0].lon)
    })
}

//function to display current weather 
function currentWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
        $("#present-weather").empty()
        $(".present-selected-city").empty()
        $("#city-date").empty()
        $("#temperature-present").empty()
        $("#feels-like-present").empty()
        $("#humidity-present").empty()
        $("#wind-speed-present").empty()
        let cityName = $("<h3>").text(data.name)
        $(".present-selected-city").append(cityName)
        let todaysDate = $("<h3>").text(moment().format("M/D/YYYY"))
        $("#city-date").append(todaysDate)        
        //selectedCity.text(`(${todaysDate})`);
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
//function and for loop to get 5-day forecast
function currentForecast(lat,lon) {
    $("#forecast-weather").empty()
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`)
    .then(response=>response.json()) 
    .then(data=>{
        console.log(data)
    for (let i = 4; i < data.list.length; i = i + 8) {
        console.log(data.list[i])
    let forecastCard = $("<div>").addClass("card")
    let temp = $("<p>").text("Temp: " + data.list[i].main.temp + " \u00B0F")
    let feel = $("<p>").text("Feels Like: " + data.list[i].main.feels_like + " \u00B0F")
    let humidity = $("<p>").text("Humidity: " + data.list[i].main.humidity + " \u00B0F")
    let wind = $("<p>").text("Wind Speed: " + data.list[i].wind.speed + " MPH")
    let icon = $("<img>").attr("src","http://openweathermap.org/img/wn/10d@2x.png")
    forecastCard.append(icon, temp, feel, wind, humidity)
        $("#forecast-weather").append(forecastCard)
    }   
    })
}
