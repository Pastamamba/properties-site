import { createTheme } from '@mui/material/styles';

const BasicTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#ff1744',
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: [
            '"Roboto"',
            '"Helvetica"',
            'Arial',
            'sans-serif'
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default BasicTheme;
