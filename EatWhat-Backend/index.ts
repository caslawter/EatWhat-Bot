import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

//For env File
dotenv.config({ path: ".env.local" });

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.get("/api/placeDetails", async (req: Request, res: Response) => {
    try {
        const { placeID } = req.query;
        console.log(placeID);

        const response = await axios.get(
            `https://places.googleapis.com/v1/places/${placeID}`,
            {
                params: {
                    fields:
                        "id,types,displayName,rating,location,shortFormattedAddress,priceLevel,priceRange,attributions,reviews,websiteUri,currentOpeningHours,nationalPhoneNumber",
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/searchArea", async (req: Request, res: Response) => {
    try {
        const { lat, lng, radius, min, max, keyword } = req.query;

        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            {
                params: {
                    location: `${lat},${lng}`,
                    radius: radius,
                    type: "restaurant",
                    key: process.env.GOOGLE_API_KEY,
                    open_now: true,
                    minprice: min,
                    maxprice: max,
                    keyword: keyword,
                },
            }
        );
        res.json(response.data.results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is firing at http://localhost:${port}`);
});
