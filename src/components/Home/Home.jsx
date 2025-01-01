import {useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import TemperatureSlider from "../Buttons/TemperatureSlider"
import SearchBtn from "../Buttons/SearchBtn"
import FilterWeatherTypeBtn from "../Buttons/FilterWeatherTypeBtn"
import { AppContext } from "../Data/AppContext"
import bannerImg from "../../assets/Banner.jpg"


export default function Home() {

    const { toggleWeatherType, resetWeatherTypes, temperature, setTemperature } = useContext(AppContext)
    const navigate = useNavigate()

    const weatherOptions = [
        { label: 'Sunny', value: '☀️' },
        { label: 'Mostly Sun', value: '🌤️' },
        { label: 'Partly Cloudy', value: '🌥️' }
    ]

    useEffect(() => {
        resetWeatherTypes()
    }, [resetWeatherTypes])

    const handleTemperatureChange = (temp) => {
        setTemperature(temp)
    }

    const startSearching = () => {
        console.log(temperature)
        navigate("/destinations")
    }

    // window.addEventListener('resize', () => {
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;
    //     console.log(`Width: ${width}, Height: ${height}`);
    // });

    return (
        <main className="center" role="main">
            <div className="home-container">
                <img 
                    src={bannerImg} 
                    alt="A scenic beach with sunshine, inviting you to plan your getaway"
                    role="img" 
                    aria-label="Scenic beach with sunshine" 
                />
                <div className="home-container-content">
                    <h1 
                        className="home-header" 
                        aria-label="To the Sun! Your ultimate travel destination finder"
                    >
                        To the Sun!
                    </h1>
                    <TemperatureSlider 
                        value={temperature} 
                        onChange={handleTemperatureChange} 
                        aria-label={`Adjust the temperature preference. Current value: ${temperature} degrees`} 
                    />
                    <FilterWeatherTypeBtn 
                        options={weatherOptions} 
                        onChange={toggleWeatherType} 
                        aria-label="Filter by weather type"
                    />
                    <SearchBtn 
                        startSearching={startSearching} 
                        aria-label="Start searching for your destination"
                    >
                        Search here!
                    </SearchBtn>
                </div>
            </div>
    
            <div className="home-text" aria-labelledby="home-subheader">
                <p id="home-subheader" className="home-subheader">
                    Discover Your Perfect Last-Minute Getaway!
                </p>
                <p className="home-subheader2">
                    Your tool for finding the best travel destinations with sunny, warm weather during wintertime.
                </p>
            </div>
        </main>
    )
}

