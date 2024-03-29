import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import { useSaveNoteMutation, useUpdateNoteMutation } from "../services/notes";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    showModal: boolean,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}
const AddEditNoteDialog = ({ noteToEdit, onDismiss, showModal, onNoteSaved }: AddEditNoteDialogProps) => {
    const [saveNote] = useSaveNoteMutation()
    const [updateNote] = useUpdateNoteMutation()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });
    async function onSubmit(input: NoteInput) {
        try {
            if (noteToEdit) {
                await updateNote({ note: input, id: noteToEdit._id })
            }
            else {
                await saveNote(input)
            }
            onDismiss()
        } catch (error) {
            console.error(error);
            alert(error)
        }
    };
    return (<>
        {showModal ? (
            <>
                <div className="fixed inset-0 z-10 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen px-4 py-8">
                        <div className="relative w-full h-full max-w-md md:h-auto  shadow-black shadow-2xl">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg onClick={() => onDismiss()} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white"> {noteToEdit ? "Edit note " : "Add note"}</h3>
                                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                        <TextInputField
                                            name="title"
                                            label="Title"
                                            type="text"
                                            placeholder="Title"
                                            register={register}
                                            registerOptions={{ required: "Required" }}
                                            error={errors.title}
                                        />

                                        <TextInputField
                                            name="text"
                                            label="Text"
                                            area={true}
                                            rows={5}
                                            placeholder="Text"
                                            register={register}
                                        />

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
export default AddEditNoteDialog;