import React from "react";

import { Link, useNavigate, NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const Navigation = () => {
  // const selectauthToken = (rootstate) => rootstate.authToken;
  // const authToken = useSelector(selectauthToken);
  // console.log(authToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("token");
  const redAuthToken = jwtDecode(authToken);

  const logoutHandler = () => {
    dispatch({ type: "CLEARAUTHTOKEN" });
    navigate("/", { replace: true });
  };

  return (
    <Navbar
      fixed="top"
      variant="dark"
      expand="md"
      bg="primary"
      className={classes.nav}
    >
      <Container fluid>
        {/* <Navbar.Brand href="/dashboard" className={classes.brand}>
          Job Hunt
        </Navbar.Brand> */}

        <NavLink
          // activeClassName={classes.active}
          className={classes.brand}
          to="/dashboard"
        >
          <span className={classes.logo}>
            <i className="bi bi-search"></i>
          </span>
          Job Hunt
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          {redAuthToken.role === "Admin" && (
            <Nav className={`me-auto ${classes.pageLinks}`}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-users"
              >
                Users
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-jobs"
              >
                Jobs
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/reports"
              >
                Reports
              </NavLink>
            </Nav>
          )}
          {redAuthToken.role === "Job Provider" && (
            <Nav className={`me-auto ${classes.pageLinks}`}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-applicants"
              >
                Applicant
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/manage-jobs"
              >
                Jobs
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/provider-report"
              >
                Reports
              </NavLink>
            </Nav>
          )}
          {redAuthToken.role === "User" && (
            <Nav className={`me-auto ${classes.pageLinks}`}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/dashboard"
              >
                Apply
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/appliedJobs"
              >
                Applied Jobs
              </NavLink>
              {/* <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/ProviderReport"
                onClick={(event) => event.preventDefault()}
              >
                Reports
              </NavLink> */}
            </Nav>
          )}
          <Nav>
            {/* <NavDropdown
              id="nav-dropdown-dark-example"
              title={
                <span className={classes.username}>
                  <span className={classes.userLogo}>
                    <i className="bi bi-person-circle"></i>
                  </span>
                  {authToken.username}
                </span>
              }
              menuVariant="light"
              align="end"
              className={classes.user}
              as={"button"}
            >
              <NavDropdown.Item>
                <NavLink
                  className={classes.changePassword}
                  to="/change-password"
                >
                  Change Password
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <Dropdown.Item href="/login">Logout</Dropdown.Item>
            </NavDropdown>
          </Nav> */}
            <Dropdown align={"end"} className={classes.dropDown}>
              <Dropdown.Toggle className={classes.user}>
                <span className={classes.username}>
                  <span className={classes.userLogo}>
                    <i className="bi bi-person-circle"></i>
                  </span>
                  {redAuthToken.userName}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link to="/change-password" className={classes.changePassword}>
                  Change Password
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item
                  as={"button"}
                  onClick={logoutHandler}
                  className={classes.changePassword}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
