import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userSchema.js";
import bycryt from "bcryptjs"
import { generateJWT } from "../utils/generateJWT.js";

export const createUser = asyncHandler(async (req, res) => {

  const { username , email , password} = req.body;

  if(!username || !email || !password){
    const error = new Error("All fields are required");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const existUser = await User.findOne({email})

  if(existUser){
    const error = new Error("User already exists");
    error.statusCode = 400; // Bad Request
    throw error;
  }
  
  const salt = bycryt.genSaltSync(10);
  const hashPassword = bycryt.hashSync(password, salt);


  const createUser = new User({
    username,
    email,
    password:hashPassword
  })

  try {
    await createUser.save();
    generateJWT(createUser._id,res);
    return res.status(201).json(createUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

})

export const loginUser = asyncHandler(async (req, res) => {
    
  const {email,password} = req.body;

  if(!email || !password){
    const error = new Error("All fields are required");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const userAlredyExist = await User.findOne({email});

  if(!userAlredyExist){
    const error = new Error("User does not exist");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const isMatch = bycryt.compareSync(password,userAlredyExist.password);

  if(!isMatch){
    const error = new Error("Invalid credentials");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  try {
    generateJWT(userAlredyExist._id,res);
    res.status(200).json(userAlredyExist);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

})


export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
})




export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});