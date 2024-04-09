import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import Location from '../components/location';

function Config() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleLocationSelect = (locationDetails) => {
    setSelectedLocation(locationDetails);
  };
  return (
    <Box component='main'>
      <Typography variant='h5'>
        Set your Manual Location
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box component='div' display='flex' flexWrap='wrap'>
        <Location onSelect={handleLocationSelect} />
        {selectedLocation && (
          <div>
            <p>Selected Place: {selectedLocation.placeName}</p>
            <p>Latitude: {selectedLocation.latitude}</p>
            <p>Longitude: {selectedLocation.longitude}</p>
          </div>
        )}
      </Box>
      <Box paddingTop='25px' display='flex' alignItems='center' justifyContent='center'>
        <Button variant='contained'>Save</Button>
      </Box>
    </Box>
  )
}

export default Config