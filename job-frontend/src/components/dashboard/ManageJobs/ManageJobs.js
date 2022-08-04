import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ManageTab from "./ManageTab";
import ReactModal from "../../UI/ReactModal";
import AddJob from "./AddJob/AddJob";
import SpinnerComponent from "../../UI/SpinnerComponent";
import classes from "../../../pages/AdminPages/ManageUsersPage.module.css";
import Config from "../../../config/Config.json";

let jobId;

export default function ManageJobs() {
  const [showAddJobModal, setAddJobModal] = useState(false);
  const [action, setAction] = useState(false);

  const [showSpinner, setSpinner] = useState(false);
  const [showEditJobModal, setEditJobModal] = useState({
    show: false,
    inititalValues: {},
  });
  const [showDeleteModal, setDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  const addJobHander = (values) => {
    // console.log(values);
    setSpinner(true);

    axios
      .post(`${Config.SERVER_URL + "admin/add-job"}`, values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        setSpinner(false);
        setAction(!action);
        setAddJobModal(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };

  const editJobHandler = (jobData) => {
    setEditJobModal({ show: true, inititalValues: jobData });
  };

  const editJobItemHandler = (values) => {
    const jobId = values._id;
    const editValues = {
      title: values.title,
      description: values.description,
      category: values.category,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    // console.log(editValues);
    setSpinner(true);

    axios
      .put(`${Config.SERVER_URL + "admin/edit-job/" + jobId}`, editValues, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setEditJobModal((prev) => {
          return { show: false, inititalValues: prev.inititalValues };
        });

        setSpinner(false);

        setAction(!action);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };

  const deleteModalHandler = (jId) => {
    jobId = jId;
    setDeleteModal(true);
  };

  const deleteJobHandler = () => {
    setDeleteModal(false);
    setSpinner(true);
    axios
      .delete(`${Config.SERVER_URL + "admin/jobs/" + jobId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setAction(!action);
        setSpinner(false);
        toast.success(result.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };
  return (
    <>
      {/* EDIT MODAL */}

      {showSpinner && (
        <Container className={classes.overlaySpinner}>
          <SpinnerComponent />
        </Container>
      )}
      <ReactModal
        show={showAddJobModal}
        onHide={() => {
          setAddJobModal(false);
        }}
        formModal={true}
        buttonTitle="Add Job"
        formId="manageJob-form"
      >
        {{
          title: "Add new Job",
          body: <AddJob onAdd={addJobHander} />,
        }}
      </ReactModal>
      <ReactModal
        show={showEditJobModal.show}
        onHide={() => {
          setEditJobModal((prev) => {
            return { show: false, inititalValues: prev.inititalValues };
          });
        }}
        formModal={true}
        buttonTitle="Edit Job"
        formId="manageJob-form"
      >
        {{
          title: "Edit the Job",
          body: (
            <AddJob
              jobInfo={showEditJobModal.inititalValues}
              onAdd={editJobItemHandler}
            />
          ),
        }}
      </ReactModal>
      {/* DELETE MODAL */}
      <ReactModal
        show={showDeleteModal}
        isDelete={true}
        onOk={deleteJobHandler}
        onHide={() => {
          setDeleteModal(false);
        }}
      >
        {{ title: "Delete Job", body: <h1>Are you sure?</h1> }}
      </ReactModal>

      <ManageTab
        onShowAddUser={setAddJobModal}
        onEditJob={editJobHandler}
        onShowDelete={deleteModalHandler}
        changes={action}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
