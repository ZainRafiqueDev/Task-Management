import mongoose from 'mongoose';

const projectDescriptionSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true, _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
    descriptions: [projectDescriptionSchema], // Admin/TeamLead can add notes/updates to the project
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'archived'], default: 'active', index: true },

    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', description: 'text' });

export const Project = mongoose.model('Project', projectSchema);