import { Box, Button, FormControl, Input, InputLabel, Paper, TextField } from '@mui/material'
import React from 'react'

function Support() {
    const onSubmit = () => {
        alert('working')
    }
    return (
        <Box>
            <Paper>
                <Box display='flex' gap={3} flexDirection='column' p={3}>
                    <TextField variant='standard' fullWidth label="Email" id="fullWidth" />
                    <TextField variant='standard' fullWidth label="Subtitle" id="fullWidth" />
                    <TextField
                        label="Feedback"
                        multiline
                        maxRows={6}
                        rows={6}
                    />
                    <Box display='flex' justifyContent='center'>
                        <Button variant='contained' onClick={onSubmit}>Submit</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default Support