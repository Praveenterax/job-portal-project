import "./Content.css";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import classes from "./Content1.module.css";

// import reportsData from "./Reports_data_new.json";

//date filtering
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

function Content1() {
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const rowData = reportsData;
  const rowData = [
    {
      jobid: 12134,
      jobtitle: "Software",
      username: "Sarath",
      date: "09-02-2022",
      emailid: "sarath@gmail.com",
    },
    {
      jobid: 12135,
      jobtitle: "Software",
      username: "Praveen",
      date: "19-02-2022",
      emailid: "Praveen@gmail.com",
    },
    {
      jobid: 12136,
      jobtitle: "Software",
      username: "Nivetha",
      date: "01-03-2022",
      emailid: "Nivetha@gmail.com",
    },
    {
      jobid: 12137,
      jobtitle: "Software",
      username: "Charan",
      date: "10-03-2022",
      emailid: "Charan@gmail.com",
    },
    {
      jobid: 12138,
      jobtitle: "Software",
      username: "Hari",
      date: "25-03-2022",
      emailid: "Hari@gmail.com",
    },
  ];

  const columns = [
    { headerName: "JobId", field: "jobid", headerClass: "styl" },
    { headerName: "UserName", field: "username", headerClass: "styl" },
    { headerName: "JobTitle", field: "jobtitle", headerClass: "styl" },
    { headerName: "EmailId", field: "emailid", headerClass: "styl" },
    {
      headerName: "Date",
      field: "date",
      headerClass: "styl",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
  ];

  const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        // alert("Start Date should be before End Date")
        // setEndDate('')
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("date");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);

  //csv

  const Jobs = [
    {
      JobId: 12134,
      UserName: "Sarath",
      JobTitle: "Software",
      EmailId: "sarath@gmail.com",
    },
    {
      JobId: 12135,
      UserName: "Praveen",
      JobTitle: "Software",
      EmailId: "Praveen@gmail.com",
    },
    {
      JobId: 12136,
      UserName: "Niveths",
      JobTitle: "Software",
      EmailId: "Nivetha@gmail.com",
    },
    {
      JobId: 12137,
      UserName: "Charan",
      JobTitle: "Software",
      EmailId: "Charan@gmail.com",
    },
    {
      JobId: 12138,
      UserName: "Hari",
      JobTitle: "Software",
      EmailId: "hari@gmail.com",
    },
  ];

  const headers = [
    {
      label: "JobId",
      key: "JobId",
    },
    {
      label: "UserName",
      key: "UserName",
    },
    {
      label: "JobTitle",
      key: "JobTitle",
    },
    {
      label: "EmailId",
      key: "EmailId",
    },
  ];

  const csvLink = {
    headers: headers,
    data: Jobs,
    filename: "csvfile.csv",
  };
  return (
    <Container>
      <div className="App">
        <Row>
          <Col>
            <span className={`${classes.span1} float-start`}>Reports</span>
          </Col>
        </Row>

        <div className="ag-theme-alpine" style={{ height: 300 }}>
          <Row>
            <Col className={classes.design}>
              <span className={`${classes.fstyle} float-start`}>
                Start Date
              </span>

              <input
                className={`${classes.aligningst} float-start`}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <span className={`${classes.fstyle} float-start`}>End Date </span>
              <input
                className={`${classes.aligningst} float-start`}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <Button className={`${classes.btnstyle} bg-primary float-end`}>
                <CSVLink className={classes.sty11} {...csvLink}>
                  Export to CSV
                </CSVLink>
              </Button>
            </Col>
          </Row>
          <Row>
            <Row className={classes.rowStyle}>
              <Col>
                <span className={`${classes.span1} float-start `}>
                  Recent Jobs
                </span>
              </Col>
            </Row>
          </Row>

          <AgGridReact
            rowData={rowData}
            columnDefs={columns}
            defaultColDef={defColumnDefs}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </Container>
  );
}

export default Content1;
