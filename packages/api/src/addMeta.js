const algoliasearch = require('algoliasearch')
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN
)

require('dotenv').config()

require('./db')

const index = client.initIndex('gems')

const Gem = require('./models/Gem')

async function main() {
  const gems = (await Gem.find({}).lean()).map(g => {
    g.objectID = g._id
    return g
  })

  console.log(gems)

  index.addObjects(gems, err => {
    if (err) console.log('Error 🔥', err)
    else console.log('Done 🏁')
    process.exit()
  })
}

main()
