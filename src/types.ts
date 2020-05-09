export type datetimeField = Date
export type timeBased = boolean
export type snapshotBased = boolean

export enum charts {
    bar, pie, mekko,
    scatterPlot, waterfall, line,
    dualAxisLine, bullet, bubbleChart,
    area, stacked
}

export interface record {
    date?: datetimeField
    key?: string
    value?: number | string
    filterable: boolean
}

export interface routePacket {
    endpoint: URL
    marketName: string
    options: Array<string | number>
}

export interface APIResponse {
    viewType: timeBased | snapshotBased
    records: Array<record>
    description: string
    routes?: Array<routePacket>
    acceptableCharts: Array<number>
}
