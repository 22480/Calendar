import React, { FC } from "react"
import box from "../styles/box.module.css"
import CheckItem from "./CheckItem"


export default function Checkbox({ list,value, handleSelected}) {
  
    return (
        <select name={list[0].type} value={value} className={box.dropdown} onChange={handleSelected}>
            <CheckItem list={list} />
        </select>
    )
}
