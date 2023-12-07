import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from "./components/PropertyDetail.jsx";
import Navbar from "./components/general/Navbar.jsx";
import {ThemeProvider} from "@mui/material";
import BasicTheme from "./styles/themes/BasicTheme.js";
import {useEffect, useState} from "react";
import Footer from "./components/general/Footer.jsx";
import styled from "styled-components";

const AppWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
});

const Content = styled('div')({
    flex: 1,
});

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
        <AppWrapper>
            <ThemeProvider theme={BasicTheme}>
                <Router>
                    <Navbar favourites={favourites} toggleFavorite={toggleFavorite}/>
                    <Content>
                        <Routes>
                            <Route exact path="/"
                                   element={<Home favourites={favourites} toggleFavorite={toggleFavorite}/>}/>
                            <Route path="/property/:propertyId" element={<PropertyDetail/>}/>
                        </Routes>
                    </Content>
                    <Footer/>
                </Router>
            </ThemeProvider>
        </AppWrapper>
    );
};
