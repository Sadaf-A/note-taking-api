const NoteService = require("../services/NoteService");
const uuid = require("uuid");
const z = require("zod");

const NoteSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500),
});

const validateNote = (note) => {
  try {
    NoteSchema.parse(note);
    return true;
  } catch (error) {
    console.error("Validation error:", error.errors);
    return false;
  }
};

exports.createNote = async (req, res) => {
  const noteData = await req.body;
  validateNote(noteData);
  const noteId = await uuid.v4();
  const note = await NoteService.saveNote(noteId, noteData);
  res.send(note);
};

exports.getNotes = async (req, res) => {
  const notes = await NoteService.getAllNotes();
  res.send(notes);
};

exports.updateNote = async (req, res) => {
  const noteId = await req.params.noteId;
  const updateData = await req.body;
  validateNote(updateData);
  const updateNote = await NoteService.updateNote(noteId, updateData);
  res.send(updateNote);
};

exports.deleteNote = async (req, res) => {
  const noteId = await req.params.noteId;
  const notes = await NoteService.deleteNote(noteId);
  res.send(notes);
};

exports.getNote = async (req, res) => {
    const noteId = await req.params.noteId;
    const note = await NoteService.getNoteById(noteId);
    res.send(note);
};
