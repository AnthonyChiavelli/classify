import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment) 

export default () => (
  <div className="myCustomHeight">
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)