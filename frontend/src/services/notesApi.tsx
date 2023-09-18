import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";


export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/"
    }),
    endpoints: (builder) => ({
        notes: builder.query<Note[], void>({
            query: () => '/api/notes'
        }),
        note: builder.query<Note, string>({
            query: (noteId) => `/api/notes/${noteId}`
        }),
        saveNote: builder.mutation<void, NoteInput>({
            query: note => ({
                url: '/api/notes',
                method: 'POST',
                body: note
            })
        }),
        updateNote: builder.mutation<void, Note>({
            query: ({ _id, ...rest }) => ({
                url: `/api/notes/${_id}`,
                method: 'PUT',
                body: rest
            })
        }),
        deleteNote: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/api/notes/${_id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useNotesQuery,
    useNoteQuery,
    useDeleteNoteMutation,
    useSaveNoteMutation,
    useUpdateNoteMutation
} = notesApi;