
const weatherInfoOutput = document.querySelector('#weather-info-output')

// set the getLatLongData request to get the Latitude and the Longitude of the city mentioned
async function getLatLongData (cityName) {
    const nameURL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`

    try {
        weatherInfoOutput.textContent = ''
        userMessage('Chargement ...', weatherInfoOutput)
        const response = await fetch(nameURL)
        if(!response.ok) {
            throw new Error(`Response Status : ${response.status}`)
        }

        const answer = await response.json()
        return {
            latitude: answer.results[0].latitude,
            longitude: answer.results[0].longitude
        }    

    }catch (error) {
        errorMessage(`it be impossible for us to get some information about this city.
            Verify the city name and retry please`)
        verifyWeatherInfo()
        return "no"
    }

}

// set the getWeatherInfo function to recive the actuel weather informations
async function getWeatherInfo(cityLatLong, cityName) {

    try {
        const lat = cityLatLong.latitude
        const long = cityLatLong.longitude
        const infoURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
        userMessage('Chargement ...', weatherInfoOutput)
        const response = await fetch(infoURL)

        if(!response.ok) {
            throw new Error(`Response Status : ${response.status}`)
        }
        const answer = await response.json()
        const answersUnits = answer.current_weather_units
        const answersValues = answer.current_weather
        const date = new Date(answersValues.time).getTime()

        return {
            cityName: cityName,
            latitude: lat,
            longitude: long,
            weatherUnits: {
                temp: answersUnits.temperature,
                windSpeed: answersUnits.windspeed,
                windDirection: answersUnits.winddirection
            },
            weatherValue: {
                temp: answersValues.temperature,
                windSpeed: answersValues.windspeed,
                windDirection: answersValues.winddirection,
                weatherCode: answersValues.weathercode
            },
            time: `${new Date(date)}`,
            img: '',
            weatherSentence: ''
        }

    }catch (error) {
        errorMessage(`it be impossible for us to get some information about this city.
            Can you try with other city name?`)
        verifyWeatherInfo()
        return 'no'
    }
}

// save the last weatherInfo search in the local storage
const saveLastWeatherInfo = function (weatherInfo) {
    const weatherInfoJSON = JSON.stringify(weatherInfo)
    localStorage.setItem('weatherInfo', weatherInfoJSON)
}

// the principal meteoRequest function who contains the other meteo requests function
const meteoRequest = async function (cityName) {
    
    const cityLatLong = await getLatLongData(cityName)

    if (cityLatLong === 'no') return 'no'

    const weatherInfo = await getWeatherInfo(cityLatLong, cityName)
    if (weatherInfo === 'no') return 'no'

    saveLastWeatherInfo(weatherInfo)
    verifyWeatherInfo()
    return 'yes'
}


// Message Function
const userMessage = function (message, output) {
    const h2Message = document.createElement('h2')
    h2Message.textContent = message

    output.textContent = ''

    output.appendChild(h2Message)
}

// verify if the lastWeatherInfo is in the localStorage
const verifyWeatherInfo = function () {
    const weatherInfoJSON = localStorage.getItem('weatherInfo')
    const weatherInfo = JSON.parse(weatherInfoJSON)

    if (weatherInfo !== null){
        userMessage(`Last Weather info about ${weatherInfo.cityName}`, weatherInfoOutput)
        createDisplayWeaterInfo(weatherInfo)
        return weatherInfo
    }else {
        userMessage(`You haven't a last weather info`, weatherInfoOutput)
        return {}
    }
}

const defineWeatherCode = function (weatherCode) {
    if (weatherCode >= 45 && weatherCode <= 48){
        weatherCode = 45
    }else if (weatherCode >= 51 && weatherCode <= 67){
        weatherCode = 51
    }else if (weatherCode >= 71 && weatherCode <= 77){
        weatherCode = 71
    }else if ([80, 81, 82].includes(weatherCode)){
        weatherCode = 80
    }else if ([95, 96, 99].includes(weatherCode)){
        weatherCode = 95
    }

    return weatherCode
}

// create element and add it in the output div
const createDisplayWeaterInfo = function (weatherInfo) {
    const latitudeEl = document.createElement('p')
    const longitudeEl = document.createElement('p')
    const temperatureEl = document.createElement('p')
    const winddirectionEl = document.createElement('p')
    const windspeedEl = document.createElement('p')
    const actualTime = document.createElement('p')
    const weatherSentenceEl = document.createElement('p')

    latitudeEl.textContent = `Latitude: ${weatherInfo.latitude}`
    weatherInfoOutput.appendChild(latitudeEl)

    longitudeEl.textContent = `Longitude: ${weatherInfo.longitude}`
    weatherInfoOutput.appendChild(longitudeEl)

    temperatureEl.textContent = `Temperature: ${weatherInfo.weatherValue.temp}${weatherInfo.weatherUnits.temp}`
    weatherInfoOutput.appendChild(temperatureEl)

    winddirectionEl.textContent = `Wind direction: ${weatherInfo.weatherValue.windDirection}${weatherInfo.weatherUnits.windDirection}`
    weatherInfoOutput.appendChild(winddirectionEl)

    windspeedEl.textContent = `Wind Speed: ${weatherInfo.weatherValue.windSpeed}${weatherInfo.weatherUnits.windSpeed}`
    weatherInfoOutput.appendChild(windspeedEl)

    actualTime.textContent = `Time: ${weatherInfo.time}`
    weatherInfoOutput.appendChild(actualTime)

    const weatherCode = defineWeatherCode(weatherInfo.weatherValue.weatherCode)

    let weatherSentence = weatherInfo.weatherSentence

    switch (weatherCode) {
        case 0:
            weatherInfo.img = 'weather_app_backgrounds/weather_clear_sky.png'
            weatherSentence = 'Clear sky ☀️'
            break
        case 1:
            weatherInfo.img = 'weather_app_backgrounds/weather_lightly_cloudy.png'
            weatherSentence = 'Lightly Cloudy 🌤️'
            break
        case 2:
            weatherInfo.img = 'weather_app_backgrounds/weather_partly_cloudy.png'
            weatherSentence = 'Partly Cloudy 🌥️'
            break
        case 3:
            weatherInfo.img = 'weather_app_backgrounds/weather_overcast.png'
            weatherSentence = 'Overcast ⛅'
            break
        case 45:
            weatherInfo.img = 'weather_app_backgrounds/weather_fog_enhanced.png'
            weatherSentence = 'Fog 🌫️'
            break
        case 51:
            weatherInfo.img = 'weather_app_backgrounds/weather_rain_drizzle.png'
            weatherSentence = 'Rain/Drizzle 🌧️'
            break
        case 71:
            weatherInfo.img = 'weather_app_backgrounds/weather_snow.png'
            weatherSentence = 'Snow 🌨️❄️'
            break
        case 80:
            weatherInfo.img = 'weather_app_backgrounds/weather_showers.png'
            weatherSentence = 'Showers 🌦️'
            break
        case 95:
            weatherInfo.img = 'weather_app_backgrounds/weather_thunderstorm.png'
            weatherSentence = 'Thunderstorm ⛈️'
            break
    }

    weatherSentenceEl.textContent = `Sky State: ${weatherSentence}`
    weatherInfoOutput.appendChild(weatherSentenceEl)

    weatherInfoOutput.style.backgroundImage = `url(${weatherInfo.img})`
}

const errorMessage = function (message) {
    alert(message)
}

const saveLastFiveSearches = function (lastFiveSearches) {
    const lastFiveSearchesJSON = JSON.stringify(lastFiveSearches)
    localStorage.setItem('lastFiveSearches', lastFiveSearchesJSON)
}

const lastFiveOutput = document.querySelector('#last-five-output')

const getLastFiveSearches = function () {
    const lastFiveSearchesJSON = localStorage.getItem('lastFiveSearches')
    const lastFiveSearches = JSON.parse(lastFiveSearchesJSON)
    
    if (lastFiveSearches !== null){
        userMessage(`Last 5 city searches`, lastFiveOutput)
        verifyWeatherInfo()
        return lastFiveSearches
    }else {
        userMessage(`No Recent searches`, lastFiveOutput)
        return []
    }
}

const lastFiveSearches = getLastFiveSearches()
saveLastFiveSearches(lastFiveSearches)

const addAnSearche = function (cityName) {
    const lastFiveSearches = getLastFiveSearches()
    
    if (lastFiveSearches.length === 5){
        lastFiveSearches.shift()
        if(!lastFiveSearches.includes(cityName)) {
            lastFiveSearches.push(cityName)
        }
    }else if(!lastFiveSearches.includes(cityName)){
        lastFiveSearches.push(cityName)
    }else {
        errorMessage("It's impossible to add an existing city name in the lest 5 recent search")
    }

    saveLastFiveSearches(lastFiveSearches)
}

const displayLastFivesSearches = function () {
    const lastFiveSearches = getLastFiveSearches()

    lastFiveSearches.forEach(function (last) {
        const button = document.createElement('Button')
        button.textContent = last

        button.addEventListener('click', function (e) {
            meteoRequest(last)
        })

        lastFiveOutput.appendChild(button)
        
    })
}

const saveGoodCityName = async function(cityName) {
    const save = await meteoRequest(cityName)
    if(save === 'yes'){
        addAnSearche(cityName)
        displayLastFivesSearches()
    }
}

verifyWeatherInfo()
displayLastFivesSearches()

document.querySelector('#entry-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const cityName = e.target.cityName.value.trim()
    if (cityName !== ''){
        saveGoodCityName(cityName)
        e.target.cityName.value = ''
    }else {
        errorMessage(`Please enter a valid city name like \'paris\' or \'new york\'`)
    }

})
