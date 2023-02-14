import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
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
        const noteId = req.params.noteId
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid Note id')
        }
        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(400, 'Note Not found')
        }

        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

//what type of variables we expect in body
interface CreateNoteBody {
    title?: string
    text?: string
}
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const { title, text } = req.body
    try {
        if (!title) {
            throw createHttpError(400, 'The Note must have a title')
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        })
        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}
interface UpdateNoteBody {
    title?: string
    text?: string
}
interface UpdateNoteParams {
    noteId: string
}
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const newTitle = req.body.title
    const newText = req.body.text
    const noteId = req.params.noteId
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid Note id')
        }
        if (!newTitle) {
            throw createHttpError(400, 'The Note must have a title')
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(400, 'Note not found')
        }
        note.title = newTitle
        note.text = newText

        const updatedNote = await note.save();
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}
export const deleteeNote: RequestHandler= async (req, res, next) => {
    const noteId = req.params.noteId
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid Note id')
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(400, 'Note not found')
        }

       await note.remove();
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}
