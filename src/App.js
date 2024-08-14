import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlavorList from './components/FlavorList';
import FlavorDetail from './components/FlavorDetail';
import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage'; 

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Router>
            <NavBar onSearch={setSearchQuery} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/flavors/:id" element={<FlavorDetail />} />
                <Route path="/flavors" element={<FlavorList searchQuery={searchQuery} />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/" element={<FlavorList searchQuery={searchQuery} />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;

