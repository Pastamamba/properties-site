import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import './Navbar.css';
import IconButton from "@mui/material/IconButton";
import {MenuItem, Menu} from "@mui/material";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProperties = async () => {
            const propertiesData = await import('../properties/properties.json');
            setProperties(propertiesData.properties);
        };

        loadProperties();
    }, []);

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem('favourites')) || [];
        const favorites = properties.filter(property => favoriteIds.includes(property.id));
        setFavoriteProperties(favorites);
    }, [properties]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToProperty = (id) => {
        handleClose();
        navigate(`/property/${id}`);
    };

    const removeFromFavorites = (id) => {
        const updatedFavoriteIds = favoriteProperties.filter(property => property.id !== id).map(property => property.id);
        localStorage.setItem('favourites', JSON.stringify(updatedFavoriteIds));
        setFavoriteProperties(favoriteProperties.filter(property => property.id !== id));
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img alt={"logo-image"} src={"/PropertyLogo.PNG"} className={'logo'}/>
                </Link>
            </div>
            <div className="navbar-favourites">
                <IconButton onClick={handleClick} size="large" color="inherit">
                    Favourites
                    <StarIcon/>
                </IconButton>
                <Menu
                    id="favorite-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {favoriteProperties.length > 0 ? (
                        favoriteProperties.map((property) => (
                            <MenuItem key={property.id} onClick={() => navigateToProperty(property.id)}>
                                <div className="favorite-item-content">
                                    <img src={property.picture} alt={property.type} className="favorite-image"/>
                                    <div className="favorite-info">
                                        {property.type} - {property.location}
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromFavorites(property.id);
                                        }}>
                                            <StarIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem>
                            No added favourites
                        </MenuItem>
                    )}
                </Menu>
            </div>
        </nav>
    );
};

export default Navbar;
