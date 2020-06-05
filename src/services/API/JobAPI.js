import { API } from "./API";

const urlBasic = '/jobs';

export class JobAPI {
  static async fetchJobs() {
    const { data: { jobs: fetchedJobs } } = await API.request('get', `${urlBasic}/list`)();
    const newSkills = new Set([
      ...fetchedJobs.reduce((acc, job) => {
        acc.push(...job.skills);
        return acc;
      }, [])
    ]);

    return [[...newSkills], fetchedJobs];
  }

  static insertJob(job) {
    return API.request('post', `${urlBasic}/create`, { params: { ...job } })();
  }

  static deleteJob(jobId) {
    return API.request('delete', `${urlBasic}/job/${jobId}`)();
  }

  static deleteJobObject(jobId) {
    return API.request('delete', `${urlBasic}/object/${jobId}`)();
  }
}
