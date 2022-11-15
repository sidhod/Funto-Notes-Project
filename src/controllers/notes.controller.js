import { template } from '@hapi/joi/lib/errors';
import HttpStatus from 'http-status-codes';
import * as NotesService from '../services/notes.service';
/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addNote = async (req, res, next) => {
    try {
        const data = await NotesService.addNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
    }
};
/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const allNotes = async (req, res, next) => {
    try {
        const data = await NotesService.allNotes();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All notes fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to get a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNote = async (req, res, next) => {
    try {
        const data = await NotesService.getNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const data = await NotesService.updateNote(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note updated successfully'
        });
    } catch (error) {
        next(error);
    }
};