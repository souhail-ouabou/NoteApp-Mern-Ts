import { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { ReactComponent as MySVG } from '../assets/searchIcon.svg';
import { Note as NoteModel } from '../models/note';
import { useDeleteNoteMutation, useNotesQuery } from "../services/notes";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";
import { useDebounce } from '../hooks/useDebounce';

const NotesPagesLoggedInView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm)

    const { data, error, isLoading, isFetching, isSuccess } = useNotesQuery(debouncedSearch)

    // const { data: dataNote, } = useNoteQuery("643059c37e50b2020256b26b")
    // console.log("test data" + dataNote);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
    };
    const [deleteNote] = useDeleteNoteMutation()

    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);


    const notesGrid = <div className="mx-auto container py-2 px-6">
        <div className="grid sm:gap-6 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
            {data?.map((note) => (
                <Note
                    note={note}
                    key={note._id}
                    onNoteClicked={setNoteToEdit} // or   onNoteClicked={(note) => setNoteToEdit(note)}
                    onDeleteClicked={deleteNoteHandler} />)
            )}
        </div>
    </div>


    async function deleteNoteHandler(note: NoteModel) {
        try {
            await deleteNote(note._id);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    return (

        <>
            <div className="flex mt-20 items-center justify-center h-28">
                <div className="flex flex-col items-center">
                    <div className="flex w-full ">
                        <input className='py-2 px-3 bg-[#1F2937] text-sky-100 focus:outline-none text-base font-semibold rounded-lg block w-full p-2.5 '
                            placeholder='Search'
                            onChange={handleInputChange}
                        />
                        <button className="px-4 text-white bg-purple-600 rounded-full ">
                            <MySVG />
                        </button>
                    </div>
                    <button
                        className="flex items-center mt-3 py-3 px-4 text-white bg-purple-600 rounded-full"
                        type="button"
                        onClick={() => setShowEditNoteDialog(true)}
                    >
                        <FaPlusCircle className=" text-white justify-center items-center cursor-pointer" />
                    </button>
                </div>
            </div >
            {showEditNoteDialog &&
                <AddEditNoteDialog
                    onDismiss={() => setShowEditNoteDialog(false)}
                    showModal={true} onNoteSaved={(newNote) => {
                        // setNotes([...notes, newNote])
                        setShowEditNoteDialog(false)
                    }} />
            }
            {
                (isLoading || isFetching) ? (
                    <div className="mx-auto container py-2 px-6  animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                    </div>) : (
                    isSuccess &&
                    <>
                        {data.length > 0
                            ? notesGrid : <p>You don't have any notes yet</p>
                        }
                    </>
                )
            }
            {error && <p>Something went wrong. Please refresh the page</p>}
            {
                noteToEdit &&
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