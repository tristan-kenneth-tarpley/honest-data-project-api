import honestAPI from './honestAPI'
import {APIResponse, uid, viewTypes, APIField, dataTypes} from '../types'
import {endpointsKeys} from '../types'

export const description: string = `The COVID Tracking Project is a volunteer organization launched from The Atlantic and dedicated to collecting and publishing the data required to understand the COVID-19 outbreak in the United States.`
export const source: string = `https://covidtracking.com`

export class covidAPI extends honestAPI {
    protected readonly endpoints: any
    protected activeEndpoint: string
    readonly base_url: string
    readonly version: string
    readonly file_type: string
    readonly endpointsKeys: Array<endpointsKeys>
    readonly src: string

    constructor() {
        super()
        this.version = 'v1'
        this.base_url = `https://covidtracking.com/api/${this.version}/`
        this.file_type = '.json'
        this.src = 'covid'
        this.endpoints = {
            currentStateData: this.currentStateData,
            currentUSData: this.currentUSData,
            historicStateData: this.historicStateData,
            historicUSData: this.historicUSData,
        }

        this.endpointsKeys = Object.keys(this.endpoints).map(key=>{
            return {
                key,
                active: false
            }
        })
    }

    mapToSchema(data: any) {
        const nonviewableKeys: Array<string> = [
            'hash', 'positiveScore', 'negativeScore', 'notes', 'dateChecked',
            'negativeRegularScore', 'commercialScore', 'score', 'grade', 'total'
        ]
        const parseDate = (dateInt) => {
            let date = (dateInt).toString()
            const year = parseInt(date.slice(0,4))
            const month = parseInt(date.substring(4, 6)) - 1
            const day = date.slice(6, 8)
            return new Date(year, month, day).toLocaleDateString()
        }
        const returned: APIResponse = {
            title: "COVID-19",
            description,
            source,
            records: data.map((d: string) => {
                const filteredKeys = Object.keys(d).filter(key => !nonviewableKeys.includes(key))
                let empty = {}
                for (let key of filteredKeys) {
                    if (key === 'date') {
                        empty = {...empty, [key]: parseDate(d[key])}
                        continue
                    }
                    empty = {...empty, [key]: d[key]}
                }
                return empty
            })
        }
        
        return returned 
    }

    buildURL(endpoint: string, __endpoint: string){
        this.activeEndpoint = __endpoint // basically caching this call so the frontend can know which endpoint is active
        return (this.base_url + endpoint + this.file_type)
    }

    async currentStateData(){
        const res = await this.send(
            this.buildURL('states/current', 'currentStateData'), 
            this.mapToSchema,
            viewTypes.categorized
        )
        return res
    }

    async historicStateData(){
        this.activeEndpoint = 'historicStateData'
        const res = await this.send(
            this.buildURL('states/daily', 'historicStateData'),
            this.mapToSchema,
            viewTypes.timeSeries
        )
        return res
    }

    async currentUSData(){
        this.activeEndpoint = 'currentUSData'
        const res = await this.send(
            this.buildURL('us/current', 'currentUSData'),
            this.mapToSchema,
            viewTypes.categorized
        )
        return res
    }

    async historicUSData(){
        this.activeEndpoint = 'historicUSData'
        const res = await this.send(
            this.buildURL('us/daily', 'historicUSData'),
            this.mapToSchema,
            viewTypes.timeSeries
        )
        return res
    }

}
