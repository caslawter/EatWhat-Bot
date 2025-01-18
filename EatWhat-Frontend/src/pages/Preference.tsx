import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail";
import axios from "axios";
import { BackButton, MainButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Box
} from "@mui/material";

const Preference = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lat, lng } = state;
  console.log(lat);
  console.log(lng);

  const [value, setValue] = React.useState<number[]>([1, 2]);
  const [priceRange, setPriceRange] = useState(1);
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

  const handleCheckboxChange = (event:any) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

    // Handle radius slider change
    const handleRadiusChange = (event:any, newValue:any) => {
      setRadius(newValue);
    };
  
    // Handle price range slider change
    const handlePriceRangeChange = (event:any, newValue:any) => {
      setPriceRange(newValue);
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
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const price_range = [
    {
      value: 1,
      label: "$"
    },
    {
      value: 2,
      label: "$$"
    },
    {
      value: 3,
      label: "$$$"
    }, {
      value: 4,
      label: "$$$$"
    },
  ]

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
    <div>
      <BackButton onClick={() => navigate(-1)} />
      <Box sx={{ height: 100 }}></Box>
      <Box sx={{ width: 500, height: 500 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="vegan"
              checked={preferences.vegan}
              onChange={handleCheckboxChange}
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
            />
          }
          label="Special Diet"
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="chinese"
              checked={preferences.chinese}
              onChange={handleCheckboxChange}
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
            />
          }
          label="Dessert"
        />
      </FormGroup>


        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Chinese" />
          <FormControlLabel control={<Checkbox />} label="Japanese" />
          <FormControlLabel control={<Checkbox />} label="Korean" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Italian" />
          <FormControlLabel control={<Checkbox />} label="Mexican" />
          <FormControlLabel control={<Checkbox />} label="Fast Food" />
          <FormControlLabel control={<Checkbox />} label="Dessert" />
        </FormGroup>


        <Slider
        aria-label="Radius"
        value={radius}
        onChange={handleRadiusChange}
        valueLabelDisplay="auto"
        step={1000}
        min={1000}
        max={5000}
      />

      <Slider
        aria-label="Price range"
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={4}
      />
      </Box>

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {/* <Button variant="text" onClick={() => {navigate('/RestaurantList', { state: { lat, lng } })}}>Text</Button> */}
      <MainButton
        text="Get Restaurants!"
        onClick={() => { navigate('/RestaurantList', { state: { lat, lng } }) }}
      />
    </div>
  );
};

export default Preference;
