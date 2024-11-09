import JobModel from '../models/JobModel.js';

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
  const { id } = req.params;
  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) {
    res.status(404).json({ msg: `no job with this id ${id}` });
    return;
  }

  res.status(200).json({ msg: 'job modified', updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await JobModel.findByIdAndDelete(id);
  if (!removedJob) {
    res.status(404).json({ msg: `no job with this id ${id}` });
    return;
  }

  res.status(200).json({ msg: 'job is Deleted', job: removedJob });
};
