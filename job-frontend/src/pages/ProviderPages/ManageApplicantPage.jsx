import React, { useEffect } from "react";

import ManageJobApplicants from "../../Job Provider/Components/Applicants/ManageJobApplicants";

import Config from "../../config/Config.json";

export default function ApplicantsPage() {
  useEffect(() => {
    document.title = Config.TITLE.MANAGE_APPLICANTS;
  }, []);

  return <ManageJobApplicants />;
}
