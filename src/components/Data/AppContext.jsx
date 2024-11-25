import { createContext, useState, useCallback } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
   
    const [temperature, setTemperature] = useState(20)
    const [selectedWeatherTypes, setSelectedWeatherTypes] = useState([])

    const toggleWeatherType = (value, isSelected) => {
        setSelectedWeatherTypes((prev) =>
            isSelected ? [...prev, value] : prev.filter((type) => type !== value)
        )
    }

    const resetWeatherTypes = useCallback(() => {
        setSelectedWeatherTypes([])
        setTemperature(0)
    }, [])

    return (
        <AppContext.Provider
            value={{
                temperature,
                setTemperature,
                selectedWeatherTypes,
                toggleWeatherType,
                resetWeatherTypes,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}