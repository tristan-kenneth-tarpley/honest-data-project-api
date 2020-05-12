import fetch from 'node-fetch'
import {APIResponse, viewTypes, charts, dataTypes} from '../types'

export default class honestAPI {
    async send(url: string, mapToSchema: ((data: any) => APIResponse)) {
        const res = await fetch(url)
        const json = await res.json()
        const mapped = mapToSchema(json)
        mapped['viewTypes'] = viewTypes
        mapped['charts'] = charts
        mapped['dataTypes'] = dataTypes

        return mapped
    }
}

/*
subClass Blueprint--

class ___ extends honestAPI {
    ****
    define any api specific properties (endpoints, filetypes, etc.)
    ****

    constructor(){
        super()
        this.base_url = ...
    }

    mapToSchema(data: any) {
        const returned: APIResponse = {

        }

        return returned
    }

    formUrl() { // just packs up the url
        e.g. return (this.base_url + endpoint + this.file_type)
    }

    // packs up the response
    async pack(endpoint: string){
        const res = await this.send(this.formUrl(endpoint), this.mapToSchema)
        return res
    }

    forEach endpoint:
    async currentStateData(){
        const res = await this.pack('states/current')
        return res
    }
}

*/