import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";


export const notesApi = createApi({
    reducerPath: "notesApi",
    tagTypes: ['Note'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/"
    }),
    endpoints: (builder) => ({
        notes: builder.query<Note[], void>({
            query: () => '/api/notes',
            providesTags: ['Note']
        }),
        note: builder.query<Note, string>({
            query: (noteId) => `/api/notes/${noteId}`,
            providesTags: ['Note']
        }),
        saveNote: builder.mutation<void, NoteInput>({
            query: note => ({
                url: '/api/notes',
                method: 'POST',
                body: note
            }),
            invalidatesTags: ['Note']

        }),
        updateNote: builder.mutation<void, { note: NoteInput; id: string }>({
            query: ({ note, id }) => ({
                url: `/api/notes/${id}`,
                method: 'PATCH',
                body: note
            }),
            invalidatesTags: ['Note']
        }),
        deleteNote: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/api/notes/${_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Note']
        })
    })
})

export const { useNotesQuery,
    useNoteQuery,
    useDeleteNoteMutation,
    useSaveNoteMutation,
    useUpdateNoteMutation
} = notesApi;