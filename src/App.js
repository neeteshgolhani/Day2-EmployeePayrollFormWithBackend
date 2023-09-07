import React from 'react';
import './App.css';
import {Routes, Route, Link } from 'react-router-dom';
import SubmitForm from "./component/payroll-form/submit-form";
import Payrollform from './component/payroll-form/payroll-form';
function App() {
  return (
    <div>
      <nav>
        <Link to="/">payroll-form</Link><br></br>
        <Link to="/submit">submit-form</Link><br></br>
      </nav>
      <Routes>
        <Route path="/" element={<Payrollform />} />
        <Route path="/submit" element={<SubmitForm />} />
        <Route path="/edit/:id" element={<Payrollform forEditing={true} />} />

      </Routes>
    </div>
  );
}
export default App;