const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
})

// static signup method
userSchema.statics.signup = async function(email, password){
  
  if(!email || !password) throw Error('please, fill email or password')
  // kiểm tra dữ liệu đầu vào email
  if(!validator.isEmail(email)) throw Error('email is not ok')
  // kiểm tra password có yếu không (phải có chữ hoa, thường và ký tự)
  if(!validator.isStrongPassword(password)) throw Error('password is weak')
  // this này giống như cái export model từ chema ở dưới
  const exits = await this.findOne({email})
  if(exits) throw Error('Email already in use')
  // tạo salt
  const salt = await bcrypt.genSalt(10)
  //tạo hash với salt
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({email, password: hash})

  return user
}

// static method login
userSchema.statics.login = async function(email, password){
  if(!email || !password) throw Error('please, fill email or password')

  const user = await this.findOne({email})

  if(!user) throw Error('incorrect email')

  const match = await bcrypt.compare(password, user.password) 

  if(!match) throw Error('incorrect password')

  return user
}

module.exports = mongoose.model('User', userSchema) // this đây

