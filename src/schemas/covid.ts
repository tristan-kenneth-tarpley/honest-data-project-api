import {APIResponse, uid, viewTypes, APIField, dataTypes} from '../types'
import honestAPI from './honestAPI'

interface covidRecords {
    state: APIField
    positive: APIField
    score: APIField
    notes: APIField
    dataQualityGrade: APIField
    negative: APIField
    pending: APIField
    hospitalizedCurrently: APIField
    hospitalizedCumulative: APIField
    inIcuCurrently: APIField
    inIcuCumulative: APIField
    onVentilatorCurrently: APIField
    onVentilatorCumulative: APIField
    recovered: APIField
    lastUpdateEt: APIField
    checkTimeEt: APIField
    death: APIField
    hospitalized: APIField
    totalTestResults: APIField
    posNeg: APIField
    fips: APIField
    dateModified: APIField
    dateChecked: APIField
    hash: uid
}

export const description: string = `The COVID Tracking Project is a volunteer organization launched from The Atlantic and dedicated to collecting and publishing the data required to understand the COVID-19 outbreak in the United States.`
export const source: string = `https://covidtracking.com`

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
            title: "COVID-19",
            viewType: viewTypes.timeBased,
            description,
            source,
            records: data.map((d: covidRecords) => {
                return {
                    state: {
                        dataType: dataTypes.location,
                        value: d.state
                    },
                    positive: {
                        viewType: viewTypes.timeBased,
                        value: d.positive
                    },
                    dataQualityGrade: {
                        dataType: dataTypes.location,
                        value: d.dataQualityGrade
                    },
                    negative: {
                        dataType: dataTypes.location,
                        value: d.negative
                    },
                    pending: {
                        dataType: dataTypes.location,
                        value: d.pending
                    },
                    hospitalizedCurrently: {
                        dataType: dataTypes.location,
                        value: d.hospitalizedCurrently
                    },
                    hospitalizedCumulative: {
                        dataType: dataTypes.location,
                        value: d.hospitalizedCumulative
                    },
                    inIcuCurrently: {
                        dataType: dataTypes.location,
                        value: d.inIcuCurrently
                    },
                    inIcuCumulative: {
                        dataType: dataTypes.location,
                        value: d.inIcuCumulative
                    },
                    onVentilatorCurrently: {
                        dataType: dataTypes.location,
                        value: d.onVentilatorCurrently
                    },
                    onVentilatorCumulative: {
                        dataType: dataTypes.location,
                        value: d.onVentilatorCumulative
                    },
                    recovered: {
                        dataType: dataTypes.location,
                        value: d.recovered
                    },
                    dateLastUpdated: {
                        dataType: dataTypes.location,
                        value: d.lastUpdateEt
                    },
                    dateLastChecked: {
                        dataType: dataTypes.location,
                        value: d.checkTimeEt
                    },
                    death: {
                        dataType: dataTypes.location,
                        value: d.death
                    },
                    hospitalized: {
                        dataType: dataTypes.location,
                        value: d.hospitalized
                    },
                    totalTestResults: {
                        dataType: dataTypes.location,
                        value: d.totalTestResults
                    },
                    dateModified: {
                        dataType: dataTypes.location,
                        value: d.dateModified
                    },
                    dateChecked: {
                        dataType: dataTypes.location,
                        value: d.dateChecked
                    },
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
