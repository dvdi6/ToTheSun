import { weatherCodeDescriptions  } from "../Data/WeatherCodeDescription"


export default function WeatherForecast({ data }) {

    function getDayWithSuffix(day) {
        if (day === 1 || day === 21 || day === 31) return `${day}st`;
        if (day === 2 || day === 22) return `${day}nd`;
        if (day === 3 || day === 23) return `${day}rd`;
        return `${day}th`;
      }

    return (
        <div className="week-forecast">
            {data.time.map((date, index) => {
                const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
                const dayNumber = new Date(date).getDate()
                const dayWithSuffix = getDayWithSuffix(dayNumber)
                const maxTemp = Math.round(data.temperature_2m_max[index])
                const minTemp = Math.round(data.temperature_2m_min[index])
                const code = data.weathercode[index]
                const description = weatherCodeDescriptions[code] || "Unknown"

                return (
                    <div key={index} className="day-forecast">
                        <p className="dayname">{dayName} {dayWithSuffix}</p>
                        <p className="conditions">{description}</p>
                        <p className="temperature">{minTemp}°/{maxTemp}°</p>
                    </div>
                );
            })}
        </div>
    );
};

