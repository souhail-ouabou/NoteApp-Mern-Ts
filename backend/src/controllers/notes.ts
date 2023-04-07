import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import NoteModel from '../models/note'
import { assertIsDefined } from '../util/assertIsDefined'

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId; //possible  undifined for that we create the function assertIsDefined.ts
    try {
        assertIsDefined(authenticatedUserId);
        // throw Error("Biiziga!")
        const notes = await NoteModel.find({ userId: authenticatedUserId }).exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid Note id')
        }
        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(400, 'Note Not found')
        }
        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(400, 'You cannot acces this note ')
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
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, 'The Note must have a title')
        }
        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
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
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
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
        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(400, 'You cannot acces this note ')
        }
        note.title = newTitle
        note.text = newText

        const updatedNote = await note.save();
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}
export const deleteeNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, 'Invalid Note id')
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(400, 'Note not found')
        }
        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(400, 'You cannot acces this note ')
        }
        await note.remove();
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}
