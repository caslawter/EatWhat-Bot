import express, { Express, Request, Response, Application } from "express";
const { message } = require('telegraf/filters')
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { Context, Telegraf, } from 'telegraf';
import { link } from "telegraf/format";

// Define your own context type
interface ctx extends Context {
    myProp?: string
    myOtherProp?: number
}

//For env File
dotenv.config({ path: ".env.local" });

const bot = new Telegraf(process.env.BOT_TOKEN)

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.get("/api/placeDetails", async (req: Request, res: Response) => {
    try {
        const { placeID } = req.query;
        console.log("placeID ==> ", placeID);

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

bot.start(async ctx => {
    await ctx.reply("In order to help you decide where to eat, please allow location permissions when prompted as you press the link!\n");
    await ctx.reply(link("Link", "https://t.me/kez_testbot/testapp"));
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

app.listen(port, () => {
    console.log(`Server is firing at http://localhost:${port}`);
});
