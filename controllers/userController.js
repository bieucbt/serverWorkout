const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//create Token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1h'})
}

//get all user
const getAllUser = async (req, res) => {
  const user = await User.find({})
  user && res.status(200).json(user)
}

// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try{
    const info = await User.login(email, password)
    res.json(info)
  }catch(err){
    res.status(400).json(err.message)
  }
  
}

// sign up user
const signupUser = async (req, res) =>{
  const {email, password} = req.body
  try{
    const user = await User.signup(email, password)
    // create token
    const token = createToken(user._id)
    res.status(200).json({email, token, user})
  }catch(err){ 
    res.status(400).json({err: err.message})
  }
}


module.exports = {
  loginUser,
  signupUser,
  getAllUser
}