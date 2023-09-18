import { FaPlusCircle } from "react-icons/fa";
import AddEditNoteDialog from "./AddEditNoteDialog";
import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from '../models/note';
import Note from "./Note";
import * as NotesApi from "../network/notes_api"

import { useNoteQuery, useNotesQuery } from "../services/notesApi";

const NotesPagesLoggedInView = () => {
    const { data, error, isLoading, isFetching, isSuccess } = useNotesQuery()
    const { data: dataNote, } = useNoteQuery("643059c37e50b2020256b26b")

    console.log("test data" + dataNote);

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);


    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);


    const notesGrid = <div className="mx-auto container py-2 px-6">
        <div className="grid sm:gap-6 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
            {data?.map((note) => (
                <Note
                    note={note}
                    key={note._id}
                    onNoteClicked={setNoteToEdit} // or   onNoteClicked={(note) => setNoteToEdit(note)}
                    onDeleteClicked={deleteNote} />)
            )}
        </div>
    </div>


    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id));
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    return (

        <>
            <div className="flex mt-12 items-center justify-center h-28">
                <button
                    className="flex items-center px-6 py-3 text-purple-100 bg-purple-600 rounded-md font-medium"
                    type="button"
                    onClick={() => setShowEditNoteDialog(true)}
                >
                    <FaPlusCircle className="mr-2 text-white justify-center items-center" />
                    Add note
                </button>
            </div>
            {showEditNoteDialog &&
                <AddEditNoteDialog
                    onDismiss={() => setShowEditNoteDialog(false)}
                    showModal={true} onNoteSaved={(newNote) => {
                        // setNotes([...notes, newNote])
                        setShowEditNoteDialog(false)
                    }} />
            }
            {isLoading &&
                <div className="mx-auto container py-2 px-6  animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {isFetching &&
                <div className="mx-auto container py-2 px-6  animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Fetching...</span>
                </div>
            }
            {error && <p>Something went wrong. Please refresh the page</p>}
            {isSuccess &&
                <>
                    {data.length > 0
                        ? notesGrid : <p>You don't have any notes yet</p>
                    }
                </>
            }
            {noteToEdit &&
                <AddEditNoteDialog
                    onDismiss={() => setNoteToEdit(null)}
                    showModal={true}
                    noteToEdit={noteToEdit}
                    onNoteSaved={(updatedNote) => {
                        // setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                        setNoteToEdit(null);
                    }} />
            }

        </>
    );
}

export default NotesPagesLoggedInView;