// Initialize Variables
let $cardBody = $('.card-body') 
let locationButton = document.querySelector('.location-btn')
let input = document.querySelector('input')
let cardHeader = document.querySelector('.card-header')

// Insert API Keys
let weatherApiKey = "";
let geolocationApiKey = "";

// Clear Card Body Function
emptyCardBody = () => $cardBody.empty();

// Get weather through User Input
document.addEventListener('submit', async function(e){
    e.preventDefault();

    // Get User Input
    let userInput = input.value;

    // Pass User Input in WeatherAPI
    let res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${userInput}`);
    createCard(res);

})


// Get Weather through location button via ipgeolocation API
locationButton.addEventListener('click', async function(e){

    // Get IP
    let ipApi = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${geolocationApiKey}`)
    let ip = ipApi.data.ip;
    
    // Pass IP in WeatherAPI
    let res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${ip}`);
    createCard(res);

})

// Update Card Content
function createCard(res) {

    // Empty Content
    emptyCardBody()

    // Back Icon
    let backIcon = document.createElement('span')
    backIcon.setAttribute('class', 'backIcon')
    backIcon.innerHTML = "<a href='.'><i class='fa-solid fa-circle-arrow-left' style='color: rgba(67,174,252,255);'></i></a>"
    cardHeader.prepend(backIcon);

    // Icon
    let icon = document.createElement("img");
    let iconSrc = "https:" + res.data.current.condition.icon;
    icon.setAttribute("src", iconSrc);
    icon.setAttribute("height", "100px");
    icon.setAttribute("width", "100px");
    $cardBody.append(icon);

    // Temperature
    let temperature = document.createElement("h1");
    let temperatureData = `${res.data.current.temp_f}°F`;
    temperature.innerText = temperatureData;
    $cardBody.append(temperature);

    // Weather Condition
    let condition = document.createElement("h3");
    let conditionData = res.data.current.condition.text;
    condition.innerText = conditionData;
    $cardBody.append(condition);
    
    // Location
    let location = document.createElement("h6");
    let locationCity = res.data.location.name;
    let locationCountry = res.data.location.country;
    location.innerHTML = `<i class="fa-solid fa-location-dot" style="color: rgba(67,174,252,255);" ;aria-hidden="true"></i> ${locationCity}, ${locationCountry}`;
    $cardBody.append(location);
}