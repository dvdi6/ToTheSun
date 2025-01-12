import { useContext, useState } from 'react'
import { WeatherDataContext } from '../Data/FetchWeatherData.jsx'
import './Destinations.css'
import { AppContext } from '../Data/AppContext.jsx'
import SortButtons from '../Buttons/SortButtons.jsx'
import { NavLink } from 'react-router-dom'
import ToggleButton from '../Buttons/ToggleButton.jsx'
import DestinationList from './DestinationList.jsx'

export default function Destinations() {

    const { error } = useContext(WeatherDataContext)
    const [sortConfig, setSortConfig] = useState({ type: 'name', asc: true })
    const { resetWeatherTypes } = useContext(AppContext)

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
            <DestinationList sortConfig={sortConfig} />
        </>
    )
}