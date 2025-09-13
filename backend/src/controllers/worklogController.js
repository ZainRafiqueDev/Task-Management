import asyncHandler from 'express-async-handler';
import { WorkLog } from '../model/Worklog.js';
import { Project } from '../model/projects.js';

export const addWorkLog = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  // Employee must belong to the project to post log
  const belongs =
    req.user.role === 'admin' ||
    project.teamLead.toString() === req.user._id.toString() ||
    project.members.some(m => m.toString() === req.user._id.toString());
  if (!belongs) return res.status(403).json({ message: 'Forbidden' });

  const { text } = req.body;
  const log = await WorkLog.create({ project: project._id, user: req.user._id, text });
  const populated = await WorkLog.findById(log._id).populate('user', 'name role').lean();
  res.status(201).json(populated);
});

export const listWorkLogs = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const canView =
    req.user.role === 'admin' ||
    project.teamLead.toString() === req.user._id.toString() ||
    project.members.some(m => m.toString() === req.user._id.toString());
  if (!canView) return res.status(403).json({ message: 'Forbidden' });

  const logs = await WorkLog.find({ project: project._id })
    .populate('user', 'name role')
    .sort({ createdAt: -1 })
    .lean();
  res.json(logs);

});
