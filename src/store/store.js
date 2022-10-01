import { configureStore } from '@reduxjs/toolkit'

import tasksReducer from './slices/tasks/tasksSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    },
})