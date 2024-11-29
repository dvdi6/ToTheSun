import { weatherCodeDescriptions } from "./WeatherCodeDescription"

export default function calculateWeatherScore(weatherData) {
    let goodWeatherDays = 0
    let warmDays = 0
    let sunnyDays = 0

    weatherData.weathercode.forEach((code, index) => {
        const maxTemp = weatherData.temperature_2m_max[index]
        const weatherDescription = weatherCodeDescriptions[code]

        const isGoodWeather = ["Sunny ☀️", "Mostly Sun 🌤️", "Partly Cloudy 🌥️"].includes(weatherDescription)
        const isSunny = ["Sunny ☀️", "Mostly Sun 🌤️"].includes(weatherDescription)
        const isWarm = maxTemp >= 20
        const isMild = maxTemp >= 15

        if (isSunny) sunnyDays++
        if (isGoodWeather) goodWeatherDays++
        if (isWarm) warmDays++
        else if (isGoodWeather && isMild) warmDays += 0.5 
    })

    if (goodWeatherDays >= 7 && warmDays >= 5) return 10
    if (goodWeatherDays >= 6 && warmDays >= 4) return 9
    if (goodWeatherDays >= 5 && sunnyDays >= 4 && warmDays >= 4) return 8
    if (goodWeatherDays >= 5 && warmDays >= 3) return 7
    if (goodWeatherDays >= 4 && warmDays >= 2) return 6
    if (goodWeatherDays >= 3 && warmDays >= 1) return 5
    if (goodWeatherDays >= 2) return 4
    if (goodWeatherDays >= 1) return 3
    return 2
}