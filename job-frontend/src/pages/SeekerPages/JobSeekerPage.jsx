import React, { useEffect } from "react";
import JobList from "../../JobSeeker/JobList";
import Config from "../../config/Config.json";

const JobSeekerPage = () => {
  useEffect(() => {
    document.title = Config.TITLE.DASHBOARD;
  }, []);
  return (
    <React.Fragment>
      <JobList />
    </React.Fragment>
  );
};

export default JobSeekerPage;
