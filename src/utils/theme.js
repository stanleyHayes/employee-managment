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
        }
    },
    shape: {
        borderRadius: 8
    }
})

export const THEMES = {lightTheme};