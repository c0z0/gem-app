const secrets = require('./secrets.json')
const fetch = require('isomorphic-fetch')
const crypto = require('crypto')

const apiRoot =
  process.env.NODE_ENV === 'production'
    ? process.env.API_ROOT
    : 'http://localhost:4000'

function generateSecret() {
  let adjective =
    secrets.adjectives[Math.floor(Math.random() * secrets.adjectives.length)]
  let animal =
    secrets.animals[Math.floor(Math.random() * secrets.animals.length)]

  animal = animal[0].toUpperCase() + animal.slice(1)
  adjective = adjective[0].toUpperCase() + adjective.slice(1)
  return adjective + ' ' + animal
}

async function sendEmail({to, token, verificationCode}) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SG_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{to: [{email: to}]}],
      from: {email: 'gem@cserdean.me'},
      subject: `Gem Login Verification (code: ${verificationCode})`,
      content: [
        {
          type: 'text/html',
          value: `To complete the login process access <a href="${apiRoot}/v/${token}">this link</a>`,
        },
      ],
    }),
  })

  if (res.ok) return
  throw new Error('Email sending failed')
}

function generateId(len = 10) {
  return crypto.randomBytes(Math.floor(len / 2)).toString('hex')
}

module.exports = {generateSecret, sendEmail, generateId, apiRoot}
