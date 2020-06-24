import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import io from 'socket.io';
import http from 'http';
import _env from 'dotenv';
import figlet from 'figlet';
import Logger from './modules/logger';


if(process.env.NODE_ENV !== 'production') {
    _env.config();
}

const logger = new Logger();

/* Application */
const app = express();
const server = http.Server(app);
const socket = io(http);

/* Application Configuration */
app.use(cors());
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/* Overrides */
app.response.logger = logger;

/* Middleware Logger */
// app.use((req, res, next) => {
//     logger.info(req.rawHeaders.join(" "));
//     next();
// });

socket.on("connection", socket => {
    console.log(`[${socket.id}] connected to the server.`);
})

/* Router Definitions */
import indexRouter from './routes/indexRouter';

/* Router Links */
app.use("/", indexRouter);

/* Server Initializations */
const PORT = process.env.PORT || 8080;
app.response.logger.info(`Attempting to connect to port ${PORT}`)
server.listen(PORT, () => figlet(`Listening to ${PORT}`, (err, res) => {
    if(err)
        throw err;
    logger.log(`\n${res}`);
}));