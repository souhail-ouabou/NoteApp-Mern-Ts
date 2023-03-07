import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import * as NotesApi from "./network/notes_api"
import AddEditNoteDialog from './components/AddEditNoteDialog';
import { FaPlusCircle } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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
  return (
    <>
      <div className="flex items-center justify-center h-28">
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

      <div className="mx-auto container py-2 px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <Note
              note={note}
              key={note._id}
              onNoteClicked={setNoteToEdit} // or   onNoteClicked={(note) => setNoteToEdit(note)}
              onDeleteClicked={deleteNote} />)
          )}
        </div>
      </div>
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

export default App;
