import React, { useState, useEffect } from 'react';
import styles from '../xpagination/xpagination.module.css';

const PaginationApp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      const result = await response.json();
      setData(result);
      setTotalPages(Math.ceil(result.length / 10));
    } catch (error) {
      console.error('Failed to fetch data');
      alert('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className={styles.tablecontainer}>
      <h1>Employee Data</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationcontainer}>
        <button
          className={styles.paginationbutton}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button  className={styles.paginationbutton}> <span> {currentPage}</span></button>  
        <button
          className={styles.paginationbutton}
          onClick={handleNext}
        
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationApp;
