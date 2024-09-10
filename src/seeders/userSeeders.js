import colors from "colors";
import dotenv from "dotenv";
import connectDB from "../config/database.js";
import User from "../models/UserModel.js";
import users from "../data/users.js";

dotenv.config();
connectDB();

// Function to delete all users
const destroyData = async () => {
    try {
        await User.deleteMany();
        console.log("Users removed".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Function to import users, avoiding duplicates
const importData = async () => {
    try {
        // Find existing users by email
        const existingUsers = await User.find({ email: { $in: users.map(user => user.email) } });
        const existingEmails = new Set(existingUsers.map(user => user.email));

        // Filter out users with existing emails
        const newUsers = users.filter(user => !existingEmails.has(user.email));

        // Insert new users
        if (newUsers.length > 0) {
            await User.insertMany(newUsers);
            console.log("Users imported".green.inverse);
        } else {
            console.log("No new users to import".yellow.inverse);
        }
        
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Run the appropriate function based on the argument
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
