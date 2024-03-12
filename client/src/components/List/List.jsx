import React, { useState } from 'react';
import './List.css'

const List = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const handleEdit = () => {
    // Implement your edit logic here
    console.log('Edit clicked for row:', selectedRow);
  };

  const handleRemove = () => {
    // Implement your remove logic here
    console.log('Remove clicked for row:', selectedRow);
  };

  return (
    <div>
      <div className="table">
        <div className="table-header">
          {Object.keys(data[0]).map((header, index) => (
            <div key={index}>{header}</div>
          ))}
        </div>
        <div className="table-body">
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`table-row ${selectedRow === rowIndex ? 'selected' : ''}`}
              onClick={() => handleRowClick(rowIndex)}
            >
              {Object.values(row).map((value, colIndex) => (
                <div key={colIndex}>{value}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {selectedRow !== null && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>Row {selectedRow + 1} Details:</p>
            <ul>
              {Object.entries(data[selectedRow]).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
