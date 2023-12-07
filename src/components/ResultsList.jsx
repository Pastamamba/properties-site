import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    Avatar,
    ListItemAvatar,
    Grid,
    useMediaQuery
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ResultsList = ({ properties, favourites, toggleFavorite }) => {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const handleListItemClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <List component="nav" aria-label="search results">
            {properties.map((property) => (
                <React.Fragment key={property.id}>
                    <ListItem button onClick={() => handleListItemClick(property.id)}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Image of ${property.type}`}
                                        src={property.imgs[0]}
                                        variant="square"
                                        style={{ width: '70%', height: 'auto' }}
                                    />
                                </ListItemAvatar>
                            </Grid>
                            <Grid item xs={10} sm={8}>
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
                                            { !isSmallScreen && <>— {property.description}<br /></>}
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid item xs={2} sm={1} style={{ textAlign: 'right' }}>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(property.id);
                                }}>
                                    {favourites.includes(property.id) ? <StarIcon /> : <StarOutlineIcon />}
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
