import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail";
import axios from "axios";
import { BackButton, MainButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const Preference = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lat, lng } = state;
  console.log(lat);
  console.log(lng);

  const [value, setValue] = React.useState<number[]>([1, 2]);
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
          <FormControlLabel control={<Checkbox defaultChecked />} label="Vegan" />
          <FormControlLabel control={<Checkbox />} label="Vegetarian" />
          <FormControlLabel control={<Checkbox />} label="Halal" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="No beef" />
          <FormControlLabel control={<Checkbox />} label="Special Diet" />
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
          defaultValue={1000}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={1000}
          step={1000}
          marks={radius_range}
          min={1000}
          max={5000}
        />

        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={price_range}
          step={1}
          shiftStep={1}
          min={1}
          max={4}
        />
      </Box>
      <Button variant="text" onClick={() => {navigate('/RestaurantList', { state: { lat, lng } })}}>Text</Button>
      <MainButton
        text="Get Restaurants!"
        onClick={() => { navigate('/RestaurantList', { state: { lat, lng } }) }}
      />
    </div>
  );
};

export default Preference;
