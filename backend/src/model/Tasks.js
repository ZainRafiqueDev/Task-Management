import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['todo', 'in_progress', 'review', 'done'], default: 'todo', index: true },
    order: { type: Number, default: 0, index: true }, // for Kanban drag & drop ordering
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Optimize common Kanban queries
taskSchema.index({ project: 1, status: 1, order: 1 });

export const Task = mongoose.model('Task', taskSchema);