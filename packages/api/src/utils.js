const fetch = require('isomorphic-fetch')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const cheerio = require('cheerio')
const url = require('url')
const algoliasearch = require('algoliasearch')

const secrets = require('./secrets.json')
const User = require('./models/User')
const emailTemplate = require('./email-template')

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN
)

const algoliaIndex = algoliaClient.initIndex('gems')

const addToIndex = object =>
  // eslint-disable-next-line no-undef
  new Promise((res, rej) => {
    object.objectID = object._id

    algoliaIndex.addObject(object, err => {
      if (err) return rej(err)
      res()
    })
  })

const updateIndex = object =>
  // eslint-disable-next-line no-undef
  new Promise((res, rej) => {
    object.objectID = object._id

    algoliaIndex.partialUpdateObject(object, err => {
      if (err) return rej(err)
      res()
    })
  })

const apiRoot =
  process.env.NODE_ENV === 'production'
    ? process.env.API_ROOT
    : 'http://localhost:3000'

function search(query, userId) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    algoliaIndex.search(
      {
        query
      },
      (err, res) => {
        if (err) return reject(err)
        res.hits.forEach(h => {
          console.log({ deleted: h.deleted })
        })
        resolve(
          res.hits.filter(h => h.userId === userId.toString() && !h.deleted)
        )
      }
    )
  })
}

function validateUrl(string) {
  let u = url.parse(string)

  if (!u.protocol) u = url.parse('http://' + string)

  if (!u.protocol) return null

  return u
}

function generateSecret() {
  let adjective =
    secrets.adjectives[Math.floor(Math.random() * secrets.adjectives.length)]
  let animal =
    secrets.animals[Math.floor(Math.random() * secrets.animals.length)]

  animal = animal[0].toUpperCase() + animal.slice(1)
  adjective = adjective[0].toUpperCase() + adjective.slice(1)
  return adjective + ' ' + animal
}

async function sendEmail({ to, token, verificationCode }) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SG_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'gem@cserdean.com' },
      subject: `Gem Login Verification (code: ${verificationCode})`,
      content: [
        {
          type: 'text/html',
          value: emailTemplate({
            secret: verificationCode,
            link: `${apiRoot}/v?t=${token}`
          })
        }
      ]
    })
  })

  if (res.ok) return
  throw new Error('Email sending failed')
}

function generateId(len = 10) {
  return crypto.randomBytes(Math.floor(len / 2)).toString('hex')
}

async function getViewer(token) {
  try {
    const { id } = jwt.verify(
      token.slice('Bearer '.length),
      process.env.JWT_SECRET
    )

    return await User.findById(id)
  } catch (e) {
    return {}
  }
}

async function fetchGemDetails(url) {
  const res = await fetch(url)

  if (!res.ok) return { title: null, body: null }

  const $ = cheerio.load(await res.text())

  return {
    title: $('head > title')
      .text()
      .trim(),
    body: $('meta[property="og:description"]').attr('content')
  }
}

async function shortenUrl(url) {
  const res = await fetch('https://s.cserdean.com/api/sh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  })

  if (!res.ok) return url

  return 'https://s.cserdean.com/' + (await res.json()).id
}

module.exports = {
  generateSecret,
  sendEmail,
  generateId,
  apiRoot,
  getViewer,
  fetchGemDetails,
  validateUrl,
  shortenUrl,
  search,
  addToIndex,
  updateIndex
}
