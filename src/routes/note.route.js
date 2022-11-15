import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as notesController from '../controllers/notes.controller';
import { newNotesValidator } from '../validators/notes.validator';

const router = express.Router();

//route to create a new note
router.post('', newNotesValidator, userAuth, notesController.addNote);

//route to get all a notes
router.get('', userAuth, notesController.allNotes);

//route to get a single user by their user id
router.get('/:_id', userAuth, notesController.getNote);
export default router;
