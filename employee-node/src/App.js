import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './App.css';  

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    employeeId: '',  
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
        employeeId: '',
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
    <div className='app-container'>
      <h1>Employee List</h1>

      {loading && <p>Loading employees...</p>}
      {error && <p className="error-message">{error}</p>}

      {!isEditing && (
        <div className="employee-table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th> 
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Employee Position</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employeeId}</td> 
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.employeePosition}</td>
                    <td>
                      {employee.image && (
                        <img src={employee.image} alt="Employee" className="employee-image" />
                      )}
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(employee.id)}>Delete</button>
                      <button className="edit-btn" onClick={() => handleEditClick(employee)}>Update</button>
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
        </div>
      )}

      {isEditing && (
        <div className="form-container">
          <h2>Edit Employee</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-fields">
              <label>
                Employee ID:
                <input
                  type="text"
                  name="employeeId"
                  value={editEmployee.employeeId}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
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
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Update Employee</button>
              <button type="button" onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="form-container">
        <h2>Add New Employee</h2>
        <form onSubmit={handleAddEmployee}>
          <div className="form-fields">
            <label>
              Employee ID:
              <input
                type="text"
                name="employeeId"
                value={newEmployee.employeeId}
                onChange={handleInputChange}
                required
              />
            </label>
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
          <div className="form-buttons">
            <button type="submit" className="submit-btn">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
