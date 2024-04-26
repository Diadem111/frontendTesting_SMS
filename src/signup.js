import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    middleName: '',
    gender: '',
    email: '',
    password: '',
    classTaught: [],
    address: '',
    passport: null,
    role:"teacher"
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      const updatedArray = checked
        ? [...formData[name], value]
        : formData[name].filter(item => item !== value);

      setFormData({
        ...formData,
        [name]: updatedArray
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('surName', formData.surName);
    formDataToSend.append('middleName', formData.middleName);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formData.classTaught.forEach(classItem => formDataToSend.append('classTaught', classItem));
  
    // formData.classTaught.forEach(classItem => formDataToSend.append('classTaught', classItem));
    formDataToSend.append('address', formData.address);
    // formData.subjectsTaught.forEach(subject => formDataToSend.append('subjectsTaught', subject));
    formDataToSend.append('passport', formData.passport);
    formDataToSend.append('role', formData.role);

    const dataToSend = {};
    for (var pair of formDataToSend.entries()) {
      const [key, value] = pair;
      if (key === 'passport') {
        dataToSend[key] = '[file]';
      } else if ( key === 'classTaught') {
        if (!dataToSend[key]) {
          dataToSend[key] = [];
        }
        dataToSend[key].push(value);
      } else {
        dataToSend[key] = value;
      }
      // console.log(key + ':', value);

    }

    
    try {


        const response = await axios.post('http://localhost:3000/user/signup', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);

      // Optionally, handle successful signup here
    } catch (error) {
      console.error('Signup failed:', error);
      // Optionally, handle signup failure here
    }
  };

  return (
    <div className="container">
      <h2>Teacher Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surName" className="form-label">Surname</label>
          <input
            type="text"
            className="form-control"
            id="surName"
            name="surName"
            value={formData.surName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="middleName" className="form-label">Middle Name</label>
          <input
            type="text"
            className="form-control"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Classes Taught</label><br />
          {['JSS1', 'JSS2', 'SS1', 'SS2', 'SS3'].map((classItem) => (
            <div key={classItem} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`class${classItem}`}
                name="classTaught"
                value={classItem}
                checked={formData.classTaught.includes(classItem)}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`class${classItem}`}>{classItem}</label>
            </div>
          ))}
        </div>
       
        <div className="mb-3">
          <label className="form-label">Passport</label>
          <input
            type="file"
            className="form-control"
            id="passport"
            name="passport"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
