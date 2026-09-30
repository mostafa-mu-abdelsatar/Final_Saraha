import jwt from "jsonwebtoken"
import UserModel from "../DB/models/User.Model.js";

export const authentication = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({message: "Authentication token is required"});
    }
    const decoded = jwt.verify(authorization, "Your_Secret_Key");
    if (!decoded?._id) {
        return res.status(401).json({message: "Invalid authentication token"});
    }
    const existingUser = await UserModel.findById(decoded._id, {password: 0, __v: 0});
    if (!existingUser) {
        return res.status(401).json({message: "User not found"});
    }
    req.user = existingUser;
    next();
}