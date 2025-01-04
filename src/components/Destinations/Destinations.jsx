import { useContext, useState, useEffect, useMemo } from 'react'
import { WeatherDataContext } from '../Data/FetchWeatherData.jsx'
import { weatherCodeDescriptions } from '../Data/WeatherCodeDescription.js'
import './Destinations.css'
import { AppContext } from '../Data/AppContext.jsx'
import SortButtons from '../Buttons/SortButtons.jsx'
import DestinationCard from './DestinationCard.jsx'
import calculateWeatherScore from '../Data/calculateWeatherScore.js'
import { NavLink } from 'react-router-dom'
import ToggleButton from '../Buttons/ToggleButton.jsx'
import { ClipLoader } from 'react-spinners'

export default function Destinations() {
    const { loading, weatherData, error } = useContext(WeatherDataContext)
    const { selectedWeatherTypes, temperature, resetWeatherTypes } = useContext(AppContext)
    const [sortConfig, setSortConfig] = useState({ type: 'name', asc: true })
    const [localLoading, setLocalLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLocalLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const isLoading = loading || localLoading

    const destinationsWithScore = useMemo(() => {
        return Object.entries(weatherData).map(([city, data]) => {
            const score = calculateWeatherScore(data)
            return { city, data, score }
        })
    }, [weatherData])

    const filteredDestinations = useMemo(() => {
        return destinationsWithScore.filter(({ data }) => {
            const matchesWeather = selectedWeatherTypes.length === 0 || 
                data.weathercode.some(code => selectedWeatherTypes.includes(weatherCodeDescriptions[code]))
            const matchesTemperature = data.temperature_2m_max.some(temp => temp >= temperature)
            return matchesWeather && matchesTemperature
        })
    }, [destinationsWithScore, selectedWeatherTypes, temperature])

    const sortedDestinations = useMemo(() => {
        const sorted = [...filteredDestinations]
        sorted.sort((a, b) => {
            if (sortConfig.type === 'name') {
                return sortConfig.asc ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city)
            }
            return sortConfig.asc ? a.score - b.score : b.score - a.score
        })
        return sorted
    }, [filteredDestinations, sortConfig])

    return (
        <>
            <div className="container-header-link">
                {error && (
                    <p className="error">
                        Error with data. Try again later or report via 
                        <NavLink to="/contact">Form</NavLink>
                    </p>
                )}
                <NavLink to="/" id="link-home" aria-label="Go to Home">Home</NavLink>
                <h1 className="header-destinations">7-Day Forecast Destinations</h1>
                <div className="buttons-destinations">
                <SortButtons
                    onSortByName={() => setSortConfig({ type: 'name', asc: sortConfig.type === 'name' ? !sortConfig.asc : true })}
                    onSortByScore={() => setSortConfig({ type: 'score', asc: sortConfig.type === 'score' ? !sortConfig.asc : true })}
                    isSortedByNameAsc={sortConfig.type === 'name' && sortConfig.asc}
                    isSortedByScoreAsc={sortConfig.type === 'score' && sortConfig.asc}
                        />
                    <ToggleButton onClick={resetWeatherTypes}>Show All</ToggleButton>
                </div>
            </div>

            <div className="destinations">
                {isLoading ? (
                    <div className="loading-container">
                        <ClipLoader />
                    </div>
                ) : sortedDestinations.length === 0 ? (
                    <div className="no-destinations">
                        <p>No destinations match your filters</p>
                        <NavLink to="/" id="link-home">Return to Filtering</NavLink>
                    </div>
                ) : (
                    sortedDestinations.map(({ city, data, score }) => (
                        <DestinationCard key={city} city={city} data={data} score={score} />
                    ))
                )}
            </div>
        </>
    )
}