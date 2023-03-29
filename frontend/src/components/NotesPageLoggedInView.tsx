import { FaPlusCircle } from "react-icons/fa";
import AddEditNoteDialog from "./AddEditNoteDialog";
import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from '../models/note';
import Note from "./Note";
import * as NotesApi from "../network/notes_api"

const NotesPagesLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);


    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);

    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNotesLoadingError(false);
                setNotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            }
            finally {
                setNotesLoading(false);
            }
        }
        loadNotes();
    }, []);
    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id));
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    const notesGrid = <div className="mx-auto container py-2 px-6">
        <div className="grid sm:gap-6 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
            {notes.map((note) => (
                <Note
                    note={note}
                    key={note._id}
                    onNoteClicked={setNoteToEdit} // or   onNoteClicked={(note) => setNoteToEdit(note)}
                    onDeleteClicked={deleteNote} />)
            )}
        </div>
    </div>
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
                        setNotes([...notes, newNote])
                        setShowEditNoteDialog(false)
                    }} />
            }
            {notesLoading &&
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
            {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
            {!notesLoading && !showNotesLoadingError &&
                <>
                    {notes.length > 0
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
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                        setNoteToEdit(null);
                    }} />
            }

        </>
    );
}

export default NotesPagesLoggedInView;