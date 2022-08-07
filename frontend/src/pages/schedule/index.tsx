import React from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'components/calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default () => {
    return (
        <div>
            <div>Calendar</div>
            <Calendar/>
        </div>
    )
}