const jobs = require('../data/jobs.json');

const matchJobs = (req, res) => {
  const skills = req.query.skills
    ? req.query.skills.split(',').map(s => s.trim().toLowerCase())
    : [];

  const location = req.query.location?.toLowerCase() || '';

  let salaryQuery = null;
  if (req.query.salary && !isNaN(req.query.salary)) {
    salaryQuery = parseInt(req.query.salary);
  }

  const matchedJobs = jobs
    .map(job => {
      console.log('Query received:', req.query); 
      const jobSkills = job.skillsRequired.map(skill => skill.toLowerCase());
      const matchedSkills = skills.filter(skill => jobSkills.includes(skill));

      const locationMatch = location ? job.location.toLowerCase() === location : true;
      const salaryMatch = salaryQuery !== null ? parseInt(job.salary) >= salaryQuery : true;
      const skillMatch = skills.length > 0 ? matchedSkills.length > 0 : true;

      if (locationMatch && salaryMatch && skillMatch) {
        return {
          ...job,
          matchCount: matchedSkills.length,
          matchedSkills
        };
      } else {
        return null;
      }
    })
    .filter(job => job !== null)
    .sort((a, b) => b.matchCount - a.matchCount);

  res.json(matchedJobs.slice(0, 5));
};

module.exports = { matchJobs };
