import mongoose from "mongoose";

const AudioNoteSchema = new mongoose.Schema(
  {
    title: String,
    transcript: { type: String },
    summary: { type: String },
    summaryGeneratedAt: { type: Date },
  },
  { timestamps: true }
);

AudioNoteSchema.pre("save", function (next) {
  if (this.isModified("transcript")) {
    this.title = this.transcript
      ? this.transcript.substring(0, 11) +
        (this.transcript.length > 10 ? "..." : "")
      : "Untitled Note";
  }
  next();
});

// Add indexes for faster sorting
AudioNoteSchema.index({ createdAt: -1 });

export default mongoose.model("AudioNote", AudioNoteSchema);
