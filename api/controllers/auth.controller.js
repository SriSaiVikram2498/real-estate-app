import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utilis/error.js';
import jwt from 'jsonwebtoken';
export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try{
        await newUser.save();//because it takes few seconds to save in the database
        res.status(201).json("User create successfully!");
    } catch(err){
        // res.status(500).json(err.message);//we use middleware instead of this because there are many api endpoints we cant write or handle error for every api endpoint so we use api endpoint
        next(err);// sending err to middleware
    }  
};
export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if (!validUser) return next(errorHandler(404,'User not found!'));
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if (!validPassword) return next(errorHandler(401,'Wrong credientials'));
        const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
        const {password:pass , ...rest}= validUser._doc;
        res
            .cookie('access_token',token, {httpOnly:true})
            .status(200)
            .json(rest);
    } catch(err){
        next(err);
    }  
};