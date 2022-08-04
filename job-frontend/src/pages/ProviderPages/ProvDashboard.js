import React, { useEffect, useState } from "react";

import ProviderCards from "../../Job Provider/Components/Counters/ProviderCards";

import Table1 from "../../Job Provider/Components/Table/dashboardTable.js";
import Config from "../../config/Config.json";
import axios from "axios";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

export default function ProvDashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    jobsCount: 0,
    applicantsCount: 0,
  });
  const [showSpinner, setShowSpinner] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    setShowSpinner(true);
    axios
      .get(`${Config.SERVER_URL + "provider/dashboard-stats"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setShowSpinner(false);
        setStats(res.data.stats);
      })
      .catch((er) => {
        setShowSpinner(false);
        console.log(er);
      });

    axios
      .get(`${Config.SERVER_URL + "provider/dashboard-recents"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setShowSpinner(false);
        setJobs(res.data.recentJobs);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
    document.title = Config.TITLE.DASHBOARD;
  }, [token]);
  return (
    <div>
      <ProviderCards stats={stats} />
      {/* <CountCard /> */}
      {showSpinner && <SpinnerComponent />}
      {!showSpinner && <Table1 jobData={jobs} />}
    </div>
  );
}
