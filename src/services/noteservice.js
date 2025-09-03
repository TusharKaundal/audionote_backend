import AudioNote from "../models/AudioNote.js";

export const getAllNotes = async () => {
  return AudioNote.find({}).sort({ createdAt: -1 });
};

export const deleteNotebyID = async (id) => {
  return AudioNote.findByIdAndDelete(id);
};

export const getNoteById = async (id) => {
  return AudioNote.findById(id);
};
