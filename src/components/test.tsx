import React from 'react'
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import dayOfYear from  'dayjs/plugin/dayOfYear';

dayjs.extend(weekday);
dayjs.extend(dayOfYear)
export default function Test() {
    const d = new Date(2024,5,10)
    const e = new Date('2024-05-10')
    const now = dayjs(new Date(2024,4,9)).startOf('year')
    const now2 = dayjs(e)
    console.log(now) //2024.6.10
    // console.log(now2) //2024.5.10
    const day = dayjs().second(30).valueOf()
    // console.log(day)
  return (
    <div>{day}</div>
  )
}

