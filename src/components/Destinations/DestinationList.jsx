import DestinationCard from "./DestinationCard"
import { NavLink } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { WeatherDataContext } from "../Data/FetchWeatherData"
import { AppContext } from "../Data/AppContext"
import { useEffect, useState, useMemo, useContext } from "react"
import { weatherCodeDescriptions } from "../Data/WeatherCodeDescription"
import calculateWeatherScore from "../Data/calculateWeatherScore"

export default function DestinationList({sortConfig}) {

    const { loading, weatherData } = useContext(WeatherDataContext)
    const { selectedWeatherTypes, temperature } = useContext(AppContext)
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
        <div className="destinations">
                {isLoading ? (
                    <div className="loading-container">
                        <p className='error'>Loading...</p><ClipLoader />
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
    )
}