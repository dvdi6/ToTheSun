import { useContext, useState, useMemo } from 'react'
import { WeatherDataContext } from '../Data/FetchWeatherData.jsx'
import './Destinations.css'
import { AppContext } from '../Data/AppContext.jsx'
import SortButtons from '../SortButtons/SortButtons.jsx'
import DestinationCard from './DestinationCard.jsx'
import calculateWeatherScore from '../Data/calculateWeatherScore.js'
import { NavLink } from 'react-router-dom'
import Home from '../../components/Home/Home'
import ToggleButton from '../ToggleButton/ToggleButton.jsx'

export default function Destinations() {
    const { loading, weatherData } = useContext(WeatherDataContext)
    const { selectedWeatherTypes, temperature, resetWeatherTypes } = useContext(AppContext)
    const [sortConfig, setSortConfig] = useState({ type: 'name', asc: true })

    const destinationsWithScore = useMemo(() => {
        return Object.entries(weatherData).map(([city, data]) => {
            const score = calculateWeatherScore(data)
            return { city, data, score }
        })
    }, [weatherData])

    const handleSortByName = () => {
        setSortConfig(prevConfig => ({
            type: 'name',
            asc: prevConfig.type === 'name' ? !prevConfig.asc : true
        }))
    }

    const handleSortByScore = () => {
        setSortConfig(prevConfig => ({
            type: 'score',
            asc: prevConfig.type === 'score' ? !prevConfig.asc : true
        }))
    }

    const getSortedDestinations = (destinationsWithScore, sortConfig) => {
        const sortedArray = [...destinationsWithScore]
        return sortedArray.sort((a, b) => {
            if (sortConfig.type === 'name') {
                return sortConfig.asc
                    ? a.city.localeCompare(b.city)
                    : b.city.localeCompare(a.city)
            } else {
                return sortConfig.asc ? a.score - b.score : b.score - a.score
            }
        })
    }

    const sortedDestinations = useMemo(
        () => getSortedDestinations(destinationsWithScore, sortConfig),
        [destinationsWithScore, sortConfig]
    )

    if (loading) return <p className="loading">Loading weather data...</p>

    return (
        <>
            <div className="container-header-link">
                <NavLink id="link-home" to="/" element={<Home />}>
                    Back to home
                </NavLink>
                <h1 className="header-destinations">7-Day Weather Forecast for Destinations</h1>
                <SortButtons
                onSortByName={handleSortByName}
                onSortByScore={handleSortByScore}
                isSortedByNameAsc={sortConfig.type === 'name' && sortConfig.asc}
                isSortedByScoreAsc={sortConfig.type === 'score' && sortConfig.asc}
                />
                <ToggleButton onClick={resetWeatherTypes}>Show All</ToggleButton>
            </div>
            <div className="destinations">
                {sortedDestinations.map(({ city, data, score }) => (
                    <DestinationCard
                        key={city}
                        city={city}
                        data={data}
                        score={score}
                        selectedWeatherTypes={selectedWeatherTypes} 
                        temperature={temperature}
                    />
                ))}
            </div>
        </>
    )
}