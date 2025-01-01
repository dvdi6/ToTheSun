import { useContext, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { WeatherDataContext } from '../Data/FetchWeatherData.jsx'
import { weatherCodeDescriptions } from '../Data/WeatherCodeDescription.js'
import './Destinations.css'
import { AppContext } from '../Data/AppContext.jsx'
import SortButtons from '../Buttons/SortButtons.jsx'
import DestinationCard from './DestinationCard.jsx'
import calculateWeatherScore from '../Data/calculateWeatherScore.js'
import { NavLink } from 'react-router-dom'
import Home from '../../components/Home/Home'
import ToggleButton from '../Buttons/ToggleButton.jsx'
import { ClipLoader } from 'react-spinners'

export default function Destinations() {
    const { loading, weatherData, error } = useContext(WeatherDataContext)
    const { selectedWeatherTypes, temperature, resetWeatherTypes } = useContext(AppContext)
    const [sortConfig, setSortConfig] = useState({ type: 'name', asc: true })

    const navigate = useNavigate()

    const destinationsWithScore = useMemo(() => {
        return Object.entries(weatherData).map(([city, data]) => {
            const score = calculateWeatherScore(data)
            return { city, data, score }
        })
    }, [weatherData])

    const filteredDestinations = useMemo(() => {
        return destinationsWithScore.filter(({ city, data }) => {
            const matchesSelectedWeather =
                selectedWeatherTypes.length === 0 ||
                data.weathercode.some(code =>
                    selectedWeatherTypes.includes(weatherCodeDescriptions[code])
                )

            const hasDesiredTemperature = data.temperature_2m_max.some(
                temp => temp >= temperature
            )

            return matchesSelectedWeather && hasDesiredTemperature
        })
    }, [destinationsWithScore, selectedWeatherTypes, temperature])

    const sortedDestinations = useMemo(() => {
        const sortedArray = [...filteredDestinations]
        return sortedArray.sort((a, b) => {
            if (sortConfig.type === 'name') {
                return sortConfig.asc
                    ? a.city.localeCompare(b.city)
                    : b.city.localeCompare(a.city)
            } else {
                return sortConfig.asc ? a.score - b.score : b.score - a.score
            }
        })
    }, [filteredDestinations, sortConfig])

    return (
        <>
            <div className="container-header-link" role="banner" aria-labelledby="header-title">
                {error && (
                    <p className="error" role="alert" aria-live="assertive">
                        Sorry, we are currently experiencing an issue with our data. Please return later or let us know in our 
                        <NavLink id="link-home" to="/contact" aria-label="Contact form for reporting issues">Form</NavLink>
                    </p>
                )}
                <NavLink id="link-home" to="/" element={<Home />} aria-label="Go to Home">
                    Home
                </NavLink>
                <h1 className="header-destinations">7-Day Forecast Destinations</h1>
                {loading && <ClipLoader aria-label="Loading destinations, please wait"/>}
                <div className="buttons-destinations" role="group" aria-label="Sorting and filtering options">
                    <SortButtons
                        onSortByName={() => setSortConfig({ type: 'name', asc: !sortConfig.asc })}
                        onSortByScore={() => setSortConfig({ type: 'score', asc: !sortConfig.asc })}
                        isSortedByNameAsc={sortConfig.type === 'name' && sortConfig.asc}
                        isSortedByScoreAsc={sortConfig.type === 'score' && sortConfig.asc}
                        aria-label="Sort destinations by name or score"
                    />
                    <ToggleButton onClick={resetWeatherTypes} aria-label="Show all destinations">Show All</ToggleButton>
                </div>
            </div>

            <div className="destinations" role="main">
                {sortedDestinations.length === 0 ? (
                    <div className="no-destinations" role="alert" aria-live="polite">
                        <p>No destinations match your selected filters. It seems you're chasing the sun a bit too hard, or click Show All!</p>
                            <NavLink id="link-home" to="/" element={<Home />} aria-label="Return to filtering options">
                               Return to Filtering
                            </NavLink>
                    </div>
                ) : (
                    sortedDestinations.map(({ city, data, score }) => (
                        <DestinationCard
                            key={city}
                            city={city}
                            data={data}
                            score={score}
                            aria-label={`Destination: ${city}, Score: ${score}`}
                        />
                    ))
                )}
            </div>
        </>
    )
}