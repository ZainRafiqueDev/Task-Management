import mongoose from 'mongoose';

const workLogSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text: { type: String, required: true },
    logDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

workLogSchema.index({ project: 1, user: 1, createdAt: -1 });

export const WorkLog = mongoose.model('WorkLog', workLogSchema);