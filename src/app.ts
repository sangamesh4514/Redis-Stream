import express, { Application } from "express";
import bodyParser from "body-parser";
import events from "./routes/events";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/",events);

export default app;