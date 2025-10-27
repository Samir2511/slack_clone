import mongoose from "mongoose";


const connectDB = async () => {
    const dbUri = process.env.MONGODB_URI;

    if(!dbUri)
        throw new Error("MongoDB URI is missing");

    await mongoose.connect(dbUri).then(() => {
        console.log("MongoDB Connected:", mongoose.connection.host);
    }).catch((err) => {
        console.error("Error connecting to MongoDB ", err);
        process.exit(1);
    });
}

export default connectDB;