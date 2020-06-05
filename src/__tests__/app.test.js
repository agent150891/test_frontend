import React from 'react';
import { configure } from 'enzyme';
import { act } from '@testing-library/react-hooks';
import Adapter from 'enzyme-adapter-react-16';
import { JobAPI } from "../services/API/JobAPI";
import jobMock from "../../__mocks__/jobMock";
import { jobController } from "../controllers/jobController";
import { renderHook } from "@testing-library/react-hooks";
require('dotenv').config();

configure({ adapter: new Adapter() });

describe('app', () => {
  it('Insert and remove job', async () => {
    spyOn(React, 'useEffect');

    await act(async () => {
      await JobAPI.insertJob(jobMock);
      const mockedJobFilter = (job) => job.id === jobMock.id;
      const { result } = await renderHook(() => jobController());

      await act(async () => {
        const [_, fetchedJobs] = await JobAPI.fetchJobs();
        result.current.updateJobs(fetchedJobs);
      });

      // check that mocked job was added
      expect(result.current.jobs.find(mockedJobFilter)).toBeTruthy();

      // check that mocked job was deleted in db
      await JobAPI.deleteJob(jobMock.id);
      const [_, updatedJobs] = await JobAPI.fetchJobs();
      expect(updatedJobs.find(mockedJobFilter)).toBeUndefined();

      // check that mocked job was deleted from jobsController
      act(() => result.current.deleteJob(null, { id: jobMock.id }));
      expect(result.current.jobs.find(mockedJobFilter)).toBeUndefined();

      await JobAPI.deleteJobObject(jobMock.id);
    });
  });
});
