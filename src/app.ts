import express from 'express'
import clients from './clients'

export const cors = require('cors')
export const app = express()
const PORT = process.env.PORT || 5000

const whitelist: Array<string> = [
    'http://127.0.0.1:5000/', 'http://127.0.0.1:5000',
    'http://localhost:3000/', 'http://localhost:3000',
    'https://honestdata.world/', 'https://honestdata.world'
]

const errorMessage: string = "It's not you, it's me..."
  
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.get('/', cors(corsOptions), (req, res) => {
    res.status(403).json({
    error: 403,
    type: "Access forbidden",
    message: "Index route is unavailable"
    });
})

app.get('/status', cors(corsOptions), (req, res) => {
    res.status(200).json({
        status: 200,
        message: "You're all ready!"
    })
})

app.get('/src/covid', cors(corsOptions), async (req, res) => {
    try {
        const covid = new clients.covidAPI()
        const _res = await covid.currentStateData()
        res.json(_res)
    } catch(e) {
        console.log(e)
        res.status(500).json({
            response: 500,
            errorMessage
        })
    }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))