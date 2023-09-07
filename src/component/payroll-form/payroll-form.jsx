import React from "react";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import './payroll-form.css';

import EmployeeService from "../../service/EmployeeService"
import logo from"../../Logo/logo.png";
import Ellipse1 from './Ellipse1.png';
import Ellipse2 from './Ellipse2.png';
import Ellipse3 from './Ellipse3.png';
import Ellipse4 from "./Ellipse4.png";

function Payrollform({ forEditing }) {
  const params = useParams();
  const navigate = useNavigate();
  const redirectSettEvent = () => {
      navigate("/");
    };

  let initialValue = {
    name: "",
    gender: "",
    profile: "",
    checkBoxValue: [], 
    checkBoxOption: ["HR", "IT", "Sales", "Management"],
    salary: "",
    startDate: "",
    notes: "",
    email: "",
    address: "",
  };
  
  const[formData,setFormData]=useState(initialValue);
  const [salary, setSalary] = useState(30000);

 const handleSalaryChange = (event) => {
  console.log(event.target.name);
   const newSalary = parseInt(event.target.value, 10);
   setFormData({...formData,[event.target.name]:event.target.value});
  setSalary(newSalary);
 };
const handleDateChange = (date) => {
  // console.log("Selected Date:", date.toLocalDate());
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are zero-based
  const day = date.getDate();

  // Construct a LocalDate object
  const localDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
console.log(localDate)
  setFormData({
    ...formData,startDate:localDate,
  });
  console.log(formData.startDate)
};

  const handleInputChange =(event) => {
    console.log(event.target.name);
    setFormData({...formData,[event.target.name]:event.target.value});

  };

  const handleCheckBoxChange = (event) => {
    console.log("Checkbox changed:", event.target.name, event.target.checked);
  
    let updateValues = [...formData.checkBoxValue];
    if (event.target.checked) {
      updateValues.push(event.target.value);
    } else {
      updateValues = updateValues.filter((value) => value !== event.target.value);
    }
    setFormData({
      ...formData,
      checkBoxValue: updateValues,
    });
  };

useEffect(() => {
  if (params.id && forEditing) {
    console.log("update")
    getDataById(params.id);
  } else {
    console.log("add")
    setFormData({ ...initialValue });
  }
}, [params.id, forEditing]);

  const getDataById = (id) => {
    EmployeeService.findEmployeeById(id)
      .then((response) => {
        const employeeData = response.data.data;
        console.log(employeeData)
        const updatedFormData = {
          ...employeeData,
          checkBoxOption: initialValue.checkBoxOption,
          checkBoxValue: employeeData.department || [],
        };
        setFormData(updatedFormData);
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if (forEditing) {
    // Handle update logic here
    EmployeeService.updateEmployee(params.id, formData)
      .then((response) => {
        console.log(response);
        alert("Employee updated successfully");
        // Redirect to the employee list page or perform other actions
      })
      .catch((error) => {
        console.error("Error updating employee: ", error);
        alert("Error updating employee");
      });
  } else {
    // Handle add logic here
    const object = {
      name: formData.name,
      department: formData.checkBoxValue,
      salary: formData.salary,
      gender: formData.gender,
      startDate: formData.startDate,
      notes: formData.notes,
      profile: formData.profile,
      email: formData.email,
      address: formData.address,
    }

    EmployeeService.addProject(object)
      .then((response) => {
        console.log(response);
        alert("Employee added successfully");
        // Reset the form or perform other actions
      })
      .catch((error) => {
        console.error("Error adding employee: ", error);
        alert("Error adding employee");
      });
  }
};
return (
      <div>
        <header className="header-content header">
          <div className="logo-content">
            <img src={logo} alt="" />
            <div>
              <span className="emp-text">Employee</span><br />
              <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
          </div> 
        </header>
        <div className="form-content">
          <form className="form">
            <div className="form-head">
              Employee Payroll form
            </div>
            <div className="row-content">
              <label className="label text" htmlFor="name">Name</label>
              <input className="input" type="text" id="name" name="name"value={formData.name} placeholder="your name.." required  onChange={handleInputChange} />
              <error-output className="text-error" htmlFor="text"></error-output>
            </div>
            <div className="row-content">
  <label className="label text" htmlFor="profile">Profile image</label>
  <div className="profile-radio-content">
    <label>
      <input type="radio" id="profile1" name="profile"   value={"./Ellipse1.png"}
                onChange={handleInputChange}
                checked={formData.profile === "./Ellipse1.png"} required />
      <img className="profile" id="image1" src={Ellipse1} alt="" />
    </label>
    <label>
      <input type="radio" id="profile2" name="profile"  value={"./Ellipse2.png"}
                onChange={handleInputChange}
                checked={formData.profile === "./Ellipse2.png"} required />
      <img className="profile" id="image2" src={Ellipse2} alt="" />
    </label>
    <label>
      <input type="radio" id="profile3" name="profile"   value={"./Ellipse3.png"}
                onChange={handleInputChange}
                checked={formData.profile === "./Ellipse3.png"} required />
      <img className="profile" id="image3" src={Ellipse3} alt="" />
    </label>
    <label>
      <input type="radio" id="profile4" name="profile"   value={"./Ellipse4.png"}
                onChange={handleInputChange}
                checked={formData.profile === "./Ellipse4.png"} required />
      <img className="profile" id="image4" src={Ellipse4} alt="" />
    </label>
  </div>
</div>
<div className="row-content">
  <label className="label text" htmlFor="gender">Gender</label>
  <div>
  <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleInputChange}
              checked={formData.gender === "male"}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleInputChange}
              checked={formData.gender === "female"}
            />{" "}
            Female
          </label>
  </div>
</div>
<div className="row-content">
  <label className="label text" htmlFor="email">
    Email
  </label>
  <input
    className="input"
    type="email"
    id="email"
    name="email"
    placeholder="your email.."
    required
    onChange={handleInputChange}
    value={formData.email}
  />
  <error-output className="text-error" htmlFor="email"></error-output>
</div>
<div className="row-content">
  <label className="label text" htmlFor="department">Department</label>
  <div>
  {formData.checkBoxOption.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={option}
                value={option}
                onChange={handleCheckBoxChange}
                checked={formData.checkBoxValue.includes(option)}
              />
              {option}
            </label>
          ))}
  </div>
</div>

<div className="row-content">
  <label className="label text" htmlFor="salary">Choose your salary</label>
  <input
    className="input"
    type="range"
    name="salary"

    id="salary"
    min="30000"
    max="50000"
    step="10"
    value={salary}
    onChange={handleSalaryChange}
  />
  <output className="salary-output text" htmlFor="salary">{salary}</output>
</div>
<div className="row-content">
  <label className="label text" htmlFor="startDate">
    Start Date
  </label>
  <div id="startDate">
    <DatePicker
      selected={formData.startDate ? new Date(formData.startDate) : null}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      maxDate={new Date()}
    />
  </div>
</div>
<div className="row-content">
  <label className="label text" htmlFor="address">
    Address
  </label>
  <textarea
    className="input"
    name="address"
    id="address"
    placeholder="your address.."
    style={{ height: '100px' }}
    onChange={handleInputChange}
    value={formData.address}
  ></textarea>
</div> 
            <div className="row-content">
              <label className="label text" htmlFor="notes">Notes</label>
              <textarea className="input" name="notes" id="notes" placeholder="" style={{ height: '100px' }}  onChange={handleInputChange}
            value={formData.notes}></textarea>
            </div>
            <div className="buttonParent">
              <button className="resetButton button cancelButton">Cancel</button>
              <div className="submit-reset">
                <button type="submit" onClick={handleSubmit}className="button submitButton" id="submitButton">
        {forEditing ? "Update" : "Submit"} 
      </button>
                <button type="reset" onClick={redirectSettEvent}lassName="resetButton button">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}
export default Payrollform;