import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../Axios/API';

const ViewDetails = () => {
    const { eid } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await API.get(`/employees/${eid}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Failed to fetch employee details:', error.message);
            }
        };
        fetchEmployee();
    }, [eid]);

    if (!employee) return <p>Loading...</p>;

    const GoBack = () => {
        navigate('/employees'); 
    };

    return (
        <div className="container mt-5">
             <button type="button" className="btn btn-secondary" onClick={GoBack}>Go Back</button>
            <h2 className="text-center mb-4">Employee Details</h2>
            <div className="card p-4">
                <p><strong>First Name:</strong> {employee.first_name}</p>
                <p><strong>Last Name:</strong> {employee.last_name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Salary:</strong> ${employee.salary}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 text-center">
            </div>
        </div>
        
    );
};

export default ViewDetails;
