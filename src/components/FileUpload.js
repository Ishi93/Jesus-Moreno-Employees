import React, { useState } from "react";
import Papa from "papaparse";
import moment from "moment"; // import moment.js
import ResultsTable from "./ResultsTable";

const FileUpload = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        // parsing dates using moment.js
        const parsedData = result.data.map((row) => ({
          ...row,
          DateFrom: moment(row.DateFrom, ["MM/DD/YYYY", "YYYY-MM-DD"]).toDate(),
          DateTo: moment(row.DateTo, ["MM/DD/YYYY", "YYYY-MM-DD"]).toDate(),
        }));
        setData(parsedData);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && <ResultsTable data={data} />}
    </div>
  );
};

export default FileUpload;