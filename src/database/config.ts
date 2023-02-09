import mongoose from 'mongoose';
mongoose.set("strictQuery", false);

export const dbConnection = async () => {

    const dataBaseUrl: string = process.env.DB_CNN as string

    try {
        await mongoose.connect(dataBaseUrl);
        console.log("DB Online");
    } catch (error) {
        console.log(error);
    }
}