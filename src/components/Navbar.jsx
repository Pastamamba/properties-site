import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import './navbar.css';
import IconButton from "@mui/material/IconButton";
import {MenuItem, Menu} from "@mui/material";

const Navbar = ({ favourites, toggleFavorite }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProperties = async () => {
            const propertiesData = await import('../properties/properties.json');
            const filteredProperties = propertiesData.properties.filter(property => favourites.includes(property.id));
            setFavoriteProperties(filteredProperties);
        };

        loadProperties();
    }, [favourites]);

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

    const handleToggleFavorite = (propertyId, event) => {
        event.stopPropagation();
        toggleFavorite(propertyId);
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
                        favoriteProperties.map(property => (
                            <MenuItem key={property.id} onClick={() => navigateToProperty(property.id)}>
                                <div className="favorite-item-content">
                                    <img src={property.picture} alt={property.type} className="favorite-image"/>
                                    <div className="favorite-info">
                                        {property.type} - {property.location}
                                        <IconButton onClick={(e) => handleToggleFavorite(property.id, e)}>
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
