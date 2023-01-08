import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'

interface UIState {
  sidebarOpen: boolean
  studentAddModalOpen: boolean
  messageDialogState: {
    open: boolean
    title?: string
    message?: string
    confirm?: boolean
  }
}

const initialState: UIState = {
  sidebarOpen: false,
  studentAddModalOpen: false,
  messageDialogState: {
    open: false,
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarOpen: (state) => {
      state.sidebarOpen = true
    },
    setSidebarClosed: (state) => {
      state.sidebarOpen = false
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setStudentAddModalOpen: (state, action) => {
      state.studentAddModalOpen = action.payload.open
    },
    setMessageDialogOpenState: (state, action) => {
      state.messageDialogState = action.payload
    },
  },
})

export const { setSidebarOpen, setSidebarClosed, toggleSidebar, setStudentAddModalOpen, setMessageDialogOpenState } =
  uiSlice.actions

export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen
export const selectStudentAddModalOpen = (state: RootState) => state.ui.studentAddModalOpen
export const selelectMessageDialogState = (state: RootState) => state.ui.messageDialogState

export const uiReducer = uiSlice.reducer
