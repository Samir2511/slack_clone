import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./lib/db.ts";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (req, res) => {
   res.send("Hello World!");
});



app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectDB();
});
