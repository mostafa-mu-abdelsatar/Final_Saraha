import{Router} from 'express'
import { authentication } from '../../middlewares/auth.middleware.js';
import UserModel from '../../DB/models/User.Model.js';
import messageModel from '../../DB/models/Messages.Model.js';

const router =Router()

router.post("/sendMessage",async(req,res)=>{
    const {receiverId, content } = req.body;
    if(!receiverId || !content){
        return res.status(400).json({message:"receiverId and content are required"});
    }
    if (!await UserModel.findById(receiverId)) {
        return res.status(400).json({
            message:'this user is not found'
        });
    }
    const newMessage = await messageModel.create({
        receiverId,
        content,
        initTime: Date.now(),
    });
    return res.status(200).json({ message: "message sent", newMessage });
})

router.get("/getMessage",authentication, async(req,res)=>{
    const messages = await messageModel.find({receiverId:req.user._id})
    if(messages.length === 0){
        return res.status(404).json({message:"no messages found"})
    }
    return res.status(200).json({ message: "messages retrieved", messages });
})




export default router