import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Project } from '../model/projects.js';

const canManageProject = (user, project) => {
  return user.role === 'admin' || (user.role === 'teamlead' && project.teamLead.toString() === user._id.toString());
};

export const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, startDate, endDate, teamLead, members } = req.body;

  const project = await Project.create({
    title, description, startDate, endDate,
    teamLead: new mongoose.Types.ObjectId(teamLead),
    members: (members || []).map(m => new mongoose.Types.ObjectId(m)),
    createdBy: req.user._id
  });

  const populated = await Project.findById(project._id)
    .populate('teamLead', 'name email role')
    .populate('members', 'name email role')
    .lean();

  res.status(201).json(populated);
});

export const getProjects = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : {
    $or: [ { teamLead: req.user._id }, { members: req.user._id } ]
  };

  const projects = await Project.find(filter)
    .populate('teamLead', 'name email role')
    .populate('members', 'name email role')
    .sort({ createdAt: -1 })
    .lean();

  res.json(projects);
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('teamLead', 'name email role')
    .populate('members', 'name email role')
    .lean();
  if (!project) return res.status(404).json({ message: 'Project not found' });


  if (
    req.user.role !== 'admin' &&
    project.teamLead._id.toString() !== req.user._id.toString() &&
    !project.members.some(m => m._id.toString() === req.user._id.toString())
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canManageProject(req.user, project)) return res.status(403).json({ message: 'Forbidden' });


  const updatable = ['title', 'description', 'startDate', 'endDate', 'status'];
  updatable.forEach(k => {
    if (req.body[k] !== undefined) project[k] = req.body[k];
  });

  await project.save();
  const populated = await Project.findById(project._id)
    .populate('teamLead', 'name email role')
    .populate('members', 'name email role')
    .lean();
  res.json(populated);
});

export const setMembers = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canManageProject(req.user, project)) return res.status(403).json({ message: 'Forbidden' });

  project.members = (req.body.members || []).map(id => new mongoose.Types.ObjectId(id));
  await project.save();
  const populated = await Project.findById(project._id)
    .populate('teamLead', 'name email role')
    .populate('members', 'name email role')
    .lean();
  res.json(populated);
});

export const assignTeamLead = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  // Only admin can change teamLead
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can reassign teamLead' });

  project.teamLead = new mongoose.Types.ObjectId(req.body.teamLead);
  await project.save();
  const populated = await Project.findById(project._id)
    .populate('teamLead', 'name email role')
    .populate('members', 'name email role')
    .lean();
  res.json(populated);
});

export const addProjectDescription = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canManageProject(req.user, project)) return res.status(403).json({ message: 'Forbidden' });

  const { text } = req.body;
  project.descriptions.push({ author: req.user._id, text });
  await project.save();
  const populated = await Project.findById(project._id)
    .populate('descriptions.author', 'name role')
    .lean();
  res.status(201).json(populated.descriptions.at(-1));

});
