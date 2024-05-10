import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema({
  forexAccount: { type: Schema.Types.ObjectId, ref: 'ForexAccount' },
  date: String,
  description: String,
});

export const NoteModel =
  mongoose.models.Note || mongoose.model('Note', NoteSchema);
