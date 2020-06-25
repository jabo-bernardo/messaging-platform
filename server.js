import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import io from 'socket.io';
import http from 'http';
import _env from 'dotenv';
import figlet from 'figlet';
import Logger from './modules/logger';
import bodyParser from 'body-parser';
import session from 'express-session';


if(process.env.NODE_ENV !== 'production') {
    _env.config();
}

const logger = new Logger();

/* Database Connection */
mongoose.connect("mongodb://localhost:27017/messagingplatform", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let database = mongoose.connection;
/* Triggered when something went wrong while connecting to database*/
database.on("error", err => {
    logger.error(err);
})
/* Triggered once connected to database */
database.once("open", () => {
    logger.log("Successfully connected to database");
});

/* Application */
const app = express();
const server = http.Server(app);
const socket = io(http);

/* Application Configuration */
app.use(cors());
app.use(session({
    secret: "9XGiwkcwSlXwtmMv",
    resave: true,
    saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/* Overrides */
app.response.logger = logger;

socket.on("connection", socket => {
    console.log(`[${socket.id}] connected to the server.`);
})

/* Router Definitions */
import indexRouter from './routes/indexRouter';
import authRouter from './routes/authRouter';

/* Router Links */
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.get("/dashboard", (req, res) => {
    res.send(req.session.user);
});

/* If page doesn't exists */
app.get("/*", (req, res) => {
    res.send("Page not found :D");
})

/* Server Initializations */
const PORT = process.env.PORT || 80;
app.response.logger.info(`Attempting to connect to port ${PORT}`)
server.listen(PORT, () => figlet(`Listening to ${PORT}`, (err, res) => {
    if(err)
        throw err;
    logger.log(`\n${res}`);
}));