import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true,
        min:18,
        max:60
    },
    gender:{
        type:String,
        require:true,
        enum:['male', 'female']
    }
},{
    timestamps:true
})


const UserModel = mongoose.models.User || mongoose.model("User",userSchema)
export default UserModel