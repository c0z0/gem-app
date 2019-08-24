const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const User = require('./models/User')
const Portal = require('./models/Portal')
const Gem = require('./models/Gem')
const Folder = require('./models/Folder')
const GraphQLJSON = require('graphql-type-json')
const Note = require('./models/Note')
const LoginRequest = require('./models/LoginRequest')
const { sendEmail, fetchTitle, validateUrl } = require('./utils')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const googleAuth = new OAuth2Client(CLIENT_ID)

module.exports = {
  Query: {
    about: () => 'Built with ♥️ by cserdean.com.',
    allUsers: async () => await User.find({}),
    checkLogin: async (_, { id }) => {
      const loginRequest = await LoginRequest.findById(id)

      return loginRequest
    },
    viewer: (_, __, { viewer }) => viewer,
    note: async (_, { id }, { viewer }) =>
      await Note.findOne({ _id: id, userId: viewer._id }),
    portal: async (_, { code }) => await Portal.findOneAndDelete({ code: code })
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
    googleLogin: async (_, { token }) => {
      const ticket = await googleAuth.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      })

      const { email } = ticket.getPayload()

      let user = await User.findOne({ email })
      if (!user) {
        user = await User.create({ email })
      }

      const loginRequest = await LoginRequest.create({
        userId: user._id,
        pending: false,
        token: jwt.sign({ id: user.i }, process.env.JWT_SECRET)
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
    createNote: async (_, __, { viewer }) =>
      await Note.create({
        userId: viewer._id
      }),

    createFolder: async (_, { title }, { viewer }) =>
      await Folder.create({ userId: viewer._id, title }),
    createGem: async (_, { url, tags, favorite, folderId }, { viewer }) => {
      const parsedUrl = validateUrl(url)

      if (!parsedUrl) throw new Error('Invalid url')

      const titlePromise = fetchTitle(parsedUrl.href)
      // const shortenPromise = shortenUrl(parsedUrl.href)

      const [title] = [await titlePromise /*, await shortenPromise*/]

      const gem = await Gem.create({
        displayUrl: parsedUrl.host,
        folderId: folderId,
        href: parsedUrl.href,
        userId: viewer._id,
        tags,
        favorite,
        title: title || parsedUrl.host
      })

      return gem
    },
    deleteGem: async (_, { id }, { viewer }) =>
      await Gem.findOneAndUpdate(
        { _id: id, userId: viewer._id },
        { deleted: true },
        { new: true }
      ),
    undoDeleteGem: async (_, { id }, { viewer }) =>
      await Gem.findOneAndUpdate(
        { _id: id, userId: viewer._id },
        { deleted: false },
        { new: true }
      ),
    deleteNote: async (_, { id }, { viewer }) =>
      await Note.findOneAndDelete({ _id: id, userId: viewer._id }),
    deleteFolder: async (_, { id }, { viewer }) =>
      await Folder.findOneAndDelete({ _id: id, userId: viewer._id }),
    updateNote: async (_, { id, content, title }, { viewer }) =>
      await Note.findOneAndUpdate(
        { userId: viewer._id, _id: id },
        { content, title },
        { new: true }
      ),
    createPortal: async (_, { code, href }) =>
      await Portal.create({ code, href }),
    toggleFavoriteGem: async (_, { id }, { viewer }) => {
      const gem = await Gem.findOne({ _id: id, userId: viewer._id })
      const newGem = await Gem.findByIdAndUpdate(
        gem._id,
        { favorite: !gem.favorite },
        { new: true }
      )

      return newGem
    },
    moveGem: async (_, { id, folderId }) => {
      const newGem = await Gem.findByIdAndUpdate(
        id,
        { folderId },
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
  Note: {
    id: ({ _id }) => _id,
    owner: async ({ userId }) => await User.findById(userId)
  },
  User: {
    id: ({ _id }) => _id,
    gems: async ({ _id }, { tagged }) =>
      (await Gem.find({ userId: _id, deleted: false }).sort(
        '-createdAt'
      )).filter(g => !tagged || g.tags.includes(tagged)),
    notes: async ({ _id }) =>
      await Note.find({ userId: _id }).sort('-createdAt'),
    folders: async ({ _id }) =>
      await Folder.find({ userId: _id }).sort('-createdAt')
  },
  Folder: {
    id: ({ _id }) => _id,
    owner: async ({ userId }) => await User.findById(userId)
  },

  Portal: {
    id: ({ _id }) => _id,
    owner: async ({ userId }) => await User.findById(userId)
  },

  JSON: GraphQLJSON
}
