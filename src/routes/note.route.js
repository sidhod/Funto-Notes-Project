import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as notesController from '../controllers/notes.controller';
import { newNotesValidator } from '../validators/notes.validator';

const router = express.Router();

//route to create a new note
router.post('', newNotesValidator, userAuth, notesController.addNote);

//route to get all a notes
router.get('', userAuth, notesController.allNotes);

//route to get a single note by their note id
router.get('/:_id', userAuth, notesController.getNote);

//route to update a single note by their note id
router.put('/:_id', notesController.updateNote);

//route to delete a single note by their note id
router.delete('/:_id', notesController.deleteNote);
export default router;
