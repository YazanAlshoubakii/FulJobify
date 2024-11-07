import { Router } from 'express';

const router = Router();

import {
  getAllJobs,
  getOneJob,
  createJob,
  editJob,
  deleteJob,
} from '../controllers/jobController.js';

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getOneJob).patch(editJob).delete(deleteJob);

export default router;
