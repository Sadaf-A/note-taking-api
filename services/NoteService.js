const NoteModel = require("../models/NoteModel");

exports.saveNote = async (noteId, body) => {
  try {
    const data = {
      noteId: noteId,
      title: body.title,
      content: body.content,
    };
    const note = new NoteModel(data);
    await note.save();
    return note;
  } catch (err) {
    console.error(err);
  }
};

exports.getAllNotes = async() => {
    try {
        const notes = await NoteModel.find();
        return notes;
    } catch (err) {
        console.error(err);
      }
}

exports.getNoteById = async(noteId) => {
    try {
        const note = await NoteModel.findOne({noteId});
        if(!note) {
            throw new Error("Note not found");
        }
        return note;
    } catch (err) {
        console.error(err);
      }
}

exports.updateNote = async (noteId, updatedData) => {
    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            noteId,
            { $set: updatedData },
            { new: true }
        );
        if(!updatedNote) {
            throw new Error("Note not found");
        }
        return updatedNote;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.deleteNote = async (noteId) => {
    try {
        const deletedNote = await NoteModel.findByIdAndDelete(noteId);
        if(!deletedNote) {
            throw new Error("Note not found");
        }
        return deletedNote;
    } catch (err) {
        console.error(err);
        throw err;
    }
};