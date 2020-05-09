
import fetch from 'node-fetch'
import {APIResponse, charts} from '../types'

export class covidAPI {
    base_url: string
    version: string
    file_type: string
    schema: APIResponse
    

    constructor() {
        this.version = 'v1'
        this.base_url = `https://covidtracking.com/api/${this.version}/`
        this.file_type = '.json' // duh
    }

    async currentStateData(){
        const endpoint: string = 'states/current'
        const res = await this.send(endpoint)
        return res
    }

    async historicStateData(){
        const endpoint: string = 'states/daily'
        const res = await this.send(endpoint)
        return res
    }

    async currentUSData(){
        const endpoint: string = 'us/current'
        const res = await this.send(endpoint)
        return res
    }

    async historicUSData(){
        const endpoint: string = 'us/daily'
        const res = await this.send(endpoint)
        return res
    }


    async send(endpoint: string) {
        const res = await fetch(this.base_url + endpoint + this.file_type)
        const json = await res.json()

        return json
    }
}
