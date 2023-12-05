import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useLocation, useNavigate} from "react-router-dom";
import dayjs from 'dayjs';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

export const SearchForm = ({onSearch}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to convert string to date object or null
    const stringToDate = (dateString) => {
        return dateString ? dayjs(dateString).toDate() : null;
    };

    const clearField = (setter) => {
        setter('');
    };

    const handleNumericChange = (event, setter) => {
        const value = event.target.value;
        if (value >= 0) {
            setter(value);
        }
    };

    // Function to read URL query parameters
    const getQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        return {
            type: searchParams.get('type') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            minBedrooms: searchParams.get('minBedrooms') || '',
            maxBedrooms: searchParams.get('maxBedrooms') || '',
            dateAdded: stringToDate(searchParams.get('dateAdded')),
            dateAddedEnd: stringToDate(searchParams.get('dateAddedEnd')),
            postcodeArea: searchParams.get('postcodeArea') || ''
        };
    };

    // States
    const queryParams = getQueryParams();
    const [type, setType] = useState(queryParams.type);
    const [minPrice, setMinPrice] = useState(queryParams.minPrice);
    const [maxPrice, setMaxPrice] = useState(queryParams.maxPrice);
    const [minBedrooms, setMinBedrooms] = useState(queryParams.minBedrooms);
    const [maxBedrooms, setMaxBedrooms] = useState(queryParams.maxBedrooms);
    const [dateAdded, setDateAdded] = useState(queryParams.dateAdded);
    const [dateAddedEnd, setDateAddedEnd] = useState(queryParams.dateAddedEnd);
    const [postcodeArea, setPostcodeArea] = useState(queryParams.postcodeArea);

    const handleSubmit = (event) => {
        event.preventDefault();
        const criteria = {
            type,
            minPrice,
            maxPrice,
            minBedrooms,
            maxBedrooms,
            dateAdded: dateAdded ? dayjs(dateAdded).format() : '',
            dateAddedEnd: dateAddedEnd ? dayjs(dateAddedEnd).format() : '',
            postcodeArea
        };
        onSearch(criteria);

        // Update URL with new query parameters
        const searchParams = new URLSearchParams(criteria).toString();
        navigate(`/?${searchParams}`);
    };

    const numberInputStyle = {
        'MozAppearance': 'textfield',
        '&::-webkit-outer-spin-button': {'-webkit-appearance': 'none', margin: 0},
        '&::-webkit-inner-spin-button': {'-webkit-appearance': 'none', margin: 0},
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid sx={{margin: "1em"}} container>
                <Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">General</Typography>
                    </Grid>
                    <Grid>
                        <TextField
                            label="Property Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            margin="normal"
                            sx={numberInputStyle}
                            autoComplete="off"
                            variant="outlined"
                        />
                        <TextField
                            label="Postcode Area"
                            autoComplete="off"
                            value={postcodeArea}
                            onChange={(e) => setPostcodeArea(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            label="Min Price"
                            type="number"
                            sx={numberInputStyle}
                            value={minPrice}
                            onChange={(e) => handleNumericChange(e, setMinPrice)}
                            margin="normal"
                            variant="outlined"
                            autoComplete="off"
                            InputProps={{
                                endAdornment: minPrice && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => clearField(setMinPrice)}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Max Price"
                            type="number"
                            autoComplete="off"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">Bedrooms</Typography>
                        </Grid>
                        <br/>
                        <TextField
                            label="Min Bedrooms"
                            type="number"
                            autoComplete="off"
                            value={minBedrooms}
                            onChange={(e) => setMinBedrooms(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Max Bedrooms"
                            type="number"
                            autoComplete="off"
                            value={maxBedrooms}
                            onChange={(e) => setMaxBedrooms(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Other</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date Added (From)"
                                sx={{margin: "0.5em"}}
                                value={dateAdded}
                                onChange={setDateAdded}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DatePicker
                                label="Date Added (To)"
                                sx={{margin: "0.5em"}}
                                value={dateAddedEnd}
                                onChange={setDateAddedEnd}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Button sx={{marginTop: "20px"}} type="submit" variant="contained" color="primary">
                    Search
                </Button>

            </Grid>
        </form>
    );
};
