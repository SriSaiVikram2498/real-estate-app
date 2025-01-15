import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
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