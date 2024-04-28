import { connect } from "mongoose"

export const dbConnection = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("Mongoose connection established");
    } catch (error) {
        console.log(error);
    }
}