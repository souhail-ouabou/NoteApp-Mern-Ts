import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import * as NotesApi from "./network/notes_api"
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
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
  async function deleteNote(note:NoteModel) {
    try {
        await NotesApi.deleteNote(note._id);
        setNotes(notes.filter(existingNote=>existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }
  return (
    <>
      <AddNoteDialog onNoteSaved={(newNote) => {
        setNotes([...notes, newNote])

      }} />
      <div className="mx-auto container py-2 px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {notes.map((note) => (<Note note={note} key={note._id} onDeleteClicked={deleteNote} />)
          )}
        </div>
      </div>
    </>
  );
}

export default App;
