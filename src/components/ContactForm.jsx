import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Define initial state outside of the component for clarity and reusability
const initialContactInfo = {
    name: '',
    telephone: '',
    email: '',
    message: '',
};

export const ContactForm = () => {
    // State for managing the contact info
    const [contactInfo, setContactInfo] = useState(initialContactInfo);

    // Handle change in text fields and update state accordingly
    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactInfo(prevState => ({...prevState, [name]: value}));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submit action
        // Here, you would usually send the data to a server or another handler
        console.log(contactInfo);
        // Optionally reset the form to initial state after submission
        setContactInfo(initialContactInfo);
    };

    // Render the contact form
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
                <h2>Contact</h2>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                        boxShadow: 3, // Adds shadow to the form for better UI
                        p: 4,
                        borderRadius: '0.5em', // Rounds the corners of the form
                        backgroundColor: 'background.paper', // Sets the background color
                    }}
                >
                    {/* Name input field */}
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="off" // Disables browser autocomplete
                        autoFocus
                        value={contactInfo.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    {/* Telephone input field */}
                    <TextField
                        required
                        fullWidth
                        id="telephone"
                        label="Telephone"
                        name="telephone"
                        autoComplete="off"
                        value={contactInfo.telephone}
                        onChange={handleChange}
                        margin="normal"
                    />
                    {/* Email input field */}
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="off"
                        value={contactInfo.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    {/* Message textarea field */}
                    <TextField
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        multiline // Makes the TextField a textarea for longer messages
                        rows={4} // Sets the number of rows the textarea initially displays
                        autoComplete="off"
                        value={contactInfo.message}
                        onChange={handleChange}
                        margin="normal"
                    />
                    {/* Submit button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
};
