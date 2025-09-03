import AudioNote from "../models/AudioNote.js";
import { genAIService } from "../services/index.js";
import { noteservice } from "../services/index.js";

export const generateTranscribe = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No audio uploaded or invalid file type",
    });
  }

  const buffer = req.file.buffer;
  const mimeType = req.file.mimetype;

  try {
    const transcript = await genAIService.transcribeAudio(buffer, mimeType);

    const audioNote = new AudioNote({
      transcript,
      transcriptGeneratedAt: new Date(),
      summary: null,
      summaryGeneratedAt: null,
    });

    await audioNote.save();

    return res.json({
      status: "success",
      message: "File uploaded and transcribed successfully",
      note: audioNote,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while transciprt generation",
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await noteservice.getAllNotes();
    if (!notes) {
      return res.status(404).json({
        status: "error",
        message: "Notes not found",
      });
    }
    return res.json({
      status: "success",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Error while getting notes",
    });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteservice.deleteNotebyID(id);
    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Failed to delete note",
    });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { transcript } = req.body;
  try {
    const note = await noteservice.getNoteById(id);
    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }
    note.transcript = transcript;
    await note.save();
    return res.json({
      status: "success",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Failed to update note",
    });
  }
};

export const summarizeNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteservice.getNoteById(id);
    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }
    const summary = await genAIService.summarizeText(note.transcript);
    note.summary = summary;
    note.summaryGeneratedAt = new Date();
    await note.save();
    return res.json({
      status: "success",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Failed to generate summary",
    });
  }
};
