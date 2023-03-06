import { useState } from "react";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Note } from "../models/note";

interface AddNoteDialogProps {
    onNoteSaved: (note: Note) => void
}
const AddNoteDialog = ({ onNoteSaved }: AddNoteDialogProps) => {

    const [showModal, setShowModal] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<NoteInput>();
    const onSubmit = async (input: NoteInput) => {
        try {
            const noteResponse = await NotesApi.createNote(input)
            onNoteSaved(noteResponse)
            setShowModal(false)
        } catch (error) {
            console.error(error);
            alert(error)
        }
    };
    return (<>
        <div className="flex items-center justify-center h-28">
            <button
                className="px-6 py-3 text-purple-100 bg-purple-600 rounded-md"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add Note
            </button>
        </div>
        {showModal ? (
            <>
                <div className="fixed inset-0 z-10 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen px-4 py-8">
                        <div className="relative w-full h-full max-w-md md:h-auto  shadow-black shadow-2xl">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg onClick={() => setShowModal(false)} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Note</h3>
                                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                            {errors.title && (<>
                                                <p className="p-2 text-red-500 text-xs italic">{errors.title?.message}</p>
                                            </>
                                            )
                                            }
                                            <input className={`py-2 px-3 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white ${errors.title?.message ? "border rounded-md focus:border-red-500 border-red-500" : "border border-gray-500"}`}
                                                type="title"
                                                placeholder="Your title..."
                                                {...register("title", { required: "Title cannot be empty" })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text</label>
                                            <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="Your text..."
                                                {...register("text")}
                                            />
                                        </div>
                                        <div className="flex">
                                            <button className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                type="submit"
                                                disabled={isSubmitting}>
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        ) : null
        }
    </>);
}

export default AddNoteDialog;