import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider, Typography, Avatar, ListItemAvatar, Grid, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ResultsList = ({ properties }) => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleListItemClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    const toggleFavorite = (propertyId) => {
        let updatedFavorites;
        if (favorites.includes(propertyId)) {
            updatedFavorites = favorites.filter(id => id !== propertyId);
        } else {
            updatedFavorites = [...favorites, propertyId];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
    };

    return (
        <List component="nav" aria-label="search results">
            {properties.map((property) => (
                <React.Fragment key={property.id}>
                    <ListItem button onClick={() => handleListItemClick(property.id)}>
                        <Grid container spacing={2}>
                            {isSmallScreen && (
                                <Grid item xs={12}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Image of ${property.type}`}
                                            src={property.imgs[0]}
                                            variant="square"
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </ListItemAvatar>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={isSmallScreen ? 12 : 8}>
                                <ListItemText
                                    primary={property.type}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {property.location}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {property.price} $
                                            </Typography>
                                            <br />
                                            — {property.description}
                                        </>
                                    }
                                />
                            </Grid>
                            {!isSmallScreen && (
                                <Grid item sm={4}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Image of ${property.type}`}
                                            src={property.imgs[0]}
                                            variant="square"
                                            style={{ width: '200px', height: '100%', padding: "0.5em" }}
                                        />
                                    </ListItemAvatar>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={1}>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(property.id);
                                }}>
                                    {favorites.includes(property.id) ? <StarIcon /> : <StarOutlineIcon />}
                                </div>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default ResultsList;
