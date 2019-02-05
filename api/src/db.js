const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, err => {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('🗄  Connected to DB')
})
