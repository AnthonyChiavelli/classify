import { configureStore } from '@reduxjs/toolkit'
import { uiReducer } from 'redux/slices/ui'
import { eventDetailsReducer } from 'redux/slices/event-details'
import { studentRosterReducer } from 'redux/slices/student-roster'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/root'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    eventDetails: eventDetailsReducer,
    studentRoster: studentRosterReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware)
  },
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
