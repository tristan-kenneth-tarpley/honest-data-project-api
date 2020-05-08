import test from './import_test'  

const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express()

console.log('testing 123')
test()
var whitelist: Array<string> = [
  'http://127.0.0.1:5000/', 'http://127.0.0.1:5000',
  'http://localhost:3000/', 'http://localhost:3000',
  'https://honestdata.world/', 'https://honestdata.world'
]

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/', cors(corsOptions), (req, res) => {
    res.json({host: `${req.get('origin') ? req.get('origin') : req.get('host')}`})
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))