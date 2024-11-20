import JobModel from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const jobs = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ jobs });
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;

  const job = await JobModel.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

export const editJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'job modified', updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await JobModel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: 'job is Deleted', job: removedJob });
};
