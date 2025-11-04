import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(clerkMiddleware()); // req.auth will be available in the request object
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const startServer = async () => {
    try {
        await connectDB();
        if (process.env.NODE_ENV !== "production") {
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
            });
        }
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
startServer();
export default app;
