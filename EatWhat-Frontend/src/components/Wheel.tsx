import React, { useEffect, useState } from 'react'
import { Wheel as Roulette } from 'react-custom-roulette'
import {
  Modal,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import RestaurantModal from './ResturantModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Wheel(props: any): JSX.Element {
  const [options, setOptions] = useState<{ option: string; style: { backgroundColor: string, textColor?: string } }[]>([]);
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState<any>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = props.data;
  console.log(data);

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      let lastColor = ""; // Store the last selected color

      const formattedOptions = data.map((option: any) => {
        let color;

        // Ensure the color is not the same as the lastColor
        do {
          color = segColors[Math.floor(Math.random() * segColors.length)];
        } while (color === lastColor);

        // Update lastColor to the current one
        lastColor = color;

        return {
          option:
            option.name.length > 15
              ? option.name.slice(0, 15) + "..."
              : option.name,
          style: { backgroundColor: color },
        };
      });
      setOptions(formattedOptions);
    }
  }, [data]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }


  return options.length > 0 ? (
    <>
      <Roulette
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={options}
        fontSize={15}
        onStopSpinning={() => {
          setWinner(data[prizeNumber])
          setMustSpin(false);
          setOpen(true)
        }}
      />
      <Button variant='text' onClick={handleSpinClick}>
        SPIN
      </Button>
      <RestaurantModal restaurant={winner} open={open} setOpen={setOpen} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" />
    </>
  ) : (
    <div>Loading...</div>
  );

}

export default Wheel