import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail";
import axios from "axios";
import {
  BackButton,
  MainButton,
  useWebApp,
} from "@vkruglikov/react-telegram-web-app";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ClassNames } from "@emotion/react";

const Preference = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lat, lng } = state;
  console.log(lat);
  console.log(lng);

  const [priceRange, setPriceRange] = React.useState<number[]>([1, 2]);
  const [radius, setRadius] = useState(1000);
  const [preferences, setPreferences] = useState({
    vegan: true,
    vegetarian: false,
    halal: false,
    noBeef: true,
    specialDiet: false,
    chinese: true,
    japanese: false,
    korean: false,
    italian: true,
    mexican: false,
    fastFood: false,
    dessert: false,
  });

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle radius slider change
  const handleRadiusChange = (event: any, newValue: any) => {
    setRadius(newValue);
  };

  // Submit handler
  const handleSubmit = () => {
    const formData = {
      preferences,
      radius,
      priceRange,
    };
    console.log("Form Data:", formData);
  };

  const minDistance = 1;
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const price_range = [
    {
      value: 1,
      label: "$",
    },
    {
      value: 2,
      label: "$$",
    },
    {
      value: 3,
      label: "$$$",
    },
    {
      value: 4,
      label: "$$$$",
    },
  ];

  const radius_range = [
    {
      value: 1000,
      label: "1000m",
    },
    {
      value: 2000,
      // label: '2000m',
    },
    {
      value: 3000,
      // label: '3000m',
    },
    {
      value: 4000,
      // label: '4000m',
    },
    {
      value: 5000,
      label: "5000m",
    },
  ];

  return (
    <>
      <div>
        <BackButton onClick={() => navigate(-1)} />
        {/* <Box sx={{ height: 100 }}></Box> */}
        <h2 className="text-lg font-bold mb-4 flex justify-center">
          Choose Your Preferences!
        </h2>
        <Box className="p-2 mb-10">
          <Typography variant="h5" color="black">
            Dietary
          </Typography>
          <FormGroup className="mb-5">
            <FormControlLabel
              control={
                <Checkbox
                  name="vegan"
                  checked={preferences.vegan}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Vegan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="vegetarian"
                  checked={preferences.vegetarian}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Vegetarian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="halal"
                  checked={preferences.halal}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Halal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="noBeef"
                  checked={preferences.noBeef}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="No beef"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="specialDiet"
                  checked={preferences.specialDiet}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Special Diet"
            />
          </FormGroup>
          <Typography variant="h5" color="black">
            Cuisine
          </Typography>
          <FormGroup className="mb-5">
            <FormControlLabel
              control={
                <Checkbox
                  name="chinese"
                  checked={preferences.chinese}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Chinese"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="japanese"
                  checked={preferences.japanese}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Japanese"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="korean"
                  checked={preferences.korean}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Korean"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="italian"
                  checked={preferences.italian}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Italian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="mexican"
                  checked={preferences.mexican}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Mexican"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="fastFood"
                  checked={preferences.fastFood}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Fast Food"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="dessert"
                  checked={preferences.dessert}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "orange",
                    "&.Mui-checked": {
                      color: "orange",
                    },
                  }}
                />
              }
              label="Dessert"
            />
          </FormGroup>

          <div>
            <p>Distance</p>
            <Slider
              aria-label="Radius"
              value={radius}
              onChange={handleRadiusChange}
              valueLabelDisplay="auto"
              step={1000}
              min={1000}
              max={5000}
              marks={radius_range}
              sx={{
                color: "orange",
                "& .MuiSlider-thumb": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "lightgray",
                },
                "& .MuiSlider-markLabel": {
                  color: "orange",
                },
              }}
            />
          </div>

          <div>
            <p>Budget</p>
            <Slider
              className="text-white"
              getAriaLabel={() => "Price range"}
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              marks={price_range}
              step={1}
              shiftStep={1}
              min={1}
              max={4}
              sx={{
                color: "orange",
                "& .MuiSlider-thumb": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "lightgray",
                },
                "& .MuiSlider-mark": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-markLabel": {
                  color: "orange",
                },
              }}
            />
          </div>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/RestaurantList", {
                state: {
                  lat,
                  lng,
                  preferences,
                  priceRange,
                  radius,
                },
              });
            }}
            fullWidth
            sx={{
              bgcolor: "#FFA500", // Orange background
              color: "white", // White text
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#FFB84D", // Lighter orange on hover
              },
            }}
          >
            Get Restaurants!
          </Button>
        </Box>

        <MainButton
          text="Get Restaurants!"
          onClick={() => {
            navigate("/restaurantList", {
              state: {
                lat,
                lng,
                preferences,
                priceRange,
                radius,
              },
            });
          }}
          color="#fb923c"
        />
      </div>
    </>
  );
};

export default Preference;
