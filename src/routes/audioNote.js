import express from "express";
import multer from "multer";
import { notesController } from "../controller/index.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Routes
router.post(
  "/transcribe",
  upload.single("audio"),
  notesController.generateTranscribe
);

router.get("/notes", notesController.getAllNotes);
router.delete("/note/:id", notesController.deleteNote);
router.patch("/note/:id", notesController.updateNote);
router.patch("/note/:id/summarize", notesController.summarizeNote);

export default router;
