export type datetimeField = Date
export type uid = string

export enum charts {
    bar, pie, mekko,
    scatterPlot, waterfall, line,
    dualAxisLine, bullet, bubbleChart,
    area, stacked
}

export enum viewTypes {
    timeBased, snapshotBased
}

export interface routePacket {
    endpoint: URL
    marketName: string
    options: Array<string | number>
}


export type recordFields = datetimeField | string | number | boolean | uid
export interface record {
    [key: string]: recordFields
}

export interface APIResponse {
    title: string
    viewType: viewTypes // see viewTypes enum
    source: string
    records: Array<record>
    description: string
    routes?: Array<routePacket>
    acceptableCharts?: Array<number>
}
