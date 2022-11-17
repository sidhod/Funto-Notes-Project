import { empty } from '@hapi/joi/lib/base';
import User from '../models/notes.model';
//add new note
export const addNote = async (body) => {
    const data = await User.create(body);
    return data;
};
//get all notes
export const allNotes = async (UserID) => {
    const data = await User.find({ UserID });
    return data;
};
//get single note
export const getNote = async (id, UserID) => {
    const data = await User.findById({ _id: id, UserID: UserID });
    return data;
};
//delete single user
export const deleteNote = async (id, UserID) => {
    await User.findByIdAndDelete({ _id: id, UserID: UserID });
    return '';
};
//update single Note
export const updateNote = async (id, UserID, body) => {
    const data = await User.findByIdAndUpdate(
        {
            _id: id,
            UserID: UserID
        },
        body,
        {
            new: true
        }
    );
    return data;
};



//update isArchived Note
export const updateisArchivedField = async (id, UserID) => {
    let note = await User.findById({ _id: id, UserId: UserID });
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
            _id: id,
            UserID: UserID
        },
        update,
        {
            new: true
        }

    );
    return data;
};
//update isDelete Field
export const updateisDeletedField = async (id, UserID) => {
    let note = await User.findById({
        _id: id,
        UserID: UserID
    });
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
            _id: id,
            UserID: UserID
        },
        update,
        {
            new: true
        }

    );
    return data;
};