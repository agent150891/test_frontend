import { useEffect, useState } from "react";
import { JobAPI } from "../services/API/JobAPI";

export function jobController(jobService = JobAPI) {
  const [jobs, updateJobs] = useState([]);
  const [skills, updateSkills] = useState([]);
  const deleteJob = (event, rowData) => {
    updateJobs(jobs.filter(job => job.id !== rowData.id));
    jobService.deleteJob(rowData.id);
  };

  useEffect(() => {
    (async () => {
      const [newSkills, fetchedJobs] = await jobService.fetchJobs();
      updateSkills(newSkills);
      updateJobs(fetchedJobs);
    })();
  }, []);

  return { jobs, skills, updateJobs, updateSkills, deleteJob };
}
