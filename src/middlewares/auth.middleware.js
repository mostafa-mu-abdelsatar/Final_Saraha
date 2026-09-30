export const authentication = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({message: "Authentication token is required"});
    }
    const decoded = jwt.verify(authorization, "your_jwt_secret_key");
    if (!decoded?._id) {
        return res.status(401).json({message: "Invalid authentication token"});
    }
    const existingUser = await userModel.findById(decoded._id, {password: 0, __v: 0});
    if (!existingUser) {
        return res.status(401).json({message: "User not found"});
    }
    req.user = existingUser;
    next();
}