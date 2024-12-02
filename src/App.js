import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/User/Login';
import SignUp from './components/User/SignUp';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';
import ViewDetails from './components/Employee/ViewDetails';
import DeleteEmployee from './components/Employee/DeleteEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/employees/edit/:eid" element={<UpdateEmployee />} />
                <Route path="/employees/:eid" element={<ViewDetails />} />
                <Route path="/employees/delete/:eid" element={<DeleteEmployee/>} />
            </Routes>
        </Router>
    );
};

export default App;
