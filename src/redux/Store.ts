import { configureStore } from '@reduxjs/toolkit';
import clientManagerSlice from './slices/ClientManager.slice';
import jobManagerSlice from './slices/JobManager.slice';
import sortingSlice from './slices/Sorting.slice';

const store = configureStore({
    reducer: {
        clientManager: clientManagerSlice,
        jobManager: jobManagerSlice,
        sorting: sortingSlice,
    },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
