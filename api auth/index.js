import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Tanjimul";
const yourPassword = "Adnan";
const yourAPIKey = "0290c9bc-1c3f-47ec-9a7e-60a1cc0c0a37";
const yourBearerToken = "784b5be1-f7d1-472b-bf23-23b4a3153c95";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
 try {
    const result = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
 }
});

app.get("/basicAuth",async (req, res) => {
  try {
     const result = await axios.get(API_URL + "/all?page=2", {
       auth: {
         username: yourUsername,
         password: yourPassword,
       },
     });
     res.render("index.ejs", { content: JSON.stringify(result.data) });
   } catch (error) {
     res.status(404).send(error.message);
   }
});

app.get("/apiKey",async (req, res) => {
 try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async(req, res) => {
  try {
     const result = await axios.get(API_URL + "/secrets/2", config);
     res.render("index.ejs", { content: JSON.stringify(result.data) });
   } catch (error) {
     res.status(404).send(error.message);
   }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
