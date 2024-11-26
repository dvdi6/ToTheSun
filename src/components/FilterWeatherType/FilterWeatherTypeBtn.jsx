import "./FilterWeatherType.css"

export default function FilterWeatherTypeBtn({ options, onChange }) {
    return (
        <div className="weather-options">
            {options.map((option) => (
                <label id="weather-values"key={option.value}>
                    <input
                        id="checkbox-input"
                        type="checkbox"
                        name="weather"
                        value={option.value}
                        onChange={(e) => onChange(e.target.value, e.target.checked)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}