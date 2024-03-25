// Initialize Variables
let $cardBody = $('.card-body') 
let locationButton = document.querySelector('.location-btn')
let input = document.querySelector('input')
let cardHeader = document.querySelector('.card-header')


// Clear Card Body Function
emptyCardBody = () => $cardBody.empty();


// Get weather through User Input
document.addEventListener('submit', async function(e){
    emptyCardBody()
    let backIcon = document.createElement('span')
    backIcon.setAttribute('class', 'backIcon')
    backIcon.innerHTML = "<a href='.'><i class='fa-solid fa-circle-arrow-left' style='color: rgba(67,174,252,255);'></i></a>"


    let userInput = input.value
    console.log("User Input: ", userInput)

    let weather = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=a000c8b112b641b0859b59e065596991&include=minutely&city=${userInput}`)


    let weatherIconCode = weather.data.data[0].weather.icon
    let weatherIcon = document.createElement('img')
    weatherIcon.src = `https://cdn.weatherbit.io/static/img/icons/${weatherIconCode}.png`
    
    let celcius = weather.data.data[0].temp
    let farenheight = Math.round((celcius * 1.8) + 32)
    let weatherTemp = document.createElement('h1')
    weatherTemp.innerText = `${farenheight}°F`
    
    let weatherDescription = weather.data.data[0].weather.description
    let weatherDesc = document.createElement('h4')
    weatherDesc.innerText = `${weatherDescription}`

    let weatherLocation = document.createElement('h6')
    let city = weather.data.data[0].city_name
    let country = weather.data.data[0].country_code
    weatherLocation.innerHTML = `<i class="fa-solid fa-location-dot" style="color: rgba(67,174,252,255);"></i> ${city}, ${country}`
    
    $cardBody.append(weatherIcon)
    $cardBody.append(weatherTemp)
    $cardBody.append(weatherDesc)
    $cardBody.append(weatherLocation)
    cardHeader.prepend(backIcon)
  

})


// Get Weather through location button via ipgeolocation API
locationButton.addEventListener('click', async function(e){
    emptyCardBody()
    let backIcon = document.createElement('span')
    backIcon.setAttribute('class', 'backIcon')
    backIcon.innerHTML = "<a href='.'><i class='fa-solid fa-circle-arrow-left' style='color: rgba(67,174,252,255);'></i></a>"


    let res = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=41fd8ed37aab42cb87a3c6427b26d1dc')
    console.log(res)
    city = res.data.city
    country = res.data.country_code2
    console.log(city, country)


    let weather = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=a000c8b112b641b0859b59e065596991&include=minutely&city=${city}&country=${country}`)

    let weatherIconCode = weather.data.data[0].weather.icon
    let weatherIcon = document.createElement('img')
    weatherIcon.src = `https://cdn.weatherbit.io/static/img/icons/${weatherIconCode}.png`
    
    let celcius = weather.data.data[0].temp
    let farenheight = Math.round((celcius * 1.8) + 32)
    let weatherTemp = document.createElement('h1')
    weatherTemp.innerText = `${farenheight}°F`
    
    let weatherDescription = weather.data.data[0].weather.description
    let weatherDesc = document.createElement('h4')
    weatherDesc.innerText = `${weatherDescription}`

    let weatherLocation = document.createElement('h6')
    weatherLocation.innerHTML = `<i class="fa-solid fa-location-dot" style="color: rgba(67,174,252,255);"></i> ${city}, ${country}`
    
    $cardBody.append(weatherIcon)
    $cardBody.append(weatherTemp)
    $cardBody.append(weatherDesc)
    $cardBody.append(weatherLocation)
    cardHeader.prepend(backIcon)
    
})