import React from "react"
import boxItem from "../styles/boxItem.module.css"

export default function CheckItem(props: { list: { name: string }[] }) {
    return props.list.map(item => {
        return (
            <option value={item.name} className={boxItem.checkItem} key={item.name}>
                {item.name}
            </option>
        )
    })
}
