import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import noteReducer from './features/note/noteSlice';
import { notesApi } from './services/notesApi';

export const store = configureStore({
    reducer: {
        // noteReducer
        [notesApi.reducerPath]: notesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch