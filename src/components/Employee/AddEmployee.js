import React, { useState } from 'react';
import API from '../../Axios/API';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });

    const navigate = useNavigate();

    const positions = ['Developer', 'Manager', 'Analyst', 'Designer', 'Tester', 'Programmer', ''];
    const departments = ['Tech', 'HR', 'Marketing', 'Finance', 'Social Media', 'Business'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/employees', formData);
            alert('Employee added successfully');
            navigate('/employees');
        } catch (error) {
            console.error('Failed to add employee:', error.message);
            alert('Failed to add employee');
        }
    };

    const GoBack = () => {
        navigate('/employees'); 
    };

    return (
        
        <form onSubmit={handleSubmit} className="container mt-5">
            <button type="button" className="btn btn-secondary" onClick={GoBack}>Go Back</button>
            <h2 className="text-center mb-4">Add Employee</h2>
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="position" className="form-label">Position</label>
                <select
                    name="position"
                    id="position"
                    className="form-select"
                    value={formData.position}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Position</option>
                    {positions.map((pos, index) => (
                        <option key={index} value={pos}>
                            {pos}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="salary" className="form-label">Salary</label>
                <input
                    type="number"
                    name="salary"
                    id="salary"
                    className="form-control"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="date_of_joining" className="form-label">Date of Joining</label>
                <input
                    type="date"
                    name="date_of_joining"
                    id="date_of_joining"
                    className="form-control"
                    value={formData.date_of_joining}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <select
                    name="department"
                    id="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Department</option>
                    {departments.map((dept, index) => (
                        <option key={index} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Employee</button>
        </form>
    );
};

export default AddEmployee;
