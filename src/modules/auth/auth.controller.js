import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from "../../DB/models/User.Model.js";
const router = Router()

router.post('/signup',async(req, res, next)=>{
    try {
        const {userName, email, password, phone, age, gender} = req.body
        if (!userName || !email || !password || !phone || !age || !gender) {
            return res.status(400).json({message:"please fill all fields"})    
        }
        // const existUser = await UserModel.findOne({email}, {_id:0})
        const existUser = await UserModel.findOne({email}, {userName:1})
        if (existUser) {
            return res.status(401).json({message:"there exist user with this email"})
        }
        const hashedPass = bcrypt.hashSync(password, 10)
        await UserModel.insertOne({userName, email, password:hashedPass, phone, age, gender})
        return res.status(201).json({message:"you signed up successfuly"})
    } catch (error) {
        return res.status(500).json({message:"server error", message:error.message, stack:error.stack})
    }
})

router.post('/login',async(req, res, next)=>{
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message:"please enter the email and password"})    
        }
        const existUser = await UserModel.findOne({email})
        if (!existUser) {
            return res.status(404).json({message:"in-valid, not exist any user with this email"})
        }
        const checkPassword = bcrypt.compareSync(password, existUser.password)
        if(!checkPassword){
            return res.status(404).json({message:'the email or password not correct'})
        }
        const token = jwt.sign({_id:existUser._id, isLogged:true}, 'Your_Secret_Key', {expiresIn:'30m'})
        return res.status(200).json({message:"user loged in done", token})        
    } catch (error) {
        return res.status(500).json({message:"server error", message:error.message, stack:error.stack})
    }
})

export default router