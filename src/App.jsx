import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetail from "./components/PropertyDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import {ThemeProvider} from "@mui/material";
import BasicTheme from "./components/BasicTheme.js";

export const App = () => {
    return (
        <ThemeProvider theme={BasicTheme}>
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/property/:propertyId" element={<PropertyDetail />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
};
