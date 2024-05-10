import React from "react"
import { MonthList, VacationList, YearList } from "./ContainerData"

export default function CheckOptions(props: { list: Array<VacationList> | Array<YearList> | Array<MonthList> }) {
    return props.list.map(item => {
        return (
            <option value={item.name} className="checkOptions" key={item.name}>
                {item.name}
            </option>
        )
    })
}
