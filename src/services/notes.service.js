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

//update single Note
export const updateNote = async (_id, body) => {
    const data = await User.findByIdAndUpdate(
        {
            _id
        },
        body,
        {
            new: true
        }
    );
    return data;
};

//delete single user
export const deleteNote = async (id) => {
    await User.findByIdAndDelete(id);
    return '';
};

//update isArchived Note
export const updateisArchivedField = async (_id) => {
    let note = await User.findById(_id);
    let update;
    console.log(note);
    if (note.isArchived === true) {
        update = {
            isArchived: false
        }
    } else {
        update = {
            isArchived: true
        }

    }
    const data = await User.findByIdAndUpdate(
        {
            _id,
        },
        update,
        {
            new: true
        }

    );
    return data;
};
//update isDelete Field
export const updateisDeletedField = async (_id) => {
    let note = await User.findById(_id);
    let update;
    console.log(note);
    if (note.isDeleted === true) {
        update = {
            isDeleted: false
        }
    } else {
        update = {
            isDeleted: true
        }

    }
    const data = await User.findByIdAndUpdate(
        {
            _id,
        },
        update,
        {
            new: true
        }

    );
    return data;
};