import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'

interface UIState {
  sidebarOpen: boolean
}

const initialState: UIState = {
  sidebarOpen: false,
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
  },
})

export const { setSidebarOpen, setSidebarClosed, toggleSidebar } = uiSlice.actions

export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen

export const uiReducer = uiSlice.reducer
