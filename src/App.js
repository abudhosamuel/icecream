import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlavorList from './components/FlavorList';
import FlavorDetail from './components/FlavorDetail';
import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/flavors/:id" element={<FlavorDetail />} />
                <Route path="/flavors" element={<FlavorList />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/" element={<FlavorList />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
