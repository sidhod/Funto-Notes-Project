import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as notesController from '../controllers/notes.controller';
import { newNotesValidator } from '../validators/notes.validator';

const router = express.Router();

//route to create a new note
router.post('', newNotesValidator, userAuth, notesController.addNote);

//route to get all a notes
router.get('', userAuth, notesController.allNotes);

export default router;
