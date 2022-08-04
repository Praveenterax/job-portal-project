import React from "react";
import classes from "./Pagination.module.css";
export default function Pagination() {
  return (
    <ul className={classes.paginate}>
      <li className="page-item">
        <a className="page-link" href="#a">
          Previous
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#b">
          1
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#c">
          2
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#d">
          3
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#e">
          Next
        </a>
      </li>
    </ul>
  );
}
