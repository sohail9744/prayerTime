import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Config() {
  return (
    <Box component='main'>
      <Typography variant='h5'>
        Configuration
      </Typography>
      <Divider sx={{ py: 1 }} />
      <Box component='div' display='flex' flexWrap='wrap'>
        <Autocomplete
          disablePortal
          options={countryNames}
          sx={{ width: 300 , pt: 3}}
          renderInput={(params) => <TextField {...params} label="Select Location" placeholder='USA' />}
          noOptionsText="No location"
        />
      </Box>
      <Box paddingTop='25px' display='flex' alignItems='center' justifyContent='center'>
        <Button variant='contained'>Save</Button>
      </Box>
    </Box>
  )
}

export default Config

const countryNames = [
  { label: 'Afghanistan' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bhutan' },
  { label: 'Bolivia' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Brazil' },
  { label: 'Brunei' },
  { label: 'Bulgaria' },
  { label: 'Burkina Faso' },
  { label: 'Burundi' },
  { label: 'Cabo Verde' },
  { label: 'Cambodia' },
  { label: 'Cameroon' },
  { label: 'Canada' },
  { label: 'Central African Republic' },
  { label: 'Chad' },
  { label: 'Chile' },
  { label: 'China' },
  { label: 'Colombia' },
  { label: 'Comoros' },
  { label: 'Congo' },
  { label: 'Costa Rica' },
  { label: 'Croatia' },
  { label: 'Cuba' },
  { label: 'Cyprus' },
  { label: 'Czech Republic' },
  { label: 'Democratic Republic of the Congo' },
  { label: 'Denmark' },
  { label: 'Djibouti' },
  { label: 'Dominica' },
  { label: 'Dominican Republic' }
];
