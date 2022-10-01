import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'tasks',
  initialState: {
    loading: false,
    tasks: [],
    error: ""
  },
  reducers: {
    increment: state => {
      state.tasks = state.tasks.push(state.tasks.length + 1)
    },
  }
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions

export default counterSlice.reducer