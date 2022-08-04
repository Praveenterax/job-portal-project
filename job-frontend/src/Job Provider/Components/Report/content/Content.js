import React from "react";
import {
  FormGroup,
  FormControl,
  Col,
  Row,
  Table,
  Container,
  FormLabel,
} from "react-bootstrap";
import classes from "./Content.module.css";
import { useState, useEffect } from "react";
import useTable from "../../../../hooks/useTable";
import TableFooter from "../../../../components/dashboard/Tables/TableFooter";
import { CSVLink } from "react-csv";
import axios from "axios";
import Config from "../../../../config/Config.json";
// import dateFormat from 'dateformat';

function Reports() {
  const [reportsData, setReportsData] = useState([]);

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(reportsData, page, 5);

  const [forminputs, setFormInputs] = useState({});
  const [filterdates, setFilterDates] = useState({
    startdate: "",
    enddate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTd = async () => {
      const res = await axios.get(`${Config.SERVER_URL + "provider/jobs/"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const updatedList = [...res.data.jobs];
      // const updatedList = ord.map(item =>
      //   {

      //       return {...item, startDate:dateFormat(item.startDate,configData.DATE_FORMAT,true)}
      //       //return{...item,created:new Intl.DateTimeFormat("en-IN","mmmm dd, yyyy" ).format(item.created)}
      //       // configData.DATE_FORMAT_OBJECT
      //   })
      // setData(updatedList);
      setReportsData(updatedList);
    };
    fetchTd();
  }, []);

  // useEffect(() => {

  //   const fetchbug = async () => {
  //   await axios.get("http://localhost:3000/bugs")
  //       .then(res => {
  //           const bugs = res.data;
  //           setJsonBugs(bugs);

  //       });
  //   };
  //   fetchbug();
  // })
  const validateStart = () => {
    let error = "";
    if (!forminputs["startdate"] && forminputs["enddate"]) {
      error = "please enter start date";
    }
    if (!forminputs["startdate"] && !forminputs["enddate"]) {
      setErrors({});
    }
    setErrors((values) => ({ ...values, startdate: error }));
  };

  const validateEnd = () => {
    let error = "";
    if (!forminputs["enddate"] && forminputs["startdate"]) {
      error = "please enter end date";
    }
    if (!forminputs["startdate"] && !forminputs["enddate"]) {
      setErrors({});
    } else if (forminputs["enddate"] && forminputs["startdate"]) {
      let startdate = new Date(forminputs["startdate"]);
      let enddate = new Date(forminputs["enddate"]);
      if (startdate > enddate) {
        error = "end date should be greater than start date";
      }
    }
    setErrors((values) => ({ ...values, enddate: error }));
  };

  const validate = () => {
    validateStart();
    validateEnd();
    if (errors.startdate || errors.enddate) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      setFilterDates({ ...forminputs });
    }
    let stdate = new Date(forminputs.startdate);
    let endate = new Date(forminputs.enddate);
    let newData = reportsData.filter((report) => {
      // console.log(report);
      let date = new Date(report.startDate);
      if (date >= stdate && date <= endate) {
        return report;
      }
      // return;
    });
    // console.log(newData);
    setReportsData(newData);
  };
  // console.log(reportsData);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormInputs((values) => ({ ...values, [name]: value }));
  };
  const Jobs = [...reportsData];

  const headers = [
    {
      label: "JobId",
      key: "jobId",
    },
    {
      label: "ProviderId",
      key: "providerId",
    },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "StartDate",
      key: "startDate",
    },
    {
      label: "EndDate",
      key: "endDate",
    },
  ];

  const csvLink = {
    headers: headers,
    data: Jobs,
    filename: "csvfile.csv",
  };

  return (
    <>
      <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.repo} col-md-3`}>
            <span className={classes.span11}>Reports</span>
          </Col>
        </Row>

        <Row className={classes.filters}>
          <Col className={`${classes.str1} ${classes}`}>
            <FormGroup controlId="reportstartdate">
              <Row>
                <Col>
                  <FormLabel className={classes.textstyl}>
                    <b>StartDate</b>
                  </FormLabel>
                </Col>
                <Col className={classes.input}>
                  <FormControl
                    className={classes.str2}
                    onBlur={validateStart}
                    onChange={handleChange}
                    name="startdate"
                    type="date"
                    placeholder="Start Date"
                  />

                  <Col className="text-danger text-center">
                    {errors.startdate}
                  </Col>
                </Col>
              </Row>
            </FormGroup>
          </Col>

          <Col className={classes.end1}>
            <FormGroup controlId="reportenddate">
              <Row>
                <Col>
                  <FormLabel className={classes.textstyl}>
                    <b>EndDate</b>
                  </FormLabel>
                </Col>
                <Col className={classes.input}>
                  <FormControl
                    className={classes.str21}
                    onBlur={validateEnd}
                    onChange={handleChange}
                    name="enddate"
                    type="date"
                    placeholder="End Date"
                  />

                  <Col className="text-danger text-center">
                    {errors.enddate}
                  </Col>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col className={classes.actions}>
            <Col className={classes.subm}>
              <button className={classes.buttonsty} onClick={handleSubmit}>
                Submit
              </button>
            </Col>
            <Col className={classes.expo}>
              <button className={classes.csvsty}>
                <CSVLink className={classes.sty11} {...csvLink}>
                  Export to CSV
                </CSVLink>
              </button>
            </Col>
          </Col>
        </Row>

        <div className={classes.tableBox}>
          <Table striped hover>
            <thead>
              <tr className={classes.tableHeader}>
                {/* <th>JobId</th>
                <th>providerId</th> */}
                <th>Title</th>
                <th>description</th>
                <th>Category</th>
                <th>StartDate</th>
                <th>EndDate</th>
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {slice.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.title}</td>
                  <td>{contact.description}</td>
                  <td>{contact.category}</td>
                  <td>{contact.startDate}</td>
                  <td>{contact.endDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </Container>
    </>
  );
}
export default Reports;
