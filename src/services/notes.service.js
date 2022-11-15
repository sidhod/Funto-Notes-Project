import { empty } from '@hapi/joi/lib/base';
import User from '../models/notes.model';
export const addNote = async (body) => {
    const data = await User.create(body);
    return data;
};
export const allNotes = async () => {
    const data = await User.find();
    return data;
};