import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormikForm from "../../components/dashboard/ManageUsers/AddUsersFormik/FormikForm";
import ManageUsers from "../../components/dashboard/ManageUsers/ManageUsers";
import Config from "../../config/Config.json";
import classes from "./ManageUsersPage.module.css";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const ReactModal = React.lazy(() => import("../../components/UI/ReactModal"));

let userId;
const ManageUsersPage = () => {
  const [showAddUserModal, setAddUserModal] = useState(false);
  const [action, setAction] = useState(false);

  const [showSpinner, setSpinner] = useState(false);
  const [showEditUserModal, setEditUserModal] = useState({
    show: false,
    inititalValues: {},
  });
  const [showDeleteModal, setDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  const editUserHandler = (userData) => {
    setEditUserModal({ show: true, inititalValues: userData });
  };

  useEffect(() => {
    document.title = Config.TITLE.MANAGE_USERS;
    // setAction(false);
  }, []);

  const deleteModalHandler = (uId) => {
    userId = uId;
    setDeleteModal(true);
  };

  const deleteItemHandler = () => {
    // console.log("delete click", userId);
    setDeleteModal(false);
    setSpinner(true);
    axios
      .delete(
        `${Config.SERVER_URL + "admin/users/" + userId}`,
        // ,`http://localhost:8080/admin/users/${userId}`
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        // console.log(result);
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

  const addUserHandler = (values) => {
    setSpinner(true);
    axios
      .post(
        `${Config.SERVER_URL + "admin/add-user"}`,
        { ...values },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setSpinner(false);
        setAction(!action);
        setAddUserModal(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };
  const editUserItemHandler = (values) => {
    const u_id = values._id;
    const updatedValues = {
      name: values.name,
      email: values.email,
      password: values.password,
      mobile: values.mobile,
      age: values.age,
      gender: values.gender,
      qualification: values.qualification,
      experience: values.experience,
      role: values.role,
    };
    setSpinner(true);
    axios
      .put(`${Config.SERVER_URL + "admin/edit-user/" + u_id}`, updatedValues, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        setEditUserModal((prev) => {
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

  return (
    <React.Fragment>
      <Suspense fallback={<SpinnerComponent />}>
        {showSpinner && (
          <Container className={classes.overlaySpinner}>
            <SpinnerComponent />
          </Container>
        )}
        <ReactModal
          show={showAddUserModal}
          onHide={() => {
            setAddUserModal(false);
          }}
          formModal={true}
          buttonTitle="Add User"
          formId="manageUser-form"
        >
          {{
            title: "Add new User",
            body: (
              <FormikForm edit={true} inititalValue onAdd={addUserHandler} />
            ),
          }}
        </ReactModal>
        <ReactModal
          show={showEditUserModal.show}
          onHide={() => {
            setEditUserModal((prev) => {
              return { show: false, inititalValues: prev.inititalValues };
            });
          }}
          formModal={true}
          buttonTitle="Edit User"
          formId="manageUser-form"
        >
          {{
            title: "Edit User",
            body: (
              <FormikForm
                userInfo={showEditUserModal.inititalValues}
                onAdd={editUserItemHandler}
              />
            ),
          }}
        </ReactModal>
      </Suspense>
      <ReactModal
        show={showDeleteModal}
        isDelete={true}
        onOk={deleteItemHandler}
        onHide={() => {
          setDeleteModal(false);
        }}
      >
        {{ title: "Delete user", body: <h5>Are you sure?</h5> }}
      </ReactModal>

      <ManageUsers
        onShowAddUser={setAddUserModal}
        onEditUser={editUserHandler}
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
    </React.Fragment>
  );
};

export default ManageUsersPage;
