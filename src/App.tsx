import {  useState } from "react"
import styles from "./styles/styles.module.css"
import Checkbox from "./components/Checkbox"
import Container from "./components/Container"
import lunar from "chinese-lunar"
import { vacationList, yearList, monthList } from "../src/components/ContainerData.tsx"

function App() {
    const [selectedVacation, setSelectedVacation] = useState("元旦节")
    const [selectedYear, setSelectedYear] = useState("2024")
    const [selectedMonth, setSelectedMonth] = useState("4月")
    const [selectedIndex, setSelectedIndex] = useState("-1")

    const currentDate = new Date()

    function changeStyle(index, rowIndex) {
        setSelectedIndex(index + "-" + rowIndex)
    }
    function generateCalendarData(year, month_) {
        console.log(year, month_)
        const month = month_.replace("月", "")
        const calendarData = []
        const firstDayOfMonth = new Date(+year, +month - 1, 1)
        const lastDayOfMonth = new Date(+year, +month, 0)
        const daysInMonth = lastDayOfMonth.getDate()
        const firstDayOfWeek = firstDayOfMonth.getDay() - 1
        let currentDate = 1
        Array.from({ length: 6 }).map((_, i) => {
            calendarData[i] = []
            // console.log(i)
            Array.from({ length: 7 }).map((_, j) => {
                if (i === 0 && firstDayOfWeek === -1 && j < 6) {
                    const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
                    // console.log(prevMonthLastDate)
                    calendarData[i][j] =
                        //prevMonthLastDate - firstDayOfWeek + j + 1
                        {
                            date: prevMonthLastDate - 6 + j + 1,
                            isSaturday: false,
                            isSunday: false,
                            isHoliday: false,
                            showLunarData: lunar.solarToLunar(new Date(year, month - 2, prevMonthLastDate - 6 + j + 1))
                        }
                } else if (i === 0 && j < firstDayOfWeek) {
                    const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
                    // console.log(prevMonthLastDate)
                    calendarData[i][j] =
                        //prevMonthLastDate - firstDayOfWeek + j + 1
                        {
                            date: prevMonthLastDate - firstDayOfWeek + j + 1,
                            isSaturday: false,
                            isSunday: false,
                            isHoliday: false,
                            showLunarData: lunar.solarToLunar(new Date(year, month - 2, prevMonthLastDate - firstDayOfWeek + j + 1))
                        }
                } else if (currentDate > daysInMonth) {
                    calendarData[i][j] =
                        //currentDate - daysInMonth
                        //currentDate++
                        {
                            date: currentDate - daysInMonth,
                            isSaturday: false,
                            isSunday: false,
                            isHoliday: false,
                            showLunarData: lunar.solarToLunar(new Date(year, month, currentDate - daysInMonth))
                        }
                    currentDate++
                } else {
                    calendarData[i][j] =
                        //currentDate
                        {
                            date: currentDate,
                            isSaturday: false,
                            isSunday: false,
                            isHoliday: false,
                            showLunarData: lunar.solarToLunar(new Date(`${year}-${month}-${currentDate}`))
                        }
                    currentDate++
                }
                if (j === 5 && i % 2 === 0) {
                    calendarData[i][j].isSaturday = true
                    // console.log(calendarData[i][j])
                }
                if (j === 6) {
                    calendarData[i][j].isSunday = true
                }
            })
        })
        // console.log(calendarData)
        return calendarData.map((items, rowIndex) => {
            return (
                <tbody key={`b${rowIndex}`}>
                    <tr key={`a${rowIndex}`}>
                        {items.map((item, index) => {
                            const sunday = item.isSunday ? "sunday" : ""
                            const saturday = item.isSaturday ? "saturday" : ""
                            const holiday = item.isHoliday ? "holiday" : ""
                            const className = `${styles.containerLi} ${styles[`${sunday}`]} ${styles[`${saturday}`]} ${styles[`${holiday}`]}`
                            return (
                                <th key={`c${index}`} className={className} onClick={() => changeStyle(index, rowIndex)} style={selectedIndex === index + "-" + rowIndex ? { backgroundColor: "rgb(103, 171, 226)", color: "white" } : {}}>
                                    {item.date}
                                    <div className={styles.lunarDay}>{item.showLunarData.day}</div>
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
            const holiday = selectedOptions[0]
            let nowMonth
            let nowDay 
            vacationList.map(item => {
                if (item.name === holiday) {
                    nowMonth = item.month
                    nowDay = item.day
                }
            })
            const nowYear = selectedYear
            console.log(nowYear)
            console.log(nowMonth)
            setSelectedVacation(holiday)
            setSelectedYear(nowYear + "")
            setSelectedMonth(nowMonth)
            generateCalendarData(nowYear, nowMonth)
            const month = nowMonth.replace("月", "")
            findDay(+nowYear, +month, nowDay)
        } else if (selectName === "year") {
            const useYear = selectedOptions[0].toString()
            setSelectedYear(useYear)
            const nowMonth = selectedMonth
            generateCalendarData(useYear, nowMonth)
        } else {
            const clickMonth = e.target.value
            console.log(clickMonth)
            setSelectedMonth(clickMonth)
        }
        setSelectedIndex("-1")
    }
    function returnToday() {
        const today = new Date()
        // console.log(today)
        const todayYear = today.getFullYear()
        const todayMonth = today.getMonth() + 1 + "月"
        console.log(todayMonth)
        const todayDay = today.getDate()
        console.log(todayDay)
        setSelectedYear(todayYear + "")
        setSelectedMonth(todayMonth)
        generateCalendarData(todayYear, todayMonth)
        findDay(todayYear, today.getMonth() + 1, todayDay)
    }
    function returnHoliday() {}
    function findDay(year, month, day) {
        const inputDate = new Date(year, month, day)
        const firstDayOfMonth = new Date(+year, +month - 1, 1)
        const lastDayOfMonth = new Date(+year, +month, 0)
        const firstDayOfWeek = firstDayOfMonth.getDay() - 1
        console.log(firstDayOfWeek)
        const dayOfMonth = inputDate.getDate()
        console.log(dayOfMonth)
        let row = Math.floor((firstDayOfWeek + dayOfMonth) / 7)
        let col = ((firstDayOfWeek + dayOfMonth) % 7) - 1
        changeStyle(col, row)
        console.log(col, row)
    }

    return (
        <div className={styles.calendar}>
            <div className={styles.container}>
                <Checkbox list={vacationList} value={selectedVacation} handleSelected={handleSelected} />
                <Checkbox list={yearList} value={selectedYear} handleSelected={handleSelected} />
                <Checkbox list={monthList} value={selectedMonth} handleSelected={handleSelected} />
                <button onClick={returnToday}>今天</button>
            </div>
            <div className={styles.content}>
                <div className={styles.contentContainer}>
                    <Container selectedMonth={selectedMonth} selectedYear={selectedYear} currentDate={currentDate} generateCalendarData={generateCalendarData} />
                </div>
                <div className={styles.contentDate}></div>
            </div>
        </div>
    )
}

export default App
