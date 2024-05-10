import React, { FC } from "react"
import box from "../styles/box.module.css"
import { MonthList, VacationList, YearList } from "./ContainerData"
import CheckOptions from "./CheckOptions"

interface CheckboxProps {
    list: Array<VacationList> | Array<YearList> | Array<MonthList>
    value: number | string
    handleSelected: (value: React.ChangeEvent<HTMLSelectElement>) => void
}
export default function Checkbox(props: CheckboxProps) {
    let { list, value, handleSelected } = props
    let arr
    console.log(value)
    switch (list[0].type) {
        case "vacation":
            arr = list.filter(item => item.value === value)
            value = arr[0].name
            break
        case "year":
            arr = list.filter(item => item.value === value)
            value = arr[0].name
            break
        case "month":
            arr = list.filter(item => item.value === value)
            value = arr[0].name
            break
        default:
            console.log("出错")
    }

    return (
        <select name={list[0].type} value={value} className={box.dropdown} onChange={handleSelected}>
            <CheckOptions list={list} />
        </select>
    )
}
