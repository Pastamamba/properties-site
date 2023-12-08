import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Navbar from "./components/general/Navbar.jsx";
import { ThemeProvider } from "@mui/material";
import BasicTheme from "./styles/themes/BasicTheme.js";
import { useEffect, useState } from "react";
import Footer from "./components/general/Footer.jsx";
import styled from "styled-components";
import { ContactForm } from "./pages/ContactForm.jsx";

// Create a styled component for the top-level container.
const AppWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
});

// Create a styled component for the main content area.
const Content = styled('div')({
    flex: 1,
});

// Define the main App component.
export const App = () => {
    // Define a state variable 'favourites' and a function 'setFavourites' to manage favorites.
    const [favourites, setFavourites] = useState([]);

    // Use the 'useEffect' hook to retrieve favorites from local storage when the component mounts.
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(storedFavorites);
    }, []);

    // Define a function 'toggleFavorite' to add/remove a property from favorites and update local storage.
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

    // Return the JSX for the main application, structured with React Router and Material-UI components.
    return (
        <AppWrapper>
            <ThemeProvider theme={BasicTheme}>
                <Router>
                    <Navbar favourites={favourites} toggleFavorite={toggleFavorite} />
                    <Content>
                        {/* Define the routing for different pages using 'Routes' */}
                        <Routes>
                            <Route exact path="/" element={<Home favourites={favourites} toggleFavorite={toggleFavorite} />} />
                            <Route path="/property/:propertyId" element={<PropertyDetail />} />
                            <Route path="/contact" element={<ContactForm />} />
                        </Routes>
                    </Content>
                    <Footer />
                </Router>
            </ThemeProvider>
        </AppWrapper>
    );
};
