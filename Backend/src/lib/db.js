import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
            console.log(`Mongo db: ${mongoose.connection.host}`);
        

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
        
    }
}