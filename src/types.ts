export type datetimeField = Date
export type uid = string

export type recordFields = datetimeField | string | number | boolean | uid
export interface record {
    [key: string]: recordFields
}

export enum viewTypes {
    timeBased, snapshotBased
}

export interface APIResponse {
    endpoints?: Array<string>
    title: string
    viewType: viewTypes // see viewTypes enum
    source: string
    records: Array<record>
    description: string
    acceptableCharts?: Array<number>
}



export enum charts {
    bar, pie, treeMap,
    scatterPlot, waterfall, line,
    dualAxisLine, bullet, bubbleChart,
    area, stacked
}
export enum dataTypes {
    location, score, dateTime, metricLowIsGood, metricLowIsBad
}
export interface APIField {
    dataType: dataTypes
    value: string | number | null | undefined
}