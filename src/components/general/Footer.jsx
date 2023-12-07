import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const StyledBottomNavigation = styled(BottomNavigation)({
    backgroundColor: '#333',
    color: 'white',
    '& .Mui-selected': {
        backgroundColor: '#333',
    },
});

function Footer() {
    return (
            <StyledBottomNavigation>
                <BottomNavigationAction
                    label="Instagram"
                    icon={<InstagramIcon sx={{
                        color: "white",
                        '&:hover': {
                            color: 'grey',
                        }
                    }} />}
                    href="https://www.instagram.com/"
                    target="_blank"
                />
                <BottomNavigationAction
                    label="Facebook"
                    icon={<FacebookIcon sx={{
                        color: "white",
                        '&:hover': {
                            color: 'grey',
                        }
                    }} />}
                    href="https://www.facebook.com/"
                    target="_blank"
                />
                <BottomNavigationAction
                    label="Twitter"
                    icon={<TwitterIcon sx={{
                        color: "white",
                        '&:hover': {
                            color: 'grey',
                        }
                    }} />}
                    href="https://twitter.com/"
                    target="_blank"
                />
            </StyledBottomNavigation>
    );
}

export default Footer;
