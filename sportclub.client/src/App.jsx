import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Plans from './components/Plans';
import Schedule from './components/Schedule';
import Coaches from './components/Coaches';

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Plans />
            <Schedule />
            <Coaches />
            <Footer />
        </div>
    );
}

export default App;
