import express, { Express, Request, Response, Application, json } from "express";
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
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors())
app.use('*', cors({ origin: true, credentials: true }));
app.use(json())
app.use(
    cors({
      origin: "https://eatwhat-backend-e2izkk66m-kzeezees-projects.vercel.app", // Replace with your frontend origin
      methods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Private-Network', 'true'); // Enable private network access
    next();
  });

app.get("/", (req: Request, res: Response) => {
    res.send("Express on Vercel");
    console.log("HELLO");
});

app.get("/getPhoto", async (req:Request, res: Response) => {
    try {
        console.log(req.body);
        
        const name = req.body.name;
        console.log(name);
        
        const response = await axios.get(
            `https://places.googleapis.com/v1/${name}/media`,
            {
                params: {
                    maxHeightPx: 400,
                    maxWidthPx: 400,
                    skipHttpRedirect:true,
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );
        res.status(200).json(response.data);

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: error.message });
    }
})

app.get("/placeDetails", async (req: Request, res: Response) => {
    try {
        const { placeID } = req.query;
        console.log("placeID ==> ", placeID);

        const response = await axios.get(
            `https://places.googleapis.com/v1/places/${placeID}`,
            {
                params: {
                    fields:
                        "id,types,displayName,rating,location,photos,shortFormattedAddress,priceLevel,priceRange,attributions,reviews,websiteUri,currentOpeningHours,nationalPhoneNumber",
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/searchArea", async (req: Request, res: Response) => {
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

module.exports = app;

app.listen(port, () => {
    console.log(`Server is firing at http://localhost:${port}`);
});
