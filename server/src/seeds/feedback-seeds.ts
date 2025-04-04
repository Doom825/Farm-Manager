import { Feedback } from '../models/index.js';

export const seedFeedback = async () => {
  await Feedback.bulkCreate([
    {
      email: 'GG',
      feedbackType: 'Complaint',
      feedback: 'Color contrast in the navbar could be better'
    },
  ]);
};
