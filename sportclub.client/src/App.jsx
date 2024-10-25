import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import News from './components/News';
import './styles/AppContainer.css'

function App() {
    return (
        <div className="App">
            <Header />
            <div className="app-container">
                <Hero />
                <About />
                <Facilities />
                <News />
            </div>
            <Footer />
        </div>
    );
}

export default App;
