import { Box, CircularProgress } from "@mui/material"

export const MyLoader = () => {
    return (
        <Box sx={{display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'}}><CircularProgress /></Box>
    )
}