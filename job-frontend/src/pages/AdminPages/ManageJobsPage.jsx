import React, { useEffect } from "react";
import ManageJobs from "../../components/dashboard/ManageJobs/ManageJobs";
import Config from "../../config/Config.json";

const ManageJobsPage = () => {
  useEffect(() => {
    document.title = Config.TITLE.MANAGE_JOBS;
  }, []);
  return (
    <React.Fragment>
      <ManageJobs />
    </React.Fragment>
  );
};

export default ManageJobsPage;
