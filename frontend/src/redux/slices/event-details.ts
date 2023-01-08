import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'
import { IAttendingStudent } from 'types/attending-student'

interface EventDetailsState {
  eventType: 'class' | 'consultation'
  classType: 'individual' | 'group'
  students: { [k: string]: IAttendingStudent }
  parentName?: string
  discoveryChannel?: string
  consultationChannel?: string
}

const initialState: EventDetailsState = {
  eventType: 'class',
  classType: 'individual',
  students: {},
  parentName: '',
  discoveryChannel: '',
  consultationChannel: '',
}

export const eventDetailsSlice = createSlice({
  name: 'EventDetails',
  initialState,
  reducers: {
    setEventType: (state, action: PayloadAction<EventDetailsState['eventType']>) => {
      state.eventType = action.payload
    },
    setClassType: (state, action: PayloadAction<EventDetailsState['classType']>) => {
      state.classType = action.payload
      if (action.payload === 'individual' && Object.keys(state.students).length > 0) {
        state.students = { [Object.keys(state.students)[0]]: state.students[Object.keys(state.students)[0]] }
      }
    },
    addStudent: (state, action: PayloadAction<string>) => {
      if (!(action.payload in state.students)) {
        state.students[action.payload] = {
          studentId: action.payload,
          absent: false,
          charge: 0,
        }
      }
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      delete state.students[action.payload]
    },
    setParentName: (state, action: PayloadAction<string>) => {
      state.parentName = action.payload
    },
    setDiscoveryChannel: (state, action: PayloadAction<string>) => {
      state.discoveryChannel = action.payload
    },
    setConsultationChannel: (state, action: PayloadAction<string>) => {
      state.consultationChannel = action.payload
    },
    updateStudentCharge: (state, action: PayloadAction<{ studentId: string; charge: number }>) => {
      state.students[action.payload.studentId].charge = action.payload.charge
    },
    updateStudentAbsense: (state, action: PayloadAction<{ studentId: string; absent: boolean }>) => {
      state.students[action.payload.studentId].absent = action.payload.absent
      state.students[action.payload.studentId].charge = 0
    },
  },
})

export const {
  setEventType,
  setClassType,
  addStudent,
  removeStudent,
  updateStudentCharge,
  updateStudentAbsense,
  setParentName,
  setDiscoveryChannel,
  setConsultationChannel,
} = eventDetailsSlice.actions
export const eventDetailsReducer = eventDetailsSlice.reducer
export const selectEventType = (state: RootState) => state.eventDetails.eventType
export const selectClassType = (state: RootState) => state.eventDetails.classType
export const selectParentName = (state: RootState) => state.eventDetails.parentName
export const selectDiscoveryChannel = (state: RootState) => state.eventDetails.discoveryChannel
export const selectConsultationChannel = (state: RootState) => state.eventDetails.consultationChannel
export const selectSelectedStudents = (state: RootState) =>
  Object.keys(state.eventDetails.students)
    .map((studentId) => state.studentRoster.students.find((stud) => stud._id === studentId))
    .filter((s) => s)
export const selectAttendingStudentById = (state: RootState, studentId: string) =>
  state.eventDetails.students[studentId]
