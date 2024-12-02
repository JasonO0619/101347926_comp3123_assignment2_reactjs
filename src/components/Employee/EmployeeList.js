import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../Axios/API';
import DeleteEmployee from './DeleteEmployee';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({ department: '', position: '' });

    const positions = ['Developer', 'Manager', 'Analyst', 'Designer', 'Tester', 'Programmer'];
    const departments = ['Tech', 'HR', 'Marketing', 'Finance', 'Social Media', 'Business'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await API.get('/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Failed to fetch employees:', error.message);
            }
        };

        fetchEmployees();
    }, []);

    const fetchFilteredEmployees = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await API.get(`/employees/search?${queryParams}`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to fetch filtered employees:', error.message);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFilteredEmployees();
    };

        const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        sessionStorage.removeItem('authToken');
        
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee List</h2>

            <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

            <button className="btn btn-success mb-3" onClick={() => navigate('/employees/add')}>Add Employee</button>

            <form onSubmit={handleSearch} className="mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={filters.department}
                            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={filters.position}
                            onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                        >
                            <option value="">All Positions</option>
                            {positions.map((pos) => (
                                <option key={pos} value={pos}>
                                    {pos}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <button type="submit" className="btn btn-secondary">Search</button>
                    </div>
                </div>
            </form>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>
                                <button className="btn btn-info me-2" onClick={() => navigate(`/employees/${emp._id}`)}>View Details</button>
                                <button className="btn btn-warning me-2" onClick={() => navigate(`/employees/edit/${emp._id}`)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => navigate(`/employees/delete/${emp._id}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
