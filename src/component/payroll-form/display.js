// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom"
// import EmployeeService from "../../service/EmployeeService"
// import SubmitForm from "./submit-form";
// import profile1 from "./Ellipse1.png"
// import profile2 from "./Ellipse2.png"
// import profile3 from "./Ellipse3.png"
// import profile4 from "./Ellipse4.png"
// const Display = (props) => {
//     let navigate = useNavigate();
//     const update = (employeeId)=>{
//         navigate('editForm/$(employeeId)');

//     };
//     useEffect(() => {
//         console.log(props);
//         console.log("use Effect method");
//     },[]);
//     const remove = (employeeId) => {
//         console.log(employeeId);
//         var answer = window.confirm(
//             "Data once deleted cannot be restored! Do you wish to continue ?"
//         );
//         if(answer = true){
//             EmployeeService.deleteEmployee(employeeId)
//             .then((response) => {
//                 alert("Employee Deleted Successfully",response.data.data);
//                 window.location.reload();
//                 props.getAllEmployee();

//             })
//             .catch((err) => {
//                 alert("Something went wrong");
//             })
//         }else{
//             alert("Employee not deleted ");
//         }
//     };
//     return (
//         <div>
//           <header class="header-content header">
//         <div class="logo-content">
//         <img src={Logo} alt="logo" />
//           <div>
//             <span class="emp-text">EMPLOYEE</span><br></br>
//             <span class="emp-text emp-payroll">PAYROLL</span>
//           </div>
//         </div>
//         <button id="add-user-button" onClick={redirectToSettEvent} value={addUserIcon}>
//           Add User
//               <img src={addUserIcon} alt="Add User" />
//             </button>
//       </header>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Profile</th>
//                 <th>Gender</th>
//                 <th>Department</th>
//                 <th>Salary</th>
//                 <th>Start Date</th>
//                 <th>Notes</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//                 {props.employeeArray&&
//                 props.employeeArray.map((employees,index) => (
//                     <tr key={'${index}'}>
//                     <td>
//                         <img className="profile"
//                         src={employees.profilePic === "./Ellipse1.png" ? profile1
//                         :employees.profilePic === "./Ellipse2.png" ? profile2
//                         :employees.profilePic === "./Ellipse3.png" ? profile3
//                         :employees.profilePic === "./Ellipse4.png" ? profile4}
//                         />
//                         </td>
//                     <td>{employees.name}</td>
//                     <td className="gender">{employees.gender}

//                     </td>
//                     <td>
//                         {employees.department.map((dept) => {
//                             <div className="dept-level">{dept}</div>
//                         })}
//                     </td>
//                     <td>${employees.salary}</td>
//                     <td>{employees.startDate}</td>
//                     <td>{employees.notes}</td>
//                     <td>
//                         <img onClick={() => remove(employees.employeeId) }
//                         src={deleteIcon}
//                         alt="delete"/>
//                            <img onClick={() => update(employees.employeeId) }
//                         src={editIcon}
//                         alt="edit"/>
//                     </td>
//                     </tr>
//                 ))
                    
//               <Display
//               employeeArray={this.state.AllEmployeeArray}
//               getAllEmployee={this.state.getAllEmployee}
//               />
//             </tbody>
//           </table>
//         </div>
//         );
// }

// export default Display;