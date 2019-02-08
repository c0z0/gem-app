const jwt = require('jsonwebtoken')

const User = require('./models/User')
const Gem = require('./models/Gem')
const LoginRequest = require('./models/LoginRequest')
const { sendEmail, fetchTitle, validateUrl } = require('./utils')

module.exports = {
  Query: {
    allUsers: async () => await User.find({}),
    checkLogin: async (_, { id }) => {
      const loginRequest = await LoginRequest.findById(id)
      if (!loginRequest.pending)
        await LoginRequest.findByIdAndDelete(loginRequest._id)

      return loginRequest
    },
    viewer: (_, __, { viewer }) => viewer
  },
  Mutation: {
    login: async (_, { email }) => {
      let user = await User.findOne({ email })
      if (!user) {
        user = await User.create({ email })
      }

      const loginRequest = await LoginRequest.create({
        userId: user._id
      })

      await sendEmail({
        to: email,
        verificationCode: loginRequest.verificationCode,
        token: loginRequest.secretId
      })

      return loginRequest
    },
    verifyLogin: async (_, { token }) => {
      const loginRequest = await LoginRequest.findOne({ secretId: token })

      const newLoginRequest = await LoginRequest.findByIdAndUpdate(
        loginRequest._id,
        {
          pending: false,
          token: jwt.sign({ id: loginRequest.userId }, process.env.JWT_SECRET)
        },
        { new: true }
      )

      return newLoginRequest
    },
    createGem: async (_, { url, tags, favorite }, { viewer }) => {
      const parsedUrl = validateUrl(url)

      if (!parsedUrl) throw new Error('Invalid url')

      const titlePromise = fetchTitle(parsedUrl.href)
      // const shortenPromise = shortenUrl(parsedUrl.href)

      const [title] = [await titlePromise /*, await shortenPromise*/]

      const gem = await Gem.create({
        displayUrl: parsedUrl.host,
        href: parsedUrl.href,
        userId: viewer._id,
        tags,
        favorite,
        title
      })

      return gem
    },
    deleteGem: async (_, { id }, { viewer }) => {
      return await Gem.findOneAndDelete({ _id: id, userId: viewer._id })
    },
    toggleFavoriteGem: async (_, { id }, { viewer }) => {
      const gem = await Gem.findOne({ _id: id, userId: viewer._id })
      const newGem = await Gem.findByIdAndUpdate(
        gem._id,
        { favorite: !gem.favorite },
        { new: true }
      )

      return newGem
    }
  },
  LoginRequest: {
    id: ({ _id }) => _id,
    user: async ({ userId }) => await User.findById(userId)
  },
  Gem: {
    id: ({ _id }) => _id,
    owner: async ({ userId }) => await User.findById(userId),
    favorite: ({ favorite }) => true && favorite
  },
  User: {
    id: ({ _id }) => _id,
    gems: async ({ _id }, { tagged }) =>
      (await Gem.find({ userId: _id }).sort('createdAt'))
        .filter(g => !tagged || g.tags.includes(tagged))
        .reverse()
  }
}