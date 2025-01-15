import User from '../models/user.models.js';
export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({username,email,password});
    try{
        await newUser.save();//because it takes few seconds to save in the database
        res.status(201).json("User create successfully!");
    } catch(err){
        res.status(500).json(err.message);
    }
    
};