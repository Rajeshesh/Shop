import {createTheme}from '@mui/material'
import {green,purple}from '@mui/material/colors'

export const theme=createTheme({
    palette:{
        primary:{
            main:green['500'],
            dark:green['900'],
            light:green['50']
        },
        secondary:{
            main:purple['500'],
            dark:purple['900'],
            light:purple['50']
        }
    }
})