import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

const GOOGLE_MAPS_API_KEY = "AIzaSyD3QQH8b4zZn4CFuhxuZyksdwRRZVbOtWQ";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
const geocoderService = { current: null };

export default function Location({ onSelect, selectedLocation }) {
  console.log("selcted location default", selectedLocation);
  const [value, setValue] = React.useState(selectedLocation || null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        setLoading(true);
        autocompleteService.current.getPlacePredictions(request, (results) => {
          setLoading(false);
          callback(results);
        });
      }, 400),
    []
  );

  const getPlaceDetails = (placeId) => {
    if (!geocoderService.current && window.google) {
      geocoderService.current = new window.google.maps.Geocoder();
    }
    if (!geocoderService.current) {
      return;
    }

    geocoderService.current.geocode({ placeId: placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const placeName = results[0].formatted_address;
        // console.log("Place Name:", placeName);
        // console.log("Latitude:", location.lat());
        // console.log("Longitude:", location.lng());

        // Call onSelect callback with selected location details
        onSelect({
          placeName: placeName,
          latitude: location.lat(),
          longitude: location.lng(),
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const getOptionLabel = (option) => {
    if (option?.description) {
      return option.description;
    } else {
      return (option.description = selectedLocation?.placeName);
    }
  };
  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) => getOptionLabel(option)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (newValue) {
          getPlaceDetails(newValue.place_id);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add a location"
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
        debugger
        const matches =
          option?.structured_formatting?.main_text_matched_substrings || [];

        const parts = parse(
          option?.structured_formatting?.main_text,
          matches.map((match) => [match?.offset, match?.offset + match?.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
