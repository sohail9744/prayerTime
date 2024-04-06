import React, { Fragment, useState } from 'react'
import { Box, Button, Divider, Snackbar, Stack, TextField, Toolbar, Typography, IconButton, Alert } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CloseIcon from '@mui/icons-material/Close';
import AlertBox from '../components/alertBox';

function CustomTime() {
    // onHandleDetails = () => {
    //     console.log(hehe);
    // }
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );
    return (
        <Box component='main'>
            <AlertBox text="If your internet is connect to your TV the data will reflect in 15 minutes." iconText="info"/>
            <Typography variant='h5'>
                Azaan Timings
            </Typography>
            <Divider sx={{ py: 1 }} />
            <Box component='form' display='flex' flexWrap='wrap' gap={4} pt={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Fazr Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Zohr Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Asr Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Magrib Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Isha Time" />
                </LocalizationProvider>
            </Box>
            <Toolbar />
            <Typography variant='h5'>
                Prayer Timings
            </Typography>
            <Divider sx={{ py: 1 }} />
            <Box component='form' display='flex' flexWrap='wrap' gap={4} pt={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Fazr Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Zohr Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Asr Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Magrib Time" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Isha Time" />
                </LocalizationProvider>
            </Box>
            <Box pt={3} alignItems='center' display='flex' justifyContent='center'>
                <Button onClick={handleClick} variant="contained">Save</Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Saved Successfully"
                    action={action}
                    TransitionComponent='SlideTransition'
                />
            </Box>
        </Box>
    )
}

export default CustomTime