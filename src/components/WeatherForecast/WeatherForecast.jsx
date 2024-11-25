import { weatherCodeDescriptions  } from "../Data/WeatherCodeDescription"


export default function WeatherForecast({ data }) {

    return (
        <div className="day-forecast">
            {data.time.map((date, index) => {
                const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
                const maxTemp = Math.round(data.temperature_2m_max[index])
                const minTemp = Math.round(data.temperature_2m_min[index])
                const code = data.weathercode[index]
                const description = weatherCodeDescriptions[code] || "Unknown"

                return (
                    <div key={index} className="forecast-day">
                        <p className="dayname">{dayName}</p>
                        <p className="conditions">{description}</p>
                        <p className="temperature">{minTemp}°/{maxTemp}°</p>
                    </div>
                );
            })}
        </div>
    );
};

