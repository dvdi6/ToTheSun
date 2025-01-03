import WeatherForecast from '../Data/WeatherForecast.jsx'
import { destinations } from '../Data/DestinationsData.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import './Destinations.css'

export default function DestinationCard({ city, data, score }) {
    const destinationDetails = destinations.find(
        dest => dest.name.toLowerCase() === city.toLowerCase()
    )

    if (!destinationDetails) return null

    const getScoreColor = (score) => {
        if (score >= 7) return '#6BAF92'
        if (score >= 5) return '#F5A25D'
        return '#E57373'
    }

    return (
        <section className="destination-container" role="region" aria-labelledby="destination-header">
            <div className="destination-details-container">
                <div className="destination-name-container">
                    <h2 id="destination-header" className="destination-name">
                        {destinationDetails.name}, {destinationDetails.country}
                        <a
                            href={destinationDetails.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-link"
                            aria-label={`View location of ${destinationDetails.name} on a map`}
                        >
                            <FontAwesomeIcon icon={faMapPin} />
                        </a>
                    </h2>
                    <h3 className="destination-description" aria-label="Destination description">
                        {destinationDetails.description}
                    </h3>
                    <div
                        className="weather-score"
                        style={{ backgroundColor: getScoreColor(score) }}
                        aria-label={`Weather score: ${score}`}
                    >
                        {score}
                    </div>
                </div>
                <img
                    className="destination-image"
                    src={destinationDetails.img}
                    alt={`Image of ${destinationDetails.name}`}
                    // loading='lazy'
                />
            </div>
            <WeatherForecast data={data} aria-label="Weather forecast details" />
    </section>
    )
}