import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { red } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const OSCAPurpleTheme = createTheme({
    typography: {
        "fontFamily": `"Koulen", sans-serif`,
        "fontSize": 24,
        "fontWeightRegular": 400,

       },
    
    palette: {  
      primary: {
        main: '#764ABC',
      },
    },
  }

);


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={OSCAPurpleTheme}>
        <App />
    </ThemeProvider>
)
