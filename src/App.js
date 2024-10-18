import React, { useState, useEffect } from "react";
import "./styles.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        alert("failed to fetch data");
      }
    };
    fetchData();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get the current rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle clicking the "Next" button
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle clicking the "Previous" button
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttoncontainer">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1} // Better accessibility
        >
          Previous
        </button>
        <span
          id="page-number"
          style={{ margin: "0 15px", fontWeight: "bold", fontSize: "16px" }}
        >
          {currentPage}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages} // Better accessibility
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
