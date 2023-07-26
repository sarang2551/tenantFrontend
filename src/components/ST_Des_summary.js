import React from 'react';

const data = [
  ['Data 1', 'Data 2'],
  ['Data 3', 'Data 4'],
  ['Data 5', 'Data 6'],
  // More data columns
];

function DesTable() {
  const columnToReplace = 0; // Index of the column to replace
  const newColumnLabel = 'Description'; // New label for the column

  const filteredData = data.map(row => row.filter((_, index) => index !== columnToReplace));

  return (
    <table className="container">
      <thead>
        <tr>
          {filteredData[0].map((_, columnIndex) => (
            <th key={columnIndex}>
              {columnIndex === columnToReplace ? newColumnLabel : `Column ${columnIndex + 1}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cellData, columnIndex) => (
              <td key={columnIndex}>{cellData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DesTable;

