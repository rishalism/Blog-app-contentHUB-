import mongoose from "mongoose"

const ConnectMongoDb = async (): Promise<void> => {
    try {
        const connectionURL = process.env.MONGO_CONNECTION_URL || "mongodb://localhost:27017";

        await mongoose.connect(connectionURL);
        console.log(`MongoDB connected successfully to ${connectionURL}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error; // Re-throw the error to be caught in the startServer function
    }
};


export default ConnectMongoDb