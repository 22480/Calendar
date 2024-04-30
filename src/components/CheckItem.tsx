import React from "react"

export default function CheckItem(props: { list: { name: string }[] }) {
    return props.list.map(item => {
        return (
            <option value={item.name} className='checkItem' key={item.name}>
                {item.name}
            </option>
        )
    })
}
