import express from 'express'
import clients from './apiClients'
import apiClients from './apiClients'

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


app.get('/src/:src', cors(corsOptions), async (req, res) => {
    try {
        const api = new clients[req.params.src].api()
        const _res = await api.router(api.endpointsKeys[0].key)
        res.json(_res)
    } catch(e) {
        console.log(e)
        if (e instanceof TypeError) {
            res.status(404).json({
                response: 404,
                errorMessage: "Data source not found"
            })
        } else {
            res.status(500).json({
                response: 500,
                errorMessage
            })
        }
    }
})


app.get('/src/:src/:endpoint', cors(corsOptions), async (req, res) => {
    try {
        const covid = new clients[req.params.src].api()
        const _res = await covid.router(req.params.endpoint)
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