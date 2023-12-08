import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

// Create a custom-styled BottomNavigation component with specified styles
const StyledBottomNavigation = styled(BottomNavigation)({
    backgroundColor: '#333', // Set the background color to dark gray
    color: 'white', // Set the text color to white
    '& .Mui-selected': { // Style for selected (active) item
        backgroundColor: '#333', // Maintain the background color as dark gray
    },
});

// Define the Footer component
function Footer() {
    return (
        // Render the custom-styled BottomNavigation component
        <StyledBottomNavigation>
            {/* Instagram social media link */}
            <BottomNavigationAction
                label="Instagram" // Display label "Instagram"
                icon={<InstagramIcon sx={{ // Use Instagram icon
                    color: "white", // Set icon color to white
                    '&:hover': { // Icon style on hover
                        color: 'grey', // Change icon color to grey
                    }
                }} />}
                href="https://www.instagram.com/" // Link to Instagram
                target="_blank" // Open link in a new tab
            />
            {/* Facebook social media link */}
            <BottomNavigationAction
                label="Facebook" // Display label "Facebook"
                icon={<FacebookIcon sx={{ // Use Facebook icon
                    color: "white", // Set icon color to white
                    '&:hover': { // Icon style on hover
                        color: 'grey', // Change icon color to grey
                    }
                }} />}
                href="https://www.facebook.com/" // Link to Facebook
                target="_blank" // Open link in a new tab
            />
            {/* Twitter social media link */}
            <BottomNavigationAction
                label="Twitter" // Display label "Twitter"
                icon={<TwitterIcon sx={{ // Use Twitter icon
                    color: "white", // Set icon color to white
                    '&:hover': { // Icon style on hover
                        color: 'grey', // Change icon color to grey
                    }
                }} />}
                href="https://twitter.com/" // Link to Twitter
                target="_blank" // Open link in a new tab
            />
        </StyledBottomNavigation>
    );
}

export default Footer; // Export the Footer component
