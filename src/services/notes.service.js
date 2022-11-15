import { empty } from '@hapi/joi/lib/base';
import User from '../models/notes.model';
//add new note
export const addNote = async (body) => {
    const data = await User.create(body);
    return data;
};
//get all notes
export const allNotes = async () => {
    const data = await User.find();
    return data;
};
//get single note
export const getNote = async (id) => {
    const data = await User.findById(id);
    return data;
};
