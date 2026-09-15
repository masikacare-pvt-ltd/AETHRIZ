import React, { useState } from 'react';

export default function PreRegister() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    address: '',
    mobile: '',
    email: '',
    bloodGroup: '',
    diet: 'veg'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setSubmitStatus('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Sheets Web App URL
      const EXCEL_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwNuajlAND40U5L-UiC0_6U7uJaALq47m2Q4dyhjOWMv9_0j83hz_m5WRxrmUk7zQ4/exec';
      
      console.log('Sending data:', formData); // Debug log
      
      const response = await fetch(EXCEL_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // With no-cors mode, we assume success if no error is thrown
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        address: '',
        mobile: '',
        email: '',
        bloodGroup: '',
        diet: 'veg'
      });
      setTimeout(() => {
        handleCloseModal();
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="preregister" className="container rv-scroll reveal-node">
        <div className="preregister-wrap">
          <div className="align-center-header mb-50">
            <span className="data-mono c-red mb-15-block">[06] // EARLY ACCESS</span>
            <h2 className="thesis-text thesis-lg">
              Join the Future of <br />
              <i>Health Intelligence.</i>
            </h2>
            <p className="imperative-desc" style={{ maxWidth: '600px', margin: '30px auto 0' }}>
              Be among the first to experience AI-powered personalized health guidance. 
              Pre-register now and get exclusive early access to AETHRIZ.
            </p>
          </div>

          <div className="preregister-cta">
            <button 
              className="btn-apex cursor-hv hero-btn-lg preregister-btn" 
              onClick={handleOpenModal}
            >
              PRE-REGISTER HERE <i className="fa-solid fa-user-plus ml-10"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="modal-header">
              <span className="data-mono c-red">REGISTRATION PROTOCOL</span>
              <h3 className="modal-title">Pre-Register for AETHRIZ</h3>
            </div>

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    name="gender"
                    className="form-input"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Blood Group *</label>
                  <select
                    name="bloodGroup"
                    className="form-input"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Height (cm) *</label>
                  <input
                    type="number"
                    name="height"
                    className="form-input"
                    placeholder="Height in cm"
                    value={formData.height}
                    onChange={handleChange}
                    min="50"
                    max="250"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    className="form-input"
                    placeholder="Weight in kg"
                    value={formData.weight}
                    onChange={handleChange}
                    min="10"
                    max="300"
                    required
                  />
                </div>
              </div>

              <div className="form-group full">
                <label className="form-label">Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Your full address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-input"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full">
                <label className="form-label">Diet Preference *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="diet"
                      value="veg"
                      checked={formData.diet === 'veg'}
                      onChange={handleChange}
                    />
                    <span>Vegetarian</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="diet"
                      value="nonveg"
                      checked={formData.diet === 'nonveg'}
                      onChange={handleChange}
                    />
                    <span>Non-Vegetarian</span>
                  </label>
                </div>
              </div>

              <div className="form-submit-wrap">
                {submitStatus === 'success' && (
                  <div className="submit-message success">
                    <i className="fa-solid fa-check-circle"></i> Registration Successful!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="submit-message error">
                    <i className="fa-solid fa-exclamation-circle"></i> Error submitting. Please try again.
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn-apex cursor-hv form-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>SUBMITTING... <i className="fa-solid fa-spinner fa-spin ml-10"></i></>
                  ) : (
                    <>SUBMIT REGISTRATION <i className="fa-solid fa-paper-plane ml-10"></i></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
