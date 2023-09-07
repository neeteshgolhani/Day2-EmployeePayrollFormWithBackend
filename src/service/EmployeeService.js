import axios from "axios";
class EmployeeService{
baseUrl="http://localhost:8081";
addProject(data){
    return axios.post(`${this.baseUrl}/add`, data);
}
getAllEmployees() {
    return axios.get(`${this.baseUrl}/getAll`);
  }

  removeEmployee(id) {
    return axios.delete(`${this.baseUrl}/delete/${id}`);
  }

  updateEmployee (id, employeeData) {
    return axios.put(`${this.baseUrl}/update/${id}`,employeeData);

  }
  findEmployeeById (id)  {
    return axios.get(`${this.baseUrl}/getById/${id}`);
}
}
const employeeServiceInstance = new EmployeeService();
export default employeeServiceInstance;