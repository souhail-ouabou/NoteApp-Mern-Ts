import { RequestHandler } from 'express'
import NoteModel from '../models/note'

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        //  throw Error("Biiziga!")
        const notes = await NoteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}
export const getNote: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.noteId;
        const note = await NoteModel.findById(id).exec();

        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}
export const createNote: RequestHandler = async (req, res, next) => {
    const { title, text } =req.body
    try {
        const newNote = await NoteModel.create({
            title:title,
            text:text,
        });
        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}

