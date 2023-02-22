import React from "react";

const DataDisplay = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Time</th>
          <th>G(i)</th>
          <th>Gb(i)</th>
          <th>Gd(i)</th>
          <th>Gcs(i)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.month}</td>
            <td>{item.time}</td>
            <td>{item["G(i)"]}</td>
            <td>{item["Gb(i)"]}</td>
            <td>{item["Gd(i)"]}</td>
            <td>{item["Gcs(i)"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataDisplay;
