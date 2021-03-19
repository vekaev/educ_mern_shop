import User from "../models/user.model.js";
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc   Get user profile
// @route  Get /api/users/profile
// @access Public

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
})


// @desc   create User
// @route  POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  const userExist = await User.findOne({email})


  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name, email, password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


export {authUser, getUserProfile, registerUser}
