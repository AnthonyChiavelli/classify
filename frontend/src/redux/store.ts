import { configureStore } from '@reduxjs/toolkit'
import { uiReducer } from 'redux/slices/ui'
import { eventDetailsReducer } from 'redux/slices/event-details'
import { studentRosterReducer } from 'redux/slices/student-roster'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    eventDetails: eventDetailsReducer,
    studentRoster: studentRosterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
