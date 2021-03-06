const UserSchema = require('../models/user')

const createUser = (data) => {
  const { name, email, level, password } = data
  return UserSchema.create({ name, email, level, password })
    .then((user) => user)
    .catch((err) => {
      console.log(err)
    })
}

const updateUser = (id, data) => {
  return UserSchema.findByIdAndUpdate(id, { $set: data }, { new: true })
    .populate({ path: 'posts' })
    .then((userUpdated) => userUpdated)
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const user = (id) => {
  return UserSchema.findOne({ _id: id }).exec()
    .populate({ path: 'posts' }).exec()
    .then((user) => {
      return user
    })
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const users = () => {
  return UserSchema.find()
  // { path: 'histories', populate: { path: 'places' } }
    .populate({ path: 'posts' }).exec()
    .then((users) => users)
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const getUserByEmail = (email) => {
  return UserSchema.findOne({ email: email })
}

module.exports = {
  createUser,
  updateUser,
  user,
  users,
  getUserByEmail
}
