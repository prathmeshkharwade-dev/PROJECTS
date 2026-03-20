const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const songsRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songsRoutes)

module.exports = app