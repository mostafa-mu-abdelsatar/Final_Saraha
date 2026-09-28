import mongoose from "mongoose";

const url = "mongodb://localhost:27017/assignment_10,1"
const DBConnection = async () =>{
    try {
        await mongoose.connect(url)
        console.log('DB Connected successfuly');
    } catch (error) {
        console.log('DB Connection failed', error);
    }
}

export default DBConnection