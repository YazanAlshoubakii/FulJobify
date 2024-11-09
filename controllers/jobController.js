import JobModel from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const jobs = await JobModel.create({ company, position });
  res.status(StatusCodes.CREATED).json({ jobs });
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.findById(id);

  if (!job) throw new NotFoundError(`no job with this id ${id}`);

  res.status(StatusCodes.OK).json({ job });
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) throw new NotFoundError(`no job with this id ${id}`);

  res.status(StatusCodes.OK).json({ msg: 'job modified', updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await JobModel.findByIdAndDelete(id);
  if (!removedJob) throw new NotFoundError(`no job with this id ${id}`);

  res.status(StatusCodes.OK).json({ msg: 'job is Deleted', job: removedJob });
};
