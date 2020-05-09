
import fetch from 'node-fetch'
import {APIResponse, datetimeField, uid, viewTypes} from '../types'
import honestAPI from './honestAPI'

interface covidRecords {
    state: string,
    positive: number,
    positiveScore: number,
    negativeScore: number,
    negativeRegularScore: number,
    commercialScore: number,
    grade: never, // will be deprecated
    score: number,
    notes: string,
    dataQualityGrade: string, // use this one
    negative: number,
    pending: number | null,
    hospitalizedCurrently: number | null,
    hospitalizedCumulative: number | null,
    inIcuCurrently: number | null,
    inIcuCumulative: number | null,
    onVentilatorCurrently: number | null,
    onVentilatorCumulative: number | null,
    recovered: number | null,
    lastUpdateEt: datetimeField,
    checkTimeEt: datetimeField,
    death: number | null,
    hospitalized: number | null,
    total: number | null, // will be deprecated
    totalTestResults: number | null, // use this one
    posNeg: number | null,
    fips: string,
    dateModified: datetimeField,
    dateChecked: datetimeField,
    hash: uid
}

export const description: string = `The COVID Tracking Project is a volunteer organization launched from The Atlantic and dedicated to collecting and publishing the data required to understand the COVID-19 outbreak in the United States.`

export const source: string = `https://covidtracking.com, a project by The Atlantic.`

export class covidAPI extends honestAPI {
    base_url: string
    version: string
    file_type: string

    constructor() {
        super()
        this.version = 'v1'
        this.base_url = `https://covidtracking.com/api/${this.version}/`
        this.file_type = '.json'
    }

    mapToSchema(data: any) {
        const returned: APIResponse = {
            viewType: viewTypes.timeBased,
            description,
            source,
            records: data.map((d: covidRecords) => {
                return {
                    state: d.state,
                    positive: d.positive,
                    positiveScore: d.positiveScore,
                    negativeScore: d.negativeScore,
                    negativeRegularScore: d.negativeRegularScore,
                    commercialScore: d.commercialScore,
                    grade: "flag", // dep
                    score: d.score,
                    notes: "internal",
                    dataQualityGrade: d.dataQualityGrade,
                    negative: d.negative,
                    pending: d.pending,
                    hospitalizedCurrently: d.hospitalizedCurrently,
                    hospitalizedCumulative: d.hospitalizedCumulative,
                    inIcuCurrently: d.inIcuCurrently,
                    inIcuCumulative: d.inIcuCumulative,
                    onVentilatorCurrently: d.onVentilatorCurrently,
                    onVentilatorCumulative: d.onVentilatorCumulative,
                    recovered: d.recovered,
                    date: d.lastUpdateEt,
                    checkTimeEt: d.checkTimeEt,
                    death: d.death,
                    hospitalized: d.hospitalized,
                    total: "flag", // dep
                    totalTestResults: d.totalTestResults,
                    posNeg: d.posNeg,
                    fips: d.fips,
                    dateModified: d.dateModified,
                    dateChecked: d.dateChecked,
                    uid: d.hash
                }
            })
        }
        
        return returned 
    }

    formUrl(endpoint: string){
        return (this.base_url + endpoint + this.file_type)
    }

    async pack(endpoint: string){
        const res = await this.send(this.formUrl(endpoint), this.mapToSchema)
        return res
    }

    async currentStateData(){
        const res = await this.pack('states/current')
        return res
    }

    async historicStateData(){
        const res = await this.pack('states/daily')
        return res
    }

    async currentUSData(){
        const res = await this.pack('us/current')
        return res
    }

    async historicUSData(){
        const res = await this.pack('us/daily')
        return res
    }

}
