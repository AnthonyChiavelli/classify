import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'
import IStudent from 'types/student'

interface StudentRosterState {
  students: IStudent[]
}

const initialState: StudentRosterState = {
  students: [],
}

export const studentRosterSlice = createSlice({
  name: 'StudentRoster',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<StudentRosterState['students']>) => {
      state.students = action.payload
    },
    addNewlyCreatedStudents: (state, action: PayloadAction<IStudent[]>) => {
      state.students = [...action.payload, ...state.students]
    },
    removeDeletedStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter((s: IStudent) => s._id !== action.payload)
    },
  },
})

export const { setStudents, addNewlyCreatedStudents, removeDeletedStudent } = studentRosterSlice.actions
export const studentRosterReducer = studentRosterSlice.reducer
export const selectStudentRoster = (state: RootState) => state.studentRoster.students
