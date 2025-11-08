import "../instrument.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.ts";
import {clerkMiddleware} from "@clerk/express";
import {functions, inngest} from "./config/inngest.ts";
import {serve} from "inngest/express";
import chatRoutes from "./routes/chat.route.ts";
import * as Sentry from "@sentry/node";


const app = express();
const PORT = process.env.PORT || 8000;


app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(clerkMiddleware()); // req.auth will be available in the request object


app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.use("/api/inngest", serve({client: inngest, functions})); 
app.use("/api/chat", chatRoutes); 

Sentry.setupExpressErrorHandler(app);


const startServer = async () => {
    try {
        await connectDB();
        if(process.env.NODE_ENV !== "production") {
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
            });
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();

export default app;
