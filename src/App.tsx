import { useState } from "react"
import styles from "./styles/styles.module.css"
import Checkbox from "./components/Checkbox"
import Container from "./components/Container"
import { vacationList, yearList, monthList } from "../src/components/ContainerData.tsx"
import { HolidayUtil, Lunar } from "lunar-typescript"

function App() {
    const [selectedVacation, setSelectedVacation] = useState<number>(1)
    const [selectedYear, setSelectedYear] = useState<number>(2024)
    const [selectedMonth, setSelectedMonth] = useState<number>(4)
    const [selectedRow, setSelectedRow] = useState<number>(-1)
    const [selectedCol, setSelectedCol] = useState<number>(-1)
    // var d = Lunar.fromDate(new Date(2024, 4, 1))
    // var e = HolidayUtil.getHoliday(2024,5,11)
    // console.log(d.getDayInChinese())
    // console.log( e.getName())
    // console.log("关联节日：" + e.getTarget())

    function changeStyle(index: number, rowIndex: number) {
        setSelectedCol(index)
        setSelectedRow(rowIndex)
    }
    type CalendarDataType = {
        date: number
        isSaturday: boolean
        isSunday: boolean
        isHoliday: boolean
        holidayData: string | undefined
        isGrey: boolean
        showLunarData: any
    }
    function generateCalendarData(year: number, month: number) {
        const calendarData: CalendarDataType[][] = [[]]
        const firstDayOfMonth = new Date(year, month - 1, 1)
        const lastDayOfMonth = new Date(year, month, 0)
        const daysInMonth = lastDayOfMonth.getDate()
        const firstDayOfWeek = firstDayOfMonth.getDay() - 1
        let currentDate = 1
        Array(6)
            .fill(0)
            .forEach((_, i) => {
                calendarData[i] = []
                Array(7)
                    .fill(0)
                    .forEach((_, j) => {
                        if (i === 0 && firstDayOfWeek === -1 && j < 6) {
                            const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
                            calendarData[i][j] = {
                                date: prevMonthLastDate - 6 + j + 1,
                                isSaturday: false,
                                isSunday: false,
                                isHoliday: HolidayUtil.getHoliday(year, month - 1, prevMonthLastDate - 6 + j + 2)?.getName() === undefined ? false : true,
                                holidayData: HolidayUtil.getHoliday(year, month - 1, prevMonthLastDate - 6 + j + 2)?.getName(),
                                isGrey: true,
                                showLunarData: Lunar.fromDate(new Date(year, month - 2, prevMonthLastDate - 6 + j + 1)).getDayInChinese()
                            }
                        } else if (i === 0 && j < firstDayOfWeek) {
                            const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
                            calendarData[i][j] = {
                                date: prevMonthLastDate - firstDayOfWeek + j + 1,
                                isSaturday: false,
                                isSunday: false,
                                isHoliday: HolidayUtil.getHoliday(year, month - 1, prevMonthLastDate - firstDayOfWeek + j + 1)?.getName() === undefined ? false : true,
                                holidayData: HolidayUtil.getHoliday(year, month - 1, prevMonthLastDate - firstDayOfWeek + j + 1)?.getName(),
                                isGrey: true,
                                showLunarData: Lunar.fromDate(new Date(year, month - 2, prevMonthLastDate - firstDayOfWeek + j + 1)).getDayInChinese()
                            }
                        } else if (currentDate > daysInMonth) {
                            calendarData[i][j] = {
                                date: currentDate - daysInMonth,
                                isSaturday: false,
                                isSunday: false,
                                isHoliday: HolidayUtil.getHoliday(year, month + 1, currentDate - daysInMonth)?.getName() === undefined ? false : true,
                                holidayData: HolidayUtil.getHoliday(year, month + 1, currentDate - daysInMonth)?.getName(),
                                isGrey: true,
                                showLunarData: Lunar.fromDate(new Date(year, month, currentDate - daysInMonth)).getDayInChinese()
                            }
                            currentDate++
                        } else {
                            calendarData[i][j] = {
                                date: currentDate,
                                isSaturday: false,
                                isSunday: false,
                                isHoliday: HolidayUtil.getHoliday(year, month, currentDate)?.getName() === undefined ? false : true,
                                holidayData: HolidayUtil.getHoliday(year, month, currentDate)?.getName(),
                                isGrey: false,
                                showLunarData: Lunar.fromDate(new Date(year, month, currentDate)).getDayInChinese()
                            }
                            currentDate++
                        }
                        if (j === 5 && i % 2 === 0) {
                            calendarData[i][j].isSaturday = true
                        }
                        if (j === 6) {
                            calendarData[i][j].isSunday = true
                        }
                    })
            })
        return calendarData.map((item, rowIndex) => {
            return (
                <tbody key={`b${rowIndex}`}>
                    <tr key={`a${rowIndex}`}>
                        {item.map((item, index) => {
                            const sunday = item.isSunday ? "sunday" : ""
                            const saturday = item.isSaturday ? "saturday" : ""
                            const holiday = item.isHoliday ? "holiday" : ""
                            const grey = item.isGrey ? "grey" : ""
                            const className = `${styles.containerLi} ${styles[`${sunday}`]} ${styles[`${saturday}`]} ${styles[`${holiday}`]} ${styles[`${grey}`]}`
                            return (
                                <th key={`c${index}`} className={className} onClick={() => changeStyle(index, rowIndex)} style={selectedCol === index && selectedRow === rowIndex ? { backgroundColor: "rgb(103, 171, 226)", color: "white", borderRadius: "5px" } : {}}>
                                    {item.date}
                                    <div className={styles.lunarDay}>{item.isHoliday ? item.holidayData : item.showLunarData}</div>
                                </th>
                            )
                        })}
                    </tr>
                </tbody>
            )
        })
    }
    function handleSelected(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectName = e.target.name
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value)
        if (selectName === "vacation") {
            setSelectedVacation(0)
            const holiday = selectedOptions[0]
            let nowMonth = 0
            let nowDay = 0
            let nowHoliday = 0
            vacationList.map(item => {
                if (item.name === holiday) {
                    nowMonth = item.month
                    nowDay = item.day
                    nowHoliday = item.value
                }
            })
            const nowYear = selectedYear
            setSelectedVacation(nowHoliday)
            setSelectedYear(nowYear)
            setSelectedMonth(nowMonth)
            generateCalendarData(nowYear, nowMonth)
            findDay(nowYear, nowMonth, nowDay)
        } else if (selectName === "year") {
            const useYear = Number(selectedOptions[0])
            setSelectedYear(useYear)
            const nowMonth = selectedMonth
            generateCalendarData(useYear, nowMonth)
        } else {
            const month = e.target.value.replace("月", "")
            const clickMonth = Number(month)
            setSelectedMonth(clickMonth)
        }
    }
    function returnToday() {
        const today = new Date()
        const todayYear = today.getFullYear()
        const todayMonth = today.getMonth() + 1
        const todayDay = today.getDate()
        setSelectedYear(todayYear)
        setSelectedMonth(todayMonth)
        generateCalendarData(todayYear, todayMonth)
        // console.log(todayYear, today.getMonth() + 1, todayDay)
        findDay(todayYear, today.getMonth() + 1, todayDay)
    }
    function findDay(year: number, month: number, day: number) {
        // console.log(selectedCol, selectedRow)
        const inputDate = new Date(year, month, day)
        const firstDayOfMonth = new Date(year, month - 1, 1)
        let row, col
        const firstDayOfWeek = firstDayOfMonth.getDay() - 1
        const dayOfMonth = inputDate.getDate()
        if (firstDayOfWeek === -1) {
            row = Math.floor((firstDayOfWeek + dayOfMonth + 6) / 7)
            col = ((firstDayOfWeek + dayOfMonth) % 7) - 1
        } else {
            row = Math.floor((firstDayOfWeek + dayOfMonth) / 7)
            col = ((firstDayOfWeek + dayOfMonth) % 7) - 1
        }
        changeStyle(col, row)
    }
    // function changeYear(e) {
    //     setSelectedIndex(-1)
    //     setSelectedYear(e)
    //     const nowMonth = selectedMonth
    //     setTimeout(() => {
    //         generateCalendarData(selectedYear, nowMonth)
    //     }, 1000)
    // }
    return (
        <div className={styles.calendar}>
            <div className={styles.container}>
                <Checkbox list={vacationList} value={selectedVacation} handleSelected={handleSelected} />
                {/* <MonthItem selectedYear={selectedYear} onChange={changeYear} /> */}
                <Checkbox list={yearList} value={selectedYear} handleSelected={handleSelected} />
                <Checkbox list={monthList} value={selectedMonth} handleSelected={handleSelected} />
                <button onClick={returnToday}>今天</button>
            </div>
            <div className={styles.content}>
                <div className={styles.contentContainer}>
                    <Container selectedMonth={selectedMonth} selectedYear={selectedYear} generateCalendarData={generateCalendarData} />
                </div>
                <div className={styles.contentDate}></div>
            </div>
        </div>
    )
}

export default App

function getFestival(arg0: string): any {
    throw new Error("Function not implemented.")
}
// 1.看Object,Array  √
// 2.单向数据流，数据和视图 √
// 3.命名  √
// 4.拆组件
//5.array(6).fill(0).foreach() √
//6.strict   加类型 √
//7.tbody太多
//8.直接行和列加状态 √
//Array(6).forEach((_,i)=>console.log(i))
//  -Array(6)生成的是6个空位，forEach()会直接跳过空位，所以没有控制台打印输出
// Array(6).fill(0).forEach((_,i)=>console.log(i))
//  -Array(6)生成6个空位后，fill()会将空位视为正常数组位置填充0，然后进行forEach()
// 不写为+num，而写为Number(num)
