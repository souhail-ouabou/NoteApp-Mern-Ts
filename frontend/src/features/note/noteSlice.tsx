import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Note } from '../../models/note'
import { RootState } from '../../store';
import axios from 'axios'
import { NoteInput } from '../../network/notes_api';
// Define the initial state for the notes slice
interface NotesState {
    loading: boolean;
    notes: Array<Note>;
    error: string | undefined;
}

const initialState: NotesState = {
    notes: [],
    loading: false,
    error: undefined,
}


export const noteSlice = createSlice({
    name: "note",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
            state.loading = false;
            state.notes = action.payload;
            state.error = ''
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false;
            state.notes = [];
            state.error = action.error.message;
        });
    },
    reducers: {}

})

export const fetchNotes = createAsyncThunk('api/notes', async () => {
    return await axios.get('/api/notes')
        .then(res => {
            return res.data
        })
})

// Define your createNote action
export const createNote = createAsyncThunk('api/notes', async (data: any, { rejectWithValue }) => {
    const { title, text } = data;
    return await axios.post('/api/notes/', { title, text }, {
        headers: {
            'Content-Type': 'application/json' 
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        return rejectWithValue(err.response.data)
    })
})

// export const noteSelector = (state: RootState) => state.noteReducer;
export default noteSlice.reducer;