  
const express = require('express')
const PORT = process.env.PORT || 5000

const app = express()
const test_var: number = 1

app.get('/', (req, res) => res.send(req.get('host')))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))