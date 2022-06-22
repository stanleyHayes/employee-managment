import {createTheme} from "@mui/material";

const lightTheme = createTheme({
    typography: {
        fontFamily: 'EuclidCircularA, EuclidCircularB, Work Sans, Raleway, Poppins'
    },
    palette: {
        primary: {
            main: '#1a536b'
        },
        secondary: {
            main: '#f76653'
        },
        text: {
            primary: '#1a536b',
            secondary: '#b0b7c9',
            accent: '#f76653',
            title: '#384054'
        },
        background: {
            default: '#d9f0f5',
            paper: '#ffffff'
        },
        light: {
            secondary: 'rgba(247,102,83,0.3)'
        },
        mode: "light"
    },
    shape: {
        borderRadius: 8
    }
});

const darkTheme = createTheme({
    typography: {
        fontFamily: 'EuclidCircularA, EuclidCircularB, Work Sans, Raleway, Poppins'
    },
    palette: {
        primary: {
            main: '#1a536b'
        },
        secondary: {
            main: '#f76653'
        },
        text: {
            primary: '#cfd1d6',
            secondary: '#717488',
            accent: '#f76653',
            title: '#dcdce0'
        },
        background: {
            default: '#212335',
            paper: '#27273f'
        },
        light: {
            secondary: 'rgba(247,102,83,0.3)'
        },
        mode: 'dark'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {lightTheme, darkTheme};