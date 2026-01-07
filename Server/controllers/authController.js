import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
};
export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({message: "Invalid credentials"});

    const token = jwt.sign(
        {
            id: user_id, role: user.role
        },
        process.env.JWT_SECRET,

    );
    res.json({token, user});
};