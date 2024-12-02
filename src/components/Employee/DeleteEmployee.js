import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../Axios/API';

const DeleteEmployee = () => {
    const { eid } = useParams(); 
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await API.get(`/employees/${eid}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Failed to fetch employee details:', error.message);
                alert('Failed to load employee details.');
                navigate('/employees'); 
            }
        };

        fetchEmployee();
    }, [eid, navigate]);

    const handleDelete = async () => {
        if (deleteConfirmation.toLowerCase() !== 'delete') {
            alert('You must type "delete" to confirm.');
            return;
        }

        try {
            await API.delete(`/employees/${eid}`);
            alert('Employee deleted successfully');
            navigate('/employees');
        } catch (error) {
            console.error('Failed to delete employee:', error.message);
            alert('Failed to delete employee.');
        }
    };

    if (!employee) {
        return <div>Loading employee details...</div>;
    }

    const GoBack = () => {
        navigate('/employees'); 
    };

    return (
        <div className="container mt-5">
            <button type="button" className="btn btn-secondary" onClick={GoBack}>Go Back</button>
            <h2 className="text-center">Delete Employee</h2>
            <div className="card p-4 mt-4">
                <h5>Employee Details</h5>
                <p><strong>First Name:</strong> {employee.first_name}</p>
                <p><strong>Last Name:</strong> {employee.last_name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Department:</strong> {employee.department}</p>
            </div>

            <div className="mt-4">
                <h6>Type "delete" below to confirm deletion:</h6>
                <input
                    type="text"
                    className="form-control mb-3"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                />
                <button className="btn btn-danger w-100" onClick={handleDelete}>Delete Employee</button>
            </div>
        </div>
    );
};

export default DeleteEmployee;
