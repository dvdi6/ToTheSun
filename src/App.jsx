import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home/Home'
import Layout from './components/Layout'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Destinations from './components/Destinations/Destinations.jsx'
import FetchWeatherData from './components/Data/FetchWeatherData.jsx'
import { AppProvider } from './components/Data/AppContext.jsx'

export default function App() {
  return (
      <Router>
        <AppProvider>
                    <FetchWeatherData> 
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="destinations" element={<Destinations />} />
                                <Route path="about" element={<About />} />
                                <Route path="contact" element={<Contact />} />
                            </Route>
                        </Routes>
                    </FetchWeatherData>
        </AppProvider>
      </Router>
  )
}