import WeatherForecast from '../WeatherForecast/WeatherForecast.jsx'
import { weatherCodeDescriptions } from '../Data/WeatherCodeDescription.js'
import { destinations } from './DestinationsData.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import './Destinations.css'

export default function DestinationCard({ city, data, score, selectedWeatherTypes, temperature }) {

    const destinationDetails = destinations.find(
        dest => dest.name.toLowerCase() === city.toLowerCase()
    )

    if (!destinationDetails) return null

    const matchesSelectedWeather =
        selectedWeatherTypes.length === 0 ||
        data.weathercode.some(code => selectedWeatherTypes.includes(weatherCodeDescriptions[code]))

    const hasDesiredTemperature = data.temperature_2m_max.some(
        temp => temp >= temperature
    )

    const shouldDisplayDestination = (selectedWeatherTypes.length === 0 || matchesSelectedWeather) && hasDesiredTemperature

    const getScoreColor = (score) => {
        if (score >= 7) {
            return '#6BAF92';
        } else if (score >= 5) {
            return '#F5A25D';
        } else {
            return '#E57373';
        }
    }

    if (!shouldDisplayDestination) return null

    return (
        <div className="destination-container">
            <div className="destination-details-container">
                <div className="destination-name-container">
                    <h2 className="destination-name">
                        {destinationDetails.name}, {destinationDetails.country}
                        <a
                            href={destinationDetails.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-link"
                        >
                            <FontAwesomeIcon icon={faMapPin} />
                        </a>
                    </h2>
                    <h3 className="destination-description">
                        {destinationDetails.description}
                    </h3>
                    <div className="weather-score" style={{ backgroundColor: getScoreColor(score) }}>{score}</div>
                </div>
                <img
                    className="destination-image"
                    src={destinationDetails.img}
                    alt={destinationDetails.name}
                />
            </div>
            <WeatherForecast data={data} />
        </div>
    )
}