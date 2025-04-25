import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice.js'

export const store = configureStore({
    reducer: {
        crypto : cryptoReducer
    }
})