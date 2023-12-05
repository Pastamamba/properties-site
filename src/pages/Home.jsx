import {useState, useEffect, useCallback} from 'react';
import {SearchForm} from "../components/SearchForm.jsx";
import ResultsList from "../components/ResultsList.jsx";
import Typography from "@mui/material/Typography";

const Home = ({favourites, toggleFavorite}) => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const convertDateToMillis = (dateObj) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNumber = monthNames.indexOf(dateObj.month) + 1;
        const dateString = `${dateObj.year}-${String(monthNumber).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
        return new Date(dateString).getTime();
    };

    useEffect(() => {
        const loadProperties = async () => {
            const propertiesData = await import('../properties/properties.json');
            const convertedProperties = propertiesData.properties.map(property => ({
                ...property,
                addedMillis: convertDateToMillis(property.added),
            }));
            setProperties(convertedProperties);
        };

        loadProperties();
    }, []);

    const handleSearch = useCallback((criteria) => {
        // Convert search criteria dates to milliseconds
        const dateAddedStartMillis = criteria.dateAdded ? new Date(criteria.dateAdded).getTime() : null;
        const dateAddedEndMillis = criteria.dateAddedEnd ? new Date(criteria.dateAddedEnd).getTime() : null;

        const results = properties.filter((property) => {
            // Check if the property matches the type criteria
            const typeMatch = criteria.type ? property.type.toLowerCase() === criteria.type.toLowerCase() : true;

            // Check if the property matches the price criteria
            const priceMatch =
                (criteria.minPrice ? property.price >= Number(criteria.minPrice) : true) &&
                (criteria.maxPrice ? property.price <= Number(criteria.maxPrice) : true);

            // Check if the property matches the bedroom criteria
            const bedroomsMatch =
                (criteria.minBedrooms ? property.bedrooms >= Number(criteria.minBedrooms) : true) &&
                (criteria.maxBedrooms ? property.bedrooms <= Number(criteria.maxBedrooms) : true);

            // Check if the property matches the postcode area criteria
            const postcodeAreaMatch = criteria.postcodeArea ? property.postcodeArea === criteria.postcodeArea : true;

            // Date comparison logic
            let dateMatch = true;
            if (dateAddedStartMillis && dateAddedEndMillis) {
                dateMatch = property.addedMillis >= dateAddedStartMillis && property.addedMillis <= dateAddedEndMillis;
            } else if (dateAddedStartMillis) {
                dateMatch = property.addedMillis >= dateAddedStartMillis;
            } else if (dateAddedEndMillis) {
                dateMatch = property.addedMillis <= dateAddedEndMillis;
            }

            // Return true if all criteria match, false otherwise
            return typeMatch && priceMatch && bedroomsMatch && postcodeAreaMatch && dateMatch;
        });

        setFilteredProperties(results);
        setShowResults(true);
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const criteria = {
            type: searchParams.get('type') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            minBedrooms: searchParams.get('minBedrooms') || '',
            maxBedrooms: searchParams.get('maxBedrooms') || '',
            dateAdded: searchParams.get('dateAdded') || null,
            dateAddedEnd: searchParams.get('dateAddedEnd') || null,
            postcodeArea: searchParams.get('postcodeArea') || ''
        };

        if(Array.from(searchParams.keys()).length > 0) {
            handleSearch(criteria);
        } else {
            setShowResults(false);
        }
    }, [handleSearch]);

    return (
        <>
            <SearchForm onSearch={handleSearch} />
            {showResults && (
                <>
                    <Typography variant="h6" style={{ margin: '20px 0' }}>
                        Search Results: {filteredProperties.length}
                    </Typography>
                    <ResultsList properties={filteredProperties} favourites={favourites} toggleFavorite={toggleFavorite} />
                </>
            )}
        </>
    );
};

export default Home;
