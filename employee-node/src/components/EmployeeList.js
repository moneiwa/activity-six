// EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './employee.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    employeePosition: '',
    id: '',
    image: '',
  });

  // Fetch employees from the backend
  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployeesData(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle Add Employee
  const handleAddEmployee = async () => {
    try {
      await axios.post('http://localhost:5000/api/employees', newEmployee);
      fetchEmployeesData(); // Refresh the list after adding
      setNewEmployee({ name: '', surname: '', email: '', phoneNumber: '', employeePosition: '', id: '', image: '' }); // Clear input fields
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>
<div className='container ' >
      {/* Add Employee Form */}
      <div>
        <h3>Add Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Surname"
          value={newEmployee.surname}
          onChange={(e) => setNewEmployee({ ...newEmployee, surname: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newEmployee.phoneNumber}
          onChange={(e) => setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.employeePosition}
          onChange={(e) => setNewEmployee({ ...newEmployee, employeePosition: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newEmployee.image}
          onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      {/* Employee List */}
      <div className='table-container'>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Employee Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.surname}</td>
          <td>{employee.email}</td>
          <td>{employee.phoneNumber}</td>
          <td>{employee.employeePosition}</td>
          <td>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      
    </div>
    </div>
  );
};

export default EmployeeList;
