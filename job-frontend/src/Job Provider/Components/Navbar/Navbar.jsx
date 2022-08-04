import { NavLink } from "react-router-dom";
import { Navbar, NavDropdown, Container, Nav, Dropdown } from "react-bootstrap";
import classes from "./Navbar.module.css";
// import { BsSearch } from "react-icons/bs";
// import { VscSearch } from "react-icons/vsc";
const Navbar1 = () => {
  return (
    <Navbar variant="dark" expand="md" className={classes.nav}>
      <Container fluid>
        {/* <Navbar.Brand href="/dashboard" className={classes.brand}>
          Job Hunt
        </Navbar.Brand> */}
        <NavLink
          // activeClassName={classes.active}
          className={classes.brand}
          to="/"
        >
          Job Hunt
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className={`me-auto ${classes.pageLinks}`}>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/applicant"
            >
              Applicant
            </NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/ProvidermanageJobs"
            >
              Jobs
            </NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/ProviderReport"
            >
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

              <Dropdown.Item href="/login">Logout</Dropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
