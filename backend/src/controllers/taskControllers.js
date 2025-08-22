import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { Task } from '../model/Tasks.js';
import { Project } from '../model/projects.js';

const canView = (user, project) => {
  return (
    user.role === 'admin' ||
    project.teamLead.toString() === user._id.toString() ||
    project.members.some(m => m.toString() === user._id.toString())
  );
};

const canManage = (user, project) => user.role === 'admin' || project.teamLead.toString() === user._id.toString();

export const listTasks = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canView(req.user, project)) return res.status(403).json({ message: 'Forbidden' });

  const tasks = await Task.find({ project: project._id })
    .populate('assignee', 'name email role')
    .sort({ status: 1, order: 1, createdAt: 1 })
    .lean();
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canManage(req.user, project)) return res.status(403).json({ message: 'Forbidden' });

  const { title, description, assignee, status } = req.body;

  // Get max order in the target column
  const max = await Task.find({ project: project._id, status: status || 'todo' })
    .sort({ order: -1 })
    .limit(1)
    .lean();
  const nextOrder = max.length ? (max[0].order + 1) : 0;

  const task = await Task.create({
    project: project._id,
    title,
    description,
    assignee: assignee ? new mongoose.Types.ObjectId(assignee) : undefined,
    status: status || 'todo',
    order: nextOrder,
    createdBy: req.user._id,
  });

  const populated = await Task.findById(task._id).populate('assignee', 'name email role').lean();
  res.status(201).json(populated);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const project = await Project.findById(task.project);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  // TeamLead/Admin can edit any task in project; employee can edit only own assigned task status to mark done/in_progress/review
  if (!(canManage(req.user, project) || (req.user.role === 'employee' && task.assignee?.toString() === req.user._id.toString()))) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const allowed = ['title', 'description', 'assignee', 'status'];
  allowed.forEach(k => {
    if (req.body[k] !== undefined) task[k] = req.body[k];
  });
  await task.save();
  const populated = await Task.findById(task._id).populate('assignee', 'name email role').lean();
  res.json(populated);
});

// Drag & Drop reorder endpoint
export const reorderTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canManage(req.user, project)) return res.status(403).json({ message: 'Forbidden' });

  /**
   * body = {
   *   columns: {
   *     todo: [taskId1, taskId2, ...],
   *     in_progress: [...],
   *     review: [...],
   *     done: [...]
   *   }
   * }
   */
  const { columns } = req.body;
  if (!columns) return res.status(400).json({ message: 'columns required' });

  const bulkOps = [];
  Object.entries(columns).forEach(([status, ids]) => {
    ids.forEach((id, index) => {
      bulkOps.push({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(id), project: project._id },
          update: { $set: { status, order: index } }
        }
      });
    });
  });

  if (!bulkOps.length) return res.json({ updated: 0 });

  const result = await Task.bulkWrite(bulkOps);
  res.json({ updated: result.modifiedCount });
});