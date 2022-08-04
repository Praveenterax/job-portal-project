import React from "react";
import classes from "./Layout.module.css";
import Navigation from "../navigation/Navigation";
import { Container } from "react-bootstrap";
// import MyNavigation from "../navigation/MyNavigation";

const Layout = (props) => {
  return (
    <div className={classes.content}>
      <Navigation />
      {/* <MyNavigation /> */}
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
