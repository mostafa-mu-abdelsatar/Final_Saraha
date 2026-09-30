import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true
})



const MessageModel = mongoose.models.Message || mongoose.model("Message",messageSchema)

export default MessageModel