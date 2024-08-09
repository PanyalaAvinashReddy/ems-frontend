import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState(''); 
  const [floor, setFloor] = useState(''); 
  const [streetName, setStreetName] = useState(''); 
  const [village, setVillage] = useState(''); 
  const [city, setCity] = useState(''); 
  const [district, setDistrict] = useState(''); 
  const [state, setState] = useState(''); 
  const [postalCode, setPostalCode] = useState(''); 
  const [country, setCountry] = useState('');

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    houseNo: '',
    floor: '',
    streetName: '',
    village: '',
    city: '',
    district: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const navigator = useNavigate();
  const [originalEmployee, setOriginalEmployee] = useState(null); 

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        
        // Split the address string into parts based on commas
        const addressParts = response.data.address.split(',');
  
        setHouseNo(addressParts[0] || ''); 
        setFloor(addressParts[1] || ''); 
        setStreetName(addressParts[2] || ''); 
        setVillage(addressParts[3] || ''); 
        setCity(addressParts[4] || ''); 
        setDistrict(addressParts[5] || ''); 
        setState(addressParts[6] || ''); 
        setPostalCode(addressParts[7] || ''); 
        setCountry(addressParts[8] || '');
  
        setOriginalEmployee(response.data); 
      }).catch(error => {
        console.error(error);
      });
    }
  }, [id]);  

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const updatedEmployee = {
        firstName,
        lastName,
        email,
        mobile,
        address: [
          houseNo,
          floor,
          streetName,
          village,
          city,
          district,
          state,
          postalCode,
          country
        ].filter(field => field !== '').join(','), 
        };

      console.log(updateEmployee)


      if (id) {
        updateEmployee(id, updatedEmployee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        });
      } else {
        createEmployee(updatedEmployee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    const namePattern = /^[a-zA-Z\s]+$/; // Allow spaces in names

    // Validate First Name
    if (firstName !== '') {
      if (!namePattern.test(firstName)) {
        errorsCopy.firstName = 'First name should contain only alphabets';
        valid = false;
      } else {
        errorsCopy.firstName = '';
      }
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    // Validate Last Name
    if (lastName !== '') {
      if (!namePattern.test(lastName)) {
        errorsCopy.lastName = 'Last name should contain only alphabets';
        valid = false;
      } else {
        errorsCopy.lastName = '';
      }
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    // Validate Email
    if (email.includes('@') && (email.includes('.com') || email.includes('.in') || email.includes('.org'))) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Valid Email is required';
      valid = false;
    }

    // Validate Mobile
    if (mobile !== '') {
      const isNumeric = /^[0-9]{10}$/.test(mobile);
      if (isNumeric) {
        errorsCopy.mobile = '';
      } else {
        if (mobile.length !== 10) {
          errorsCopy.mobile = 'Mobile must be exactly 10 digits';
        } else {
          errorsCopy.mobile = 'Mobile must contain only numbers';
        }
        valid = false;
      }
    } else {
      errorsCopy.mobile = 'Mobile is required';
      valid = false;
    }

    if (houseNo === '') {
      errorsCopy.houseNo = 'House number is required';
      valid = false;
    } else {
      errorsCopy.houseNo = '';
    }

    if(floor === ''){
      errorsCopy.floor = 'Floor is required';
      valid = false;
    }else{
      errorsCopy.floor = '';
    }

    if(streetName === '') {
      errorsCopy.streetName = 'Street is required';
      valid = false;
    }else{
      errorsCopy.streetName = '';
    }
    

    if(village === ''){
      errorsCopy.village = 'Village is required';
      valid = false;
    }else {
      errorsCopy.village = '';
    }

    if(city === ''){
      errorsCopy.city = 'City is required';
      valid = false;
    }else{
      errorsCopy.city = '';
    }

    if(district === ''){
      errorsCopy.district = 'District is required';
      valid = false;
    }else{
      errorsCopy.district = '';
    }
    if(state === ''){
      errorsCopy.state = 'State is required';
      valid = false;
    }else{
      errorsCopy.state = '';
    }



    // Validate Address Fields
    if(country === ""){
      errorsCopy.country = 'Country must have at least 2 characters';
      valid = false;
    }

    if(city === ""){
      errorsCopy.city = 'Enter Name of City';
    }

    // validation for postal code
    if (postalCode !== '') {
      const isPostalCodeValid = /^[0-9]{6,7}$/.test(postalCode); 
      if (!isPostalCodeValid) {
          errorsCopy.postalCode = 'Postal code must be 6 numeric digits and should not contain any spaces';
          valid = false;
      } else {
          errorsCopy.postalCode = '';
      }
      } else {
      errorsCopy.postalCode = 'Postal code is required';
      valid = false;
    }
    

    setErrors(errorsCopy);
    return valid;
  }

  // dynamically adding PageTitle
  function pageTitle() {
    if (id) {
      return <h2 className="font-weight-bold">Update Employee</h2>;
    } else {
      return <h2 className="font-weight-bold">Add Employee</h2>;
    }
  }

  return (
    <div className='container'><br />
      {pageTitle()}
      <form>
    <div className="mb-3 row">
        <div className="col">
            <label className="form-label">First Name</label>
            <input
                type="text"
                placeholder='Enter First Name'
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
        </div>
        <div className="col">
            <label className="form-label">Last Name</label>
            <input
                type="text"
                placeholder='Enter Last Name'
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
        </div>
    </div>
    <div className="mb-3 row">
        <div className="col">
            <label className="form-label">Email</label>
            <input
                type="email"
                placeholder='Enter Email'
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
        </div>
        <div className="col">
            <label className="form-label">Mobile</label>
            <input
                type="tel"
                placeholder='Enter Your Mobile Number'
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
            />
            {errors.mobile && <div className='invalid-feedback'>{errors.mobile}</div>}
        </div>
    </div>
    <br />

    <label className="form-label">Address</label><br />
    <div className="address">
    {/* <div style={{marginBottom : "30px", display : "flex",flexDirection:"column", gap : "1rem"}}> */}
    <div className='one-row d-flex' style={{justifyContent : "space-between"}}>
    
    <div>
    <input
        type="text"
        placeholder='House No'
        className={`form-control ${errors.houseNo ? 'is-invalid' : ''}`}
        value={houseNo}
        onChange={(e) => setHouseNo(e.target.value)}
        />
    {errors.houseNo && <div className='invalid-feedback'>{errors.houseNo}</div>}
    </div>

    <div>
    <input
        type="text"
        placeholder='Floor'
        className={`form-control ${errors.floor ? 'is-invalid' : ''}`}
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        />
    {errors.floor && <div className='invalid-feedback'>{errors.floor}</div>}
        </div>
        <div>
    <input
        type="text"
        placeholder='Street Name'
        className={`form-control ${errors.streetName ? 'is-invalid' : ''}`}
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
    />
    {errors.streetName && <div className='invalid-feedback'>{errors.streetName}</div>}
    </div>
    </div>
    
    <div className='two-row d-flex' style={{justifyContent : "space-between"}}>
    <div>
    <input
        type="text"
        placeholder='Village'
        className={`form-control ${errors.village ? 'is-invalid' : ''}`}
        value={village}
        onChange={(e) => setVillage(e.target.value)}
    />
    {errors.village && <div className='invalid-feedback'>{errors.village}</div>}
    </div>
    
    <div>
    <input
        type="text"
        placeholder='City'
        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
        value={city}
        onChange={(e) => setCity(e.target.value)}
    />
    {errors.city && <div className='invalid-feedback'>{errors.city}</div>}
    </div>
    
    <div>
    <input
        type="text"
        placeholder='District'
        className={`form-control ${errors.district ? 'is-invalid' : ''}`}
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
    />
    {errors.district && <div className='invalid-feedback'>{errors.district}</div>}
    </div>
    </div>
    
    <div className='three-row d-flex' style={{justifyContent : "space-between"}}>
    <div>
    <input
        type="text"
        placeholder='State'
        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
        value={state}
        onChange={(e) => setState(e.target.value)}
    />
    {errors.state && <div className='invalid-feedback'>{errors.state}</div>}
    </div>
    
    <div>
    <input
        type="text"
        placeholder='Postal Code'
        className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
    />
    {errors.postalCode && <div className='invalid-feedback'>{errors.postalCode}</div>}
    </div>
    
    <div>
    <input
        type="text"
        placeholder='Country'
        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
    />
    {errors.country && <div className='invalid-feedback'>{errors.country}</div>}
    </div>
    </div>
    {/* </div> */}
</div>

    <div className="text-center" style={{marginBottom:'65px'}}>
        <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
    </div>
</form> 


    </div>
  );
};

export default EmployeeComponent;
