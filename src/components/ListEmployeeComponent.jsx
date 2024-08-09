import React, {useState,useEffect} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    
    const [employees , setEmployees] = useState([])
    const navigator = useNavigate();
    useEffect(() => {
         getAllEmployees();
        } 
        ,[])

        function getAllEmployees(){
            listEmployees().then((response) => {
                setEmployees(response.data);
            }).catch(error => {
                console.error(error);
            })
        }

        function addNewEmployee() {
            navigator('/add-employee')
        }
        function updateEmployee(id){
            navigator(`/edit-employee/${id}`)
        }

        function removeEmployee(id){
            console.log(id);

            deleteEmployee(id).then((response) => {
                getAllEmployees();
            }).catch(error => {
                console.error(error);
            })
        }
    
  return (
    <div class="container">
        <h2>Employees</h2><br></br>
        <button class="btn btn-info" onClick={addNewEmployee}>Add Employee</button>
        <div className='mb-5'>
        <table class="table table-hover table-bordered" style={{width: '104%'}}>
            <thead class="table-danger"><br></br>
                <tr>
                    <th>S.No</th>
                    <th>Emp First Name</th>
                    <th>Emp Last Name</th>
                    <th>Emp Email</th>
                    <th>Emp mobile</th>
                    <th>Emp Address</th>
                    <th>Actions</th>
                </tr>
            </thead> 
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.address}</td>
                            <td style={{display:'flex'}}>
                                <button className='btn btn-warning' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft : '30px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody><br></br>
        </table>

        </div>
    </div>


  )
}

export default ListEmployeeComponent