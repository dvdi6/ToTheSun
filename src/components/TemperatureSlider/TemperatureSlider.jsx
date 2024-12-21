import { useState } from 'react'
import './TemperatureSlider.css'

export default function TemperatureSlider({ min = 10, max = 30, step = 1, initialValue = 20, onChange }) {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event) => {
        const newValue = event.target.value
        setValue(newValue)
        if (onChange) {
            onChange(newValue) 
        }
    }

    return (
        <div className="temperature-slider">
            <input
                type="range"
                id="temperature-slider"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="slider"
                aria-label="Adjust temperature preference"
            />
            <span>Select Temperature: {value}°C</span>
        </div>
    )
}