import JobModel from '../models/JobModel.js';

import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await JobModel.create({ company, position });
  res.status(201).json({ job });
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.findById(id);
  console.log(job);

  if (!job) {
    res.status(404).json({ msg: `no job with this id ${id}` });
    return;
  }
  res.status(200).json({ job });
};

export const editJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: 'please enter company and position!' });
    return;
  }

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with this id ${id}` });
    return;
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with this id ${id}` });
    return;
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job is Deleted' });
};
