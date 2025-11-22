import mongoose from "mongoose";


const DBConnection = async () => {
    const MONGODB_URI = `mongodb+srv://user:hello1234@file-sharing.4ni7bjm.mongodb.net/?appName=file-sharing`;
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database", error.message);
    }
}

export default DBConnection;