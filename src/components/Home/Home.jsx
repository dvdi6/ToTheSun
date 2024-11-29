import {useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import TemperatureSlider from "../TemperatureSlider/TemperatureSlider"
import SearchBtn from "../SearchBtn/SearchBtn"
import FilterWeatherTypeBtn from "../FilterWeatherType/FilterWeatherTypeBtn"
import { AppContext } from "../Data/AppContext"
import bannnerImg from "../../assets/Banner.jpg"

export default function Home() {

    const { selectedWeatherTypes, toggleWeatherType, resetWeatherTypes, temperature, setTemperature } = useContext(AppContext)
    const navigate = useNavigate()

    const weatherOptions = [
        { label: 'Sunny', value: 'Sunny' },
        { label: 'Mostly Sun', value: 'Mostly Sun' },
        { label: 'Partly Cloudy', value: 'Partly Cloudy' }
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

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(`Width: ${width}, Height: ${height}`);
    });

    console.log(selectedWeatherTypes)

    return (
        <div className="center">
            <div className="home-container">
                <img src={bannnerImg} alt="picture of beach" />
            </div>
            <h1 className="home-header">To the Sun!</h1>
            <div className="select-box">
                <TemperatureSlider value={temperature} onChange={handleTemperatureChange} />
                <FilterWeatherTypeBtn options={weatherOptions} onChange={toggleWeatherType} />
            </div>
                <SearchBtn startSearching={startSearching}>Search here!</SearchBtn>
            <div className="home-text">    
                <p className="home-subheader">Discover Your Perfect Last-Minute Getaway!</p>
                <p className="home-subheader2">
                        Your tool for finding the best travel destinations with sunny, warm weather during wintertime.
                 </p>
            </div>
        </div>
    )
}

