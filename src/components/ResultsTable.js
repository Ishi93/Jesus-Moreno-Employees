import React from "react";
import moment from "moment";

const ResultsTable = ({ data }) => {
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const calculateDaysWorked = (start, end) => {
    const startDate = moment(start);
    const endDate = end ? moment(end) : moment();
    return endDate.diff(startDate, "days");
  };

  const getPairs = (data) => {
    const pairs = {};
    data.forEach((row) => {
      const pair = [row.EmpID, row.ProjectID];
      const pairStr = JSON.stringify(pair);
      if (pairStr in pairs) {
        pairs[pairStr].push(row);
      } else {
        pairs[pairStr] = [row];
      }
    });
    return pairs;
  };

  const pairs = getPairs(data);

  const getDaysWorked = (pairData) => {
    let totalDays = 0;
    for (let i = 0; i < pairData.length; i++) {
      const { DateFrom, DateTo } = pairData[i];
      totalDays += calculateDaysWorked(DateFrom, DateTo);
    }
    return totalDays;
  };

  const getPairsWithDaysWorked = () => {
    const pairsWithDaysWorked = [];
    for (const pairStr in pairs) {
      const pairData = pairs[pairStr];
      const [EmpID1, EmpID2] = JSON.parse(pairStr);
      const daysWorked = getDaysWorked(pairData);
      pairsWithDaysWorked.push({
        EmpID1,
        EmpID2,
        ProjectID: pairData[0].ProjectID,
        DaysWorked: daysWorked,
      });
    }
    return pairsWithDaysWorked;
  };

  const pairsWithDaysWorked = getPairsWithDaysWorked();

  const getMaxPair = (pairs) => {
    let maxPair = null;
    let maxDaysWorked = 0;
    pairs.forEach((pair) => {
      const { DaysWorked } = pair;
      if (DaysWorked > maxDaysWorked) {
        maxPair = pair;
        maxDaysWorked = DaysWorked;
      }
    });
    return maxPair;
  };

  const maxPair = getMaxPair(pairsWithDaysWorked);

  return (
    <table>
      <thead>
        <tr>
          <th>EmpID 1</th>
          <th>EmpID 2</th>
          <th>ProjectID</th>
          <th>Days Worked</th>
        </tr>
      </thead>
      <tbody>
        {pairsWithDaysWorked.map((pair) => (
          <tr key={`${pair.EmpID1}-${pair.EmpID2}-${pair.ProjectID}`}>
            <td>{pair.EmpID1}</td>
            <td>{pair.EmpID2}</td>
            <td>{pair.ProjectID}</td>
            <td>{pair.DaysWorked}</td>
          </tr>
        ))}
      </tbody>
      {maxPair && (
        <tfoot>
          <tr>
            <td colSpan={3}>Max Days Worked:</td>
            <td>{maxPair.DaysWorked}</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default ResultsTable;
