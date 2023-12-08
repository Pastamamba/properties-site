// React imports for state and effects.
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// Material UI components and icons.
import IconButton from "@mui/material/IconButton";
import {MenuItem, Menu} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';

// Stylesheet import.
import '../../styles/navbar.css';

/**
 * Navbar component for property navigation.
 * @param {Array} favourites - Array containing the favourite property IDs.
 * @param {Function} toggleFavorite - Function to toggle a property as favorite.
 */

const Navbar = ({favourites, toggleFavorite}) => {

    // State variables for menu anchor elements.
    const [anchorElFav, setAnchorElFav] = useState(null);
    const [anchorElProps, setAnchorElProps] = useState(null);

    // State variables for properties and favorite properties lists.
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]);

    // State variables for controlling menu display.
    const [showPropertiesInMenu, setShowPropertiesInMenu] = useState(false);
    const [showFavoritesInMenu, setShowFavoritesInMenu] = useState(false);

    // State variable for controlling the side menu's visibility.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation hook from React Router.
    const navigate = useNavigate();

    // Effect for loading properties and favorites when the component mounts or favorites change.
    useEffect(() => {
        // Async function to load all properties.
        const loadAllProperties = async () => {
            const propertiesData = await import('../../properties/properties.json');
            setAllProperties(propertiesData.properties);
        };

        // Function to load favorite properties based on the 'favourites' prop.
        const loadFavoriteProperties = async () => {
            const propertiesData = await import('../../properties/properties.json');
            const properties = propertiesData.properties;
            const filteredProperties = properties.filter(property => favourites.includes(property.id));
            setFavoriteProperties(filteredProperties);
        };

        loadAllProperties().then(loadFavoriteProperties);
    }, [favourites]);

    // Handlers for opening and closing menus.
    const handleFavoritesClick = (event) => {
        setAnchorElFav(event.currentTarget);
    };

    const handlePropertiesClick = (event) => {
        setAnchorElProps(event.currentTarget);
    };

    const handleCloseFav = () => {
        setAnchorElFav(null);
    };

    const handleCloseProps = () => {
        setAnchorElProps(null);
    };

    // Function to navigate to a specific property.
    const navigateToProperty = (id) => {
        navigate(`/property/${id}`);
        handleCloseProps();
    };

    // Function to handle adding/removing favorites.
    const handleToggleFavorite = (propertyId, event) => {
        event.stopPropagation();
        toggleFavorite(propertyId);
    };

    // Function to toggle the visibility of the responsive side menu.
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            {/* Logo section that navigates to the home page */}
            <div className="navbar-logo">
                <Link to="/">
                    <img alt="Logo" src="/PropertyLogo.PNG" className="logo"/>
                </Link>
            </div>

            <IconButton className="menu-button" onClick={toggleMenu}>
                <span className={'menu-button'}>
                <MenuIcon/>
                    </span>
            </IconButton>
            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
                <KeyboardArrowRightIcon
                    onClick={() => {
                        setIsMenuOpen(false)
                    }}
                    sx={{
                        float: "right",
                        padding: "1em",
                        '&:hover': {
                            color: 'grey',
                            cursor: "pointer"
                        }
                    }}
                />
                <div className={'nav-list-links'}>
                    <Link onClick={() => {
                        setIsMenuOpen(false)
                    }} to="/">Home</Link>
                    <Link onClick={() => {
                        setIsMenuOpen(false)
                    }} to="/contact">Contact</Link>

                    <div style={{
                        display: "block",
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                        color: "black"
                    }} onClick={() => setShowPropertiesInMenu(!showPropertiesInMenu)}>Properties
                    </div>


                    {showPropertiesInMenu && (
                        <div className="menu-properties-list">
                            {allProperties.map(property => (
                                <MenuItem key={property.id} onClick={() => {
                                    navigateToProperty(property.id);
                                    setShowPropertiesInMenu(false);
                                    setIsMenuOpen(false);
                                }}>{property.type} - {property.location}</MenuItem>
                            ))}
                        </div>
                    )}

                    <div style={{
                        display: "block",
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                        color: "black"
                    }} onClick={() => setShowFavoritesInMenu(!showFavoritesInMenu)}>Favorites
                    </div>
                    {showFavoritesInMenu && (
                        <div className="menu-favorites-list">
                            {favoriteProperties.length > 0 ?
                                favoriteProperties.map(property => (
                                    <MenuItem key={property.id} onClick={() => {
                                        navigateToProperty(property.id);
                                        setShowFavoritesInMenu(false);
                                        setIsMenuOpen(false);
                                    }}>{property.type} - {property.location}</MenuItem>
                                ))
                                : <p>No favorites</p>
                            }
                        </div>
                    )}

                </div>
            </div>

            {/* Navigation links, visible on larger screens */}
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <IconButton sx={{
                    color: "white",
                    fontSize: "12px",
                    padding: "10px 10px",
                    '&:hover': {
                        color: 'grey',
                    }
                }} onClick={handlePropertiesClick} color="inherit">
                    Properties
                </IconButton>
                <Menu
                    id="property-menu"
                    anchorEl={anchorElProps}
                    keepMounted
                    open={Boolean(anchorElProps)}
                    onClose={handleCloseProps}
                >
                    {allProperties.map((property) => (
                        <MenuItem key={property.id} onClick={() => navigateToProperty(property.id)}>
                            {property.type} - {property.location}
                        </MenuItem>
                    ))}
                </Menu>

                <IconButton sx={{
                    color: "white",
                    fontSize: "12px",
                    padding: "10px 10px",
                    '&:hover': {
                        color: 'grey',
                    },

                }} onClick={handleFavoritesClick} color="inherit">
                    Favourites
                    <StarIcon sx={{fontSize: "14px"}}/>
                </IconButton>
                <Menu
                    id="favorite-menu"
                    anchorEl={anchorElFav}
                    keepMounted
                    open={Boolean(anchorElFav)}
                    onClose={handleCloseFav}
                >
                    {favoriteProperties.length > 0 ? (
                        favoriteProperties.map(property => (
                            <MenuItem key={property.id} onClick={() => {
                                navigateToProperty(property.id);
                                setAnchorElFav(false)
                            }}>
                                <div className="favorite-item-content">
                                    <img src={property.picture} alt={property.type} className="favorite-image"/>
                                    <div className="favorite-info">
                                        {property.type} - {property.location}
                                        <IconButton onClick={(e) => handleToggleFavorite(property.id, e)}
                                                    color="inherit">
                                            <StarIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem onClick={handleCloseFav}>No added favourites</MenuItem>
                    )}
                </Menu>
            </div>
        </nav>
    );
};

export default Navbar;
