import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // Add user slice here
    },
});

export default store;
