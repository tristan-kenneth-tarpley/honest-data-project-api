export type datetimeField = Date
export type uid = string

export type recordFields = datetimeField | string | number | boolean | uid
export interface record {
    [key: string]: recordFields
}

export enum viewTypes {
    timeSeries, categorized
}

export interface APIResponse {
    endpoints?: Array<endpointsKeys>
    title: string
    source: string
    records: Array<record>
    description: string
    acceptableCharts?: Array<number>
}


export enum dataTypes {
    location, score, dateTime, metricLowIsGood, metricLowIsBad
}
export interface APIField {
    dataType: dataTypes
    value: string | number | null | undefined
}


export interface endpointsKeys {
    key: string,
    active: boolean
}