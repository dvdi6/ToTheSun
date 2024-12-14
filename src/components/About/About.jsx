import Footer from "../Footer"
import "./About.css"
import { NavLink } from "react-router-dom"
import Home from "../Home/Home"

export default function About() {


    return (
        <>  
            <div className="about-container">
                 <NavLink id="link-home" to="/" element={<Home />}>
                                    Home
                </NavLink>
                <h1>About Info</h1>
                <p>To The Sun is your perfect companion for finding sunny and mild destinations during the colder winter months. Whether you’re planning a quick getaway or a long escape, our app helps you discover the best European destinations with pleasant weather.</p>
                  <h2>What we Offer</h2>  
                    <ul>
                        <li>Weather Insights: We analyze weekly weather forecasts to provide a weather score for each destination, rated from 1 to 10 based on sunshine, temperatures, and overall pleasantness.</li>
                        <li>Personalized Filtering: Customize your search with filters to find the perfect place to match your preferences, from sunny beaches to cozy cities with mild climates.</li>
                        <li>Comprehensive Destinations: Start your journey with 20 curated European locations, handpicked for their unique charm and reliable winter weather.</li>
                    </ul>
                    <h2>How it works</h2>
                    <ul>
                        <li>Search or Filter Destinations: Use our intuitive interface to explore destinations based on your desired weather conditions.</li>
                        <li>Real-Time Weather Data: Powered by the Open Meteo API, our app ensures you get accurate and up-to-date information.</li>
                        <li>Find the Perfect Spot: Compare destinations at a glance and plan your travels with ease.</li>
                    </ul>
                    <h2>Why choose To The Sun?</h2>
                    <p>We know that the winter blues can take a toll, and nothing lifts the spirit like a little sunshine. Our goal is to make your search for the perfect sunny escape as seamless and enjoyable as possible. With reliable data and user-friendly features, To The Sun makes finding the sun effortless.</p>            
            </div>
           
        </>
    )
}

