import React, { useState } from 'react';

import axios from 'axios';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    middleName: '',
    gender: '',
    email: '',
    password: '',
    address: '',
    passport: null,
    role: 'newApplicant',
    extracurricular: [],
    interests: [],
    skills: [],
    registeredCourses: [],
    previousSchools: [],
    additionalDocuments: [],
    signature: [],
    recommedationLetter: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
        const updatedArray = checked
          ? [...(formData[name] || []), value]
          : (formData[name] || []).filter(item => item !== value);
      
        setFormData({
          ...formData,
          [name]: updatedArray
        });
      } else if (type === 'file') {
        // Check if multiple files are selected
        const updatedFiles = Array.from(files); // Convert FileList to Array
        setFormData({
          ...formData,
          [name]: updatedFiles // Store all selected files
        });
      } else if (name === 'skills' || name === 'registeredCourses' || name === 'previousSchools' || name === 'extracurricular' || name === 'interests') {
        setFormData({
          ...formData,
          [name]: value.split(',').map(item => item.trim())
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
    let sss;
    // Append regular form data
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('surName', formData.surName);
    formDataToSend.append('middleName', formData.middleName);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('address', formData.address);
    // formDataToSend.append('passport', formData.passport);
    formDataToSend.append('role', formData.role);
  
    // Append arrays
    formData.extracurricular.forEach(item => formDataToSend.append('extracurricular', item));
    formData.interests.forEach(item => formDataToSend.append('interests', item));
    formData.skills.forEach(item => formDataToSend.append('skills', item));
    formData.registeredCourses.forEach(item => formDataToSend.append('registeredCourses', item));
    formData.previousSchools.forEach(item => formDataToSend.append('previousSchools', item));
    formData.additionalDocuments.forEach(item => formDataToSend.append('additionalDocuments', item));
    formData.signature.forEach(item => formDataToSend.append('signature', item));
    formData.passport.forEach(item => formDataToSend.append("passport", item))
    formData.recommedationLetter.forEach(item => formDataToSend.append("recommedationLetter", item))
           // sss = formDataToSend
    

    try {
        console.log('Form data to send regionsss:', formDataToSend);
       
      const response = await axios.post('http://localhost:3000/students/upload', formDataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }

             });
      console.log(response.data);
      // Handle success response here
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error response here
    }
  };

  return (
    <div className="container">
      <h2>New Applicant Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form inputs */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passport" className="form-label">Passport</label>
          <input
            type="file"
            className="form-control"
            id="passport"
            name="passport"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="skills" className="form-label">Skills (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={formData.skills.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registeredCourses" className="form-label">Registered Courses (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="registeredCourses"
            name="registeredCourses"
            value={formData.registeredCourses.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="previousSchools" className="form-label">Previous Schools (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="previousSchools"
            name="previousSchools"
            value={formData.previousSchools.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="extracurricular" className="form-label">Extracurricular Activities (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="extracurricular"
            name="extracurricular"
            value={formData.extracurricular.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interests" className="form-label">Interests (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="interests"
            name="interests"
            value={formData.interests.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="additionalDocuments" className="form-label">Additional Documents</label>
          <input
            type="file"
            className="form-control"
            id="additionalDocuments"
            name="additionalDocuments"
            multiple
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signature" className="form-label">Signature</label>
          <input
            type="file"
            className="form-control"
            id="signature"
            name="signature"
            multiple
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recommedationLetter" className="form-label">Recommendation Letter</label>
          <input
            type="file"
            className="form-control"
            id="recommedationLetter"
            name="recommedationLetter"
            multiple
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
