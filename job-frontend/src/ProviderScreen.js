import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import SpinnerComponent from "./components/UI/SpinnerComponent";
import Layout from "./components/layout/Layout";
// import ProvDashboard from "./pages/ProviderPages/ProvDashboard";
// import ApplicantsPage from "./pages/ProviderPages/ApplicantPage";

// import ReportPage from "./pages/ProviderPages/ReportPage";
// import Changepassword from "./components/UI/ChangePassword";

// import ManageJobsPage from "./pages/ProviderPages/ManageJobsPage";

const ProvDashboard = React.lazy(() =>
  import("./pages/ProviderPages/ProvDashboard")
);
const ApplicantsPage = React.lazy(() =>
  import("./pages/ProviderPages/ApplicantPage")
);
const ManageApplicantPage = React.lazy(() =>
  import("./pages/ProviderPages/ManageApplicantPage")
);
const ViewShortlistedPage = React.lazy(() =>
  import("./pages/ProviderPages/ViewShortlistedPage")
);
const ReportPage = React.lazy(() => import("./pages/ProviderPages/ReportPage"));
const Changepassword = React.lazy(() =>
  import("./components/UI/ChangePassword")
);
const ManageJobsPage = React.lazy(() =>
  import("./pages/ProviderPages/ManageJobsPage")
);

export default function ProviderScreen() {
  return (
    <Layout>
      <Suspense fallback={<SpinnerComponent />}>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route exact path="/dashboard" element={<ProvDashboard />} />

          <Route exact path="/manage-jobs" element={<ManageJobsPage />} />
          <Route exact path="/manage-applicants" element={<ApplicantsPage />} />
          <Route
            exact
            path="/manage-applicants/:jobId"
            element={<ManageApplicantPage />}
          />
          <Route
            exact
            path="/view-shortlists/:jobId"
            element={<ViewShortlistedPage />}
          />

          <Route exact path="provider-report" element={<ReportPage />} />

          <Route path="/change-password" element={<Changepassword />} />

          {/* </Route> */}
        </Routes>
      </Suspense>
    </Layout>
  );
}
