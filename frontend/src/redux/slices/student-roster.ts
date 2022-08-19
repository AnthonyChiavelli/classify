import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'
import IStudent from 'types/student'

interface StudentRosterState {
  students: IStudent[]
}

const initialState: StudentRosterState = {
  students: [
    {
      firstName: 'Bronco',
      lastName: 'Basilicous',
      familyId: 'Basilicous',
      school: 'Banana Institute',
      areasOfConcern: [],
      id: '12345',
      gradeLevel: 8,
    },
    {
      firstName: 'Grumpus',
      lastName: 'Humpner',
      familyId: 'Jarles',
      school: 'Mango School',
      areasOfConcern: [],
      id: '12346',
      gradeLevel: 8,
    },
  ],
}

export const studentRosterSlice = createSlice({
  name: 'StudentRoster',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<StudentRosterState['students']>) => {
      state.students = action.payload
    },
  },
})

export const { setStudents } = studentRosterSlice.actions
export const studentRosterReducer = studentRosterSlice.reducer
export const selectStudentRoster = (state: RootState) => state.studentRoster.students
