import {useState} from 'react'; // Import the 'useState' hook from React
import TextField from '@mui/material/TextField'; // Import a text input field from Material-UI
import Button from '@mui/material/Button'; // Import a button from Material-UI
import InputAdornment from '@mui/material/InputAdornment'; // Import an input adornment from Material-UI
import IconButton from '@mui/material/IconButton'; // Import an icon button from Material-UI
import ClearIcon from '@mui/icons-material/Clear'; // Import the 'Clear' icon from Material-UI
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers'; // Import date-related components from Material-UI X Date Pickers
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'; // Import the Day.js adapter for Material-UI X Date Pickers
import {useLocation, useNavigate} from "react-router-dom"; // Import hooks for handling routing in React
import dayjs from 'dayjs'; // Import the Day.js library for date manipulation
import Typography from "@mui/material/Typography"; // Import a typography component from Material-UI
import {Grid} from "@mui/material"; // Import a grid component from Material-UI

// Define a functional component called 'SearchForm' that takes a 'onSearch' prop
export const SearchForm = ({onSearch}) => {
    const navigate = useNavigate(); // Get the 'navigate' function from React Router
    const location = useLocation(); // Get the current location from React Router

    // Function to clear a field by setting it to an empty string
    const clearField = (setter) => {
        setter('');
    };

    // Function to handle numeric input changes, allowing only non-negative values
    const handleNumericChange = (event, setter) => {
        const value = event.target.value;
        if (value >= 0) {
            setter(value);
        }
    };

    // Function to read URL query parameters and initialize state variables
    const getQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        return {
            type: searchParams.get('type') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            minBedrooms: searchParams.get('minBedrooms') || '',
            maxBedrooms: searchParams.get('maxBedrooms') || '',
            dateAdded: searchParams.get('dateAdded') ? dayjs(searchParams.get('dateAdded')) : null,
            dateAddedEnd: searchParams.get('dateAddedEnd') ? dayjs(searchParams.get('dateAddedEnd')) : null,
            postcodeArea: searchParams.get('postcodeArea') || ''
        };
    };

    // Initialize state variables with values from URL query parameters
    const queryParams = getQueryParams();
    const [type, setType] = useState(queryParams.type);
    const [minPrice, setMinPrice] = useState(queryParams.minPrice);
    const [maxPrice, setMaxPrice] = useState(queryParams.maxPrice);
    const [minBedrooms, setMinBedrooms] = useState(queryParams.minBedrooms);
    const [maxBedrooms, setMaxBedrooms] = useState(queryParams.maxBedrooms);
    const [dateAdded, setDateAdded] = useState(queryParams.dateAdded);
    const [dateAddedEnd, setDateAddedEnd] = useState(queryParams.dateAddedEnd);
    const [postcodeArea, setPostcodeArea] = useState(queryParams.postcodeArea);

    const [isFilterVisible, setIsFilterVisible] = useState(false); // Initialize a state variable for filter visibility

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const criteria = {
            type,
            minPrice,
            maxPrice,
            minBedrooms,
            maxBedrooms,
            dateAdded: dateAdded ? dayjs(dateAdded).format('YYYY-MM-DD') : '',
            dateAddedEnd: dateAddedEnd ? dayjs(dateAddedEnd).format('YYYY-MM-DD') : '',
            postcodeArea
        };
        onSearch(criteria); // Call the 'onSearch' callback with search criteria

        // Update URL with new query parameters
        const searchParams = new URLSearchParams(criteria).toString();
        navigate(`/?${searchParams}`);

        setIsFilterVisible(false); // Hide the filter after submission
    };

    // Style for displaying the filter either centered or not centered
    const divStyle = !isFilterVisible ? {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        display: "flex"
    } : {}

    return (
        <div style={divStyle}>
            {isFilterVisible && ( // Display the filter form when 'isFilterVisible' is true
                <form onSubmit={handleSubmit}>
                    <Grid sx={{margin: "1em"}} container>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">General</Typography>
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            label="Property Type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            margin="normal"
                                            sx={{
                                                width: {md: 200},
                                                "& .MuiInputBase-root": {
                                                    height: 50
                                                },
                                                mr: 1
                                            }}
                                            autoComplete="off"
                                            variant="outlined"
                                        />
                                        <TextField
                                            label="Postcode Area"
                                            autoComplete="off"
                                            value={postcodeArea}
                                            sx={{
                                                width: {md: 200},
                                                "& .MuiInputBase-root": {
                                                    height: 50
                                                },
                                                mr: 1
                                            }}
                                            onChange={(e) => setPostcodeArea(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <TextField
                                        label="Min Price"
                                        type="number"
                                        sx={{
                                            width: {md: 200},
                                            "& .MuiInputBase-root": {
                                                height: 50
                                            },
                                            mr: 1
                                        }}
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
                                        sx={{
                                            width: {md: 200},
                                            "& .MuiInputBase-root": {
                                                height: 50
                                            },
                                            mr: 1
                                        }}
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid item xs={6}>
                                    <Typography variant="h6">Bedrooms</Typography>
                                </Grid>
                                <TextField
                                    label="Min Bedrooms"
                                    type="number"
                                    sx={{
                                        width: {md: 200},
                                        "& .MuiInputBase-root": {
                                            height: 50
                                        },
                                        mr: 1
                                    }}
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
                                    sx={{
                                        width: {md: 200},
                                        "& .MuiInputBase-root": {
                                            height: 50
                                        },
                                        mr: 1
                                    }}
                                    value={maxBedrooms}
                                    onChange={(e) => setMaxBedrooms(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Grid item xs={6}>
                                    <Typography variant="h6">Other</Typography>
                                </Grid>
                                <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date Added (From)"
                                            sx={{
                                                width: {md: 200},
                                                "& .MuiInputBase-root": {
                                                    height: 50
                                                },
                                                mr: 1,
                                                mt: 1,
                                            }}
                                            value={dateAdded || null}
                                            onChange={setDateAdded}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <DatePicker
                                            label="Date Added (To)"
                                            value={dateAddedEnd || null}
                                            onChange={setDateAddedEnd}
                                            sx={{
                                                width: {md: 200},
                                                "& .MuiInputBase-root": {
                                                    height: 50
                                                },
                                                mr: 1,
                                                mt: 1
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Button sx={{marginTop: "20px"}} type="submit" variant="contained" color="primary">
                            Search
                        </Button>

                    </Grid>
                </form>
            )}
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                style={{marginBottom: '10px', marginTop: "10px"}}
            >
                {isFilterVisible ? 'Hide Filter' : 'Filter'}
            </Button>
        </div>
    );
};
