import React, { useEffect } from "react";

import ApplicantTab from "../../Job Provider/Components/Applicants/ApplicantTab";

import Config from "../../config/Config.json";

export default function ApplicantsPage() {
  useEffect(() => {
    document.title = Config.TITLE.MANAGE_APPLICANTS;
  }, []);

  return <ApplicantTab />;
}
