const jobs = require('../data/jobs.json');

const matchJobs = (req, res) => {
  const skills = req.query.skills ? req.query.skills.split(',') : [];
  const location = req.query.location || '';

  // If no filters, return all jobs
  if (skills.length === 0 && location === '') {
    return res.json(jobs);
  }

  // Otherwise, filter
  const matchedJobs = jobs
    .filter(job => job.location.toLowerCase() === location.toLowerCase())
    .map(job => {
      const matched = job.skillsRequired.filter(skill =>
        skills.includes(skill)
      );
      return {
        ...job,
        matchCount: matched.length,
        matchedSkills: matched
      };
    })
    .sort((a, b) => b.matchCount - a.matchCount);

  res.json(matchedJobs.slice(0, 5));
};

module.exports = { matchJobs };
