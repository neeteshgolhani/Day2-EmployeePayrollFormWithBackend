import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo/logo.png";
import addUserIcon from "../../Logo/add-24px.svg";
import searchIcon from "../../Logo/searchIcon.png"
import "./front-form.css";
import EmployeeService from "../../service/EmployeeService"
function Submit() {
  const [searchId, setSearchId] = useState("");
  const [foundEmployeeData, setFoundEmployeeData] = useState(null);
  const [searchBoxVisible, setSearchBoxVisible] = useState(false); 


  const navigate = useNavigate();
  const redirectToSettEvent = () => {
      navigate("/");
    };
    const [employeeData, setEmployeeData] = useState([]);
    useEffect(() => {
      // Fetch all employees when the component mounts
      EmployeeService.getAllEmployees()
        .then((response) => {
          console.log(response);
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employees: ", error);
        });
    }, []);
    const handleEdit = (id) => {
      navigate(`/edit/${id}`);
    };
    const handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (confirmDelete) {
        EmployeeService.removeEmployee(id)
          .then(() => {
            // Remove the deleted employee from the state
            setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
            alert("Employee deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting employee: ", error);
            alert("Error deleitng employee.");
          });
      }
      
    };
    const toggleSearchBox = () => {
      setSearchBoxVisible(!searchBoxVisible);
    };
    const handleSearch = () => {
      if (searchId.trim() === "") {
        alert("Please enter a valid employee ID.");
        return;
      }
  
      EmployeeService.findEmployeeById(searchId)
        .then((response) => {
          const employeeData = response.data.data;
          if (employeeData) {
            // Set the found employee data to state
            setFoundEmployeeData(employeeData);
          } else {
            alert("Employee not found.");
            setFoundEmployeeData(null); // Clear previous search results
          }
        })
        .catch((error) => {
          console.error("Error searching for employee: ", error);
          alert("Please enter a valid employee ID");
          setFoundEmployeeData(null); // Clear previous search results
        });
    };
  return (
    <div>
      <header class="header-content header">
    <div class="logo-content">
    <img src={Logo} alt="logo" />
      <div>
        <span class="emp-text">EMPLOYEE</span><br></br>
        <span class="emp-text emp-payroll">PAYROLL</span>
      </div>

    <div
            className="search-icon"
            onClick={toggleSearchBox}
          >
            <img src={searchIcon} alt="Search" />
          </div>
          {/* Conditionally render the search box based on searchBoxVisible */}
          {searchBoxVisible && (
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          )}
        </div>
    <button id="add-user-button" onClick={redirectToSettEvent} value={addUserIcon}>
      Add User
          <img src={addUserIcon} alt="Add User" />
        </button>
  </header>
  <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Profile</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {foundEmployeeData && (
  <div>
    <h2>Employee Details</h2>
    <p>Name: {foundEmployeeData.name}</p>
    <p>Profile: {foundEmployeeData.profile}</p>
    <p>Gender: {foundEmployeeData.gender}</p>
    <p>Department: {foundEmployeeData.department.join(", ")}</p>
    <p>Salary: {foundEmployeeData.salary}</p>
    <p>Start Date: {foundEmployeeData.startDate}</p>
    <p>Notes: {foundEmployeeData.notes}</p>
  </div>
)}

        {employeeData && employeeData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.profile}</td>
              <td>{employee.gender}</td>
              <td>{employee.department.join(", ")}</td>
              <td>{employee.salary}</td>
              <td>{employee.startDate}</td>
              <td>{employee.notes}</td>
              <td>
                <button onClick={() => handleEdit(employee.id)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Submit;