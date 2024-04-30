import React from "react"
import container from "../styles/container.module.css"

export default function Container({ selectedMonth, currentDate ,selectedYear,generateCalendarData}) {
    return (
        <div className={container.all}>
            <table className={container.tableAll}>
            <thead >
                <tr key="container" className={container.container}>
                    <th  className={container.containerLi}>
                        一
                    </th>
                    <th  className={container.containerLi}>
                        二
                    </th>
                    <th  className={container.containerLi}>
                        三
                    </th>
                    <th  className={container.containerLi}>
                        四
                    </th>
                    <th  className={container.containerLi}>
                        五
                    </th>
                    <th  className={container.containerLi}>
                        六
                    </th>
                    <th  className={container.containerLi}>
                        日
                    </th>
                </tr>
                </thead>
                {generateCalendarData(selectedYear,selectedMonth )}
            </table>
        </div>
    )
}
