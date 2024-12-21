import {useState, useEffect, createContext} from 'react'
import { destinations } from '../Destinations/DestinationsData'

const WeatherDataContext = createContext()

export default function FetchWeatherData({ children }) {

    const [weatherData, setWeatherData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchWeatherForDestinations = async () => {
            
            try {
                const weatherResults = {}

                for (const destination of destinations) {
                    const { name, lat, lon } = destination

                    const weatherResponse = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Berlin`
                    )
                    const weatherData = await weatherResponse.json()

                    weatherResults[name] = weatherData.daily
                }

                setWeatherData(weatherResults)
            } catch (error) {
                console.error("Error fetching data:", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchWeatherForDestinations()
    }, []) 
 
    return (
        <WeatherDataContext.Provider value={{ weatherData, loading, error }}>
            {children}
        </WeatherDataContext.Provider>
    )

}

export {WeatherDataContext}