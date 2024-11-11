import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    employeePosition: '',
    image: '',
  });

  const [editEmployee, setEditEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 

  const fetchEmployeesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      setError('Error fetching employees');
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployeesData();
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Error deleting employee');
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', newEmployee);
      fetchEmployeesData();
      setNewEmployee({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        employeePosition: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Error adding employee');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${editEmployee.id}`, editEmployee);
      fetchEmployeesData();
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Error updating employee');
    }
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee); 
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>

      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!isEditing && (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Employee Position</th>
              <th>ID</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={`${employee.id}-${index}`}>
                  <td>{employee.name}</td>
                  <td>{employee.surname}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.employeePosition}</td>
                  <td>{employee.id}</td>
                  <td>
                    {employee.image && (
                      <img src={employee.image} alt="Employee" style={{ width: '100px', height: '100px' }} />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    <button onClick={() => handleEditClick(employee)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isEditing && (
        <div className="list-form">
          <h2>Edit Employee</h2>
          <form onSubmit={handleUpdate}>
            <div className="main-list">
              <div className="form-container">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editEmployee.name}
                    onChange={handleEditInputChange}
                    required
                  />
                </label>
                <label>
                  Surname:
                  <input
                    type="text"
                    name="surname"
                    value={editEmployee.surname}
                    onChange={handleEditInputChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editEmployee.email}
                    onChange={handleEditInputChange}
                    required
                  />
                </label>
              </div>

              <div className="co">
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editEmployee.phoneNumber}
                    onChange={handleEditInputChange}
                    required
                  />
                </label>
                <label>
                  Employee Position:
                  <input
                    type="text"
                    name="employeePosition"
                    value={editEmployee.employeePosition}
                    onChange={handleEditInputChange}
                    required
                  />
                </label>
                <label>
                  Image URL (Optional):
                  <input
                    type="text"
                    name="image"
                    value={editEmployee.image || ''}
                    onChange={handleEditInputChange}
                  />
                </label>
              </div>
            </div>
            <button type="submit">Update Employee</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      )}

    
      <div className="list-form">
        <h2>Add New Employee</h2>
        <form onSubmit={handleAddEmployee}>
          <div className="main-list">
            <div className="form-container">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Surname:
                <input
                  type="text"
                  name="surname"
                  value={newEmployee.surname}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="co">
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={newEmployee.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Employee Position:
                <input
                  type="text"
                  name="employeePosition"
                  value={newEmployee.employeePosition}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Image URL (Optional):
                <input
                  type="text"
                  name="image"
                  value={newEmployee.image}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default App;
