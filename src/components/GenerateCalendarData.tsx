// import React from 'react'
// import styles from "../styles/styles.module.css"
// import { HolidayUtil, Lunar } from "lunar-typescript"
// import  changeStyle, from "../App"


// type CalendarDataType = {
//     date: number
//     isSaturday: boolean
//     isSunday: boolean
//     isHoliday: boolean
//     isGrey: boolean
//     showLunarData: any
// }
// export default function generateCalendarData(year: number, month: number) {
//     const calendarData: CalendarDataType[][] = [[]]
//     const firstDayOfMonth = new Date(year, month - 1, 1)
//     const lastDayOfMonth = new Date(year, month, 0)
//     const daysInMonth = lastDayOfMonth.getDate()
//     const firstDayOfWeek = firstDayOfMonth.getDay() - 1
//     let currentDate = 1
//     Array(6).fill(0).forEach((_, i) => {
//         calendarData[i] = []
//         Array(7).fill(0).forEach((_, j) => {
//             if (i === 0 && firstDayOfWeek === -1 && j < 6) {
//                 const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
//                 calendarData[i][j] = {
//                     date: prevMonthLastDate - 6 + j + 1,
//                     isSaturday: false,
//                     isSunday: false,
//                     isHoliday: false,
//                     isGrey: true,
//                     showLunarData: Lunar.fromDate(new Date(year, month - 2, prevMonthLastDate - 6 + j + 1)).getDayInChinese()
//                 }
//             } else if (i === 0 && j < firstDayOfWeek) {
//                 const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
//                 calendarData[i][j] = {
//                     date: prevMonthLastDate - firstDayOfWeek + j + 1,
//                     isSaturday: false,
//                     isSunday: false,
//                     isHoliday: false,
//                     isGrey: true,
//                     showLunarData: Lunar.fromDate(new Date(year, month - 2, prevMonthLastDate - 6 + j + 1)).getDayInChinese()
//                 }
//             } else if (currentDate > daysInMonth) {
//                 calendarData[i][j] = {
//                     date: currentDate - daysInMonth,
//                     isSaturday: false,
//                     isSunday: false,
//                     isHoliday: false,
//                     isGrey: true,
//                     showLunarData: Lunar.fromDate(new Date(year, month, currentDate - daysInMonth)).getDayInChinese()
//                 }
//                 currentDate++
//             } else {
//                 calendarData[i][j] = {
//                     date: currentDate,
//                     isSaturday: false,
//                     isSunday: false,
//                     isHoliday: false,
//                     isGrey: false,
//                     showLunarData: Lunar.fromDate(new Date(`${year}-${month}-${currentDate}`)).getDayInChinese()
//                 }
//                 currentDate++
//             }
//             if (j === 5 && i % 2 === 0) {
//                 calendarData[i][j].isSaturday = true
//             }
//             if (j === 6) {
//                 calendarData[i][j].isSunday = true
//             }
//         })
//     })
//     return calendarData.map((items, rowIndex) => {
//         return (
//             <tbody key={`b${rowIndex}`}>
//                 <tr key={`a${rowIndex}`}>
//                     {items.map((item, index) => {
//                         const sunday = item.isSunday ? "sunday" : ""
//                         const saturday = item.isSaturday ? "saturday" : ""
//                         const holiday = item.isHoliday ? "holiday" : ""
//                         const grey = item.isGrey ? "grey" : ""
//                         const className = `${styles.containerLi} ${styles[`${sunday}`]} ${styles[`${saturday}`]} ${styles[`${holiday}`]} ${styles[`${grey}`]}`
//                         return (
//                             <th key={`c${index}`} className={className} onClick={() => changeStyle(index, rowIndex)} style={selectedCol === index && selectedRow === rowIndex ? { backgroundColor: "rgb(103, 171, 226)", color: "white", borderRadius: "5px" } : {}}>
//                                 {item.date}
//                                 <div className={styles.lunarDay}>{item.showLunarData}</div>
//                             </th>
//                         )
//                     })}
//                 </tr>
//             </tbody>
//         )
//     })
// }