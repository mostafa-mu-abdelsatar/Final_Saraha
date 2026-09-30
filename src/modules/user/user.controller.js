import { Router } from "express";
import { authentication } from "../../middlewares/auth.middleware.js";

const router = Router()

router.get('/profile',authentication , async (req, res) => {
        const {userName,email, _id} = req.user;
        return res.status(200).json({ UserProfile:{userName, email, _id} });
    });

router.patch('/update-profile',authentication , async (req, res) => {
        const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
            return res.status(201).json({ message: "profile updated" });
    });

export default router