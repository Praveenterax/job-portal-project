import React, { useEffect } from "react";

import ManageShortlisted from "../../Job Provider/Components/Applicants/ManageShortlisted";

import Config from "../../config/Config.json";

export default function ApplicantsPage() {
  useEffect(() => {
    document.title = Config.TITLE.MANAGE_APPLICANTS;
  }, []);

  return <ManageShortlisted />;
}
