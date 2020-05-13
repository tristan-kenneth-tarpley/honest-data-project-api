import * as covid from './schemas/covid'

export default {
    covid: {
        api: covid.covidAPI,
        name: "USA COVID-19 data",
        description: covid.description,
        source: covid.source,
    }
}