import React, { useState } from "react";
import {
    Modal,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
} from "@mui/material";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const RestaurantModal = (props: any) => {
    const { restaurant, open, setOpen } = props

    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 4,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Card elevation={0} sx={{ textAlign: "center" }}>
                        <CardContent>
                            {/* Restaurant Name */}
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {restaurant.name}
                            </Typography>

                            {/* Price, and Rating */}
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                                    {[1, 2, 3, 4].map((level) => (
                                        <FaDollarSign
                                            key={level}
                                            className={
                                                level <= restaurant.priceLevel
                                                    ? "text-customOrange-dark"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </Typography>
                                <Typography variant="body1" sx={{ mx: 1 }}>
                                    •
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <FaStar className="text-customOrange-dark" />
                                    {restaurant.rating}
                                </Typography>
                            </Stack>

                            {/* Address */}
                            <Typography variant="body2" color="text.secondary" mt={2}>
                                {restaurant.location}
                            </Typography>

                            {/* Buttons */}
                            <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#FFA500",
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { bgcolor: "#FFB84D" },
                                    }}
                                    onClick={() => {setOpen(false)}}
                                >
                                    Let&apos;s Go!
                                </Button>
                                <Button
                                    variant="text"
                                    sx={{ color: "gray", fontWeight: "bold" }}
                                    onClick={() => {setOpen(false)}}
                                >
                                    Nah
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}

export default RestaurantModal;