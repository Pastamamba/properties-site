import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from "./components/PropertyDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import {ThemeProvider} from "@mui/material";
import BasicTheme from "./components/BasicTheme.js";
import {useEffect, useState} from "react";

export const App = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(storedFavorites);
    }, []);

    const toggleFavorite = (propertyId) => {
        let updatedFavorites;
        if (favourites.includes(propertyId)) {
            updatedFavorites = favourites.filter(id => id !== propertyId);
        } else {
            updatedFavorites = [...favourites, propertyId];
        }
        setFavourites(updatedFavorites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
    };

    return (
        <ThemeProvider theme={BasicTheme}>
        <Router>
            <Navbar favourites={favourites} toggleFavorite={toggleFavorite} />
            <Routes>
                <Route exact path="/" element={<Home favourites={favourites} toggleFavorite={toggleFavorite} />} />
                <Route path="/property/:propertyId" element={<PropertyDetail />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
};
