import { configureStore } from '@reduxjs/toolkit';
import { clickButtonReducer } from './reducers';

export const store = configureStore ({
    reducer: {
        onButtonClickReducer: clickButtonReducer,
    }
});