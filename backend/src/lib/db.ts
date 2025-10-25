import mongoose from "mongoose";


const connectDB = async () => {
    const dbUri = process.env.MONGODB_URI;

    if(!dbUri)
        throw new Error("MongoDB URI is missing");

    await mongoose.connect(dbUri).then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.error("Error connecting to MongoDB ", err);
    });
}

export default connectDB;