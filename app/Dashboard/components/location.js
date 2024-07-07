import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";

export default function LocationSearch({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (input) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json`
      );
      const data = await response.json();
      setLoading(false);
      setOptions(data);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setLoading(false);
      setOptions([]);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 2) {
      fetchCities(newInputValue);
    }
  };

  const handleCitySelect = (event, newValue) => {
    if (newValue) {
      const { lat, lon, display_name } = newValue;
      onSelect({
        placeName: display_name,
        latitude: lat,
        longitude: lon,
      });
    }
  };

  const getOptionLabel = (option) => option.display_name;

  return (
    <Autocomplete
      id="city-search"
      sx={{ width: 300 }}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={null}
      onChange={handleCitySelect}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const parts = parse(option.display_name, []);
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)" }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      fontWeight: part.highlight ? "bold" : "regular",
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
