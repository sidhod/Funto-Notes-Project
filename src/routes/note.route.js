import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as notesController from '../controllers/notes.controller';
import { newNotesValidator } from '../validators/notes.validator';
import { redisCheck } from '../middlewares/redis.middleware';

const router = express.Router();

//route to create a new note
router.post('', newNotesValidator, userAuth, notesController.addNote);

//route to get all a notes
router.get('', userAuth, redisCheck, notesController.allNotes);

//route to get a single note by their note id
router.get('/:_id', userAuth, notesController.getNote);

//route to update a single note by their note id
router.put('/:_id', newNotesValidator, userAuth, notesController.updateNote);

//route to delete a single note by their note id
router.delete('/:_id', userAuth, notesController.deleteNote);

//route to update a isArchived Field by their note id
router.put('/:_id/archived', userAuth, notesController.updateisArchivedField);

//route to update a isDelete Field by their note id
router.put('/:_id/trash', userAuth, notesController.updateisDeletedField);
export default router;
