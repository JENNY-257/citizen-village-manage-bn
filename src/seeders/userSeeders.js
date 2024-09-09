import colors from "colors";
import dotenv from "dotenv";
import connectDB from "../config/database.js";
import User from "../models/UserModel.js";
import users from "../data/users.js";

dotenv.config();
connectDB();

const destroyData = async() => {
    try {
        await User.deleteMany();
        console.log("users removed ".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const importData = async() => {
    try {
        const createdUsers = await User.insertMany(users);
        const importedUser = createdUsers[0]._id;
        console.log("users imported".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}
else{
    importData();
}