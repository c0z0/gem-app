const jwt = require('jsonwebtoken')

const User = require('./models/User')
const LoginRequest = require('./models/LoginRequest')
const {sendEmail} = require('./utils')

module.exports = {
  Query: {
    allUsers: async () => await User.find({}),
    checkLogin: async (_, {id}) => await LoginRequest.findById(id),
    viewer: (_, __, {viewer}) => viewer,
  },
  Mutation: {
    login: async (_, {email}) => {
      let user = await User.findOne({email})
      if (!user) {
        user = await User.create({email})
      }

      const loginRequest = await LoginRequest.create({
        userId: user._id,
      })

      await sendEmail({
        to: email,
        verificationCode: loginRequest.verificationCode,
        token: loginRequest.secretId,
      })

      return loginRequest
    },
    verifyLogin: async (_, {token}) => {
      const loginRequest = await LoginRequest.findOne({secretId: token})

      const newLoginRequest = await LoginRequest.findByIdAndUpdate(
        loginRequest._id,
        {
          pending: false,
          token: jwt.sign({id: loginRequest.userId}, process.env.JWT_SECRET),
        },
        {new: true},
      )

      return newLoginRequest
    },
  },
  LoginRequest: {
    id: ({_id}) => _id,
    user: async ({userId}) => await User.findById(userId),
  },
  User: {
    id: ({_id}) => _id,
  },
}
