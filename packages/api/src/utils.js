const secrets = require('./secrets.json')
const fetch = require('isomorphic-fetch')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const cheerio = require('cheerio')
const url = require('url')
const emailTemplate = require('./email-template')

const apiRoot =
  process.env.NODE_ENV === 'production'
    ? process.env.API_ROOT
    : 'http://localhost:3000'

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
  const { id } = jwt.verify(
    token.slice('Bearer '.length),
    process.env.JWT_SECRET
  )

  return await User.findById(id)
}

async function fetchTitle(url) {
  const res = await fetch(url)

  if (!res.ok) return null

  const $ = cheerio.load(await res.text())
  return $('head > title')
    .text()
    .trim()
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
  fetchTitle,
  validateUrl,
  shortenUrl
}
