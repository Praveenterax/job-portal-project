import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, NavDropdown, Container, Nav, Dropdown } from "react-bootstrap";
import classes from "./Navbar.module.css";
// import { BsSearch } from "react-icons/bs";

const Navbar1 = () => {
  return (
    <Navbar variant="dark" expand="md" className={classes.nav}>
      <Container fluid>
        <Link style={{ textDecoration: "none" }} to="/">
          <Navbar.Brand className={classes.brand}>
            Job Hunt
            {/* <BsSearch /> */}
            {/* <VscSearch/> */}
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className={`me-auto ${classes.pageLinks}`}>
            <NavLink activeClassName={classes.active} to="/user">
              Users
            </NavLink>
            <NavLink activeClassName={classes.active} to="/manageJobs">
              Jobs
            </NavLink>
            <NavLink activeClassName={classes.active} to="/Report">
              Reports
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Admin Name"
              menuVariant="light"
              align="end"
              className={classes.user}
            >
              <NavDropdown.Item href="#action/3.4">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <Dropdown.Item as="button">Logout</Dropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navbar1;
