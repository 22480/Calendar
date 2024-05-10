import React from "react"

export type VacationList = {
    type: string
    name: string
    value: number
    month: number
    day: number
}
export type YearList = {
    type: string
    name: number
    value: number
}
export type MonthList = {
    type: string
    name: string
    value: number
}
export const vacationList: Array<VacationList> = [
    {
        type: "vacation",
        name: "元旦节",
        value: 1,
        month: 1,
        // year:''
        day: 1
    },
    {
        type: "vacation",
        name: "春节",
        value: 2,
        month: 2,
        // year:''
        day: 10
    },
    {
        type: "vacation",
        name: "清明节",
        value: 3,
        month: 4,
        // year:''
        day: 4
    },
    {
        type: "vacation",
        name: "劳动节",
        value: 4,
        month: 5,
        day: 1
    },
    {
        type: "vacation",
        name: "端午节",
        value: 5,
        month: 6,
        // year:''
        day: 10
    },
    {
        type: "vacation",
        name: "中秋节",
        value: 6,
        month: 9,
        // year:''
        day: 17
    },
    {
        type: "vacation",
        name: "国庆节",
        value: 7,
        month: 10,
        day: 1
    }
]
export const yearList: Array<YearList> = [
    {
        type: "year",
        name: 2024,
        value: 2024
    },
    {
        type: "year",
        name: 2025,
        value: 2025
    },
    {
        type: "year",
        name: 2026,
        value: 2026
    },
    {
        type: "year",
        name: 2027,
        value: 2027
    },
    {
        type: "year",
        name: 2028,
        value: 2028
    }
]
export const monthList: Array<MonthList> = [
    {
        type: "month",
        name: "1月",
        value: 1
    },
    {
        type: "month",
        name: "2月",
        value: 2
    },
    {
        type: "month",
        name: "3月",
        value: 3
    },
    {
        type: "month",
        name: "4月",
        value: 4
    },
    {
        type: "month",
        name: "5月",
        value: 5
    },
    {
        type: "month",
        name: "6月",
        value: 6
    },
    {
        type: "month",
        name: "7月",
        value: 7
    },
    {
        type: "month",
        name: "8月",
        value: 8
    },
    {
        type: "month",
        name: "9月",
        value: 9
    },
    {
        type: "month",
        name: "10月",
        value: 10
    },
    {
        type: "month",
        name: "11月",
        value: 11
    },
    {
        type: "month",
        name: "12月",
        value: 12
    }
]
