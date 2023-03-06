import styles from "../styles/Note.module.css";

import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { FaTrash } from "react-icons/fa"

interface NoteProps {
  note: NoteModel,
  onDeleteClicked: (note: NoteModel) => void
}

const Note = ({ note, onDeleteClicked }: NoteProps) => {
  const {
    title,
    text,
    createdAt,
    updatedAt
  } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <div className="w-full h-52 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h4 className="flex items-center text-gray-800 dark:text-gray-100 font-bold mb-3">
          {title}
          <div className='bg-red-600 rounded-tr-md  rounded-bl-xl w-10 h-10  flex ml-auto'>
            <FaTrash className="m-auto text-white justify-center items-center" 
            onClick={(e) => {
              onDeleteClicked(note);
              e.stopPropagation();
            }}
          />
          </div>
        </h4>
        <p className="text-gray-800 dark:text-gray-100 text-sm">{text}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm"> {createdUpdatedText}</p>
          <button className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black">
            <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-3-multiple-styled-cards-svg1.svg" alt="edit" />
            <img className="dark:block hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-3-multiple-styled-cards-svg1dark.svg" alt="edit" />
          </button>
        </div>
      </div>
    </div>


  )
}
export default Note;