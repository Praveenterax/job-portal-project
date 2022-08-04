import React from "react";
import Navbar1 from "./Navbar/Navbar";
// import CountCard from "./Card/CountCard.js";
import Table1 from "./Table/DashboardTable";
const Udashboard = () => {
  return (
    <div>
      <Navbar1 />
      <br />
      <h1>Nivetha Cards</h1>
      {/* <CountCard /> */}
      <br />
      <Table1 />
      {/* <h1> This is users dashboard page </h1> */}
    </div>
  );
};

export default Udashboard;
