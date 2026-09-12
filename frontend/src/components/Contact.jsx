import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="container rv-scroll reveal-node">
      <div className="contact-wrap">
        <div className="align-left-header mb-50">
          <span className="data-mono c-red mb-15-block">[08] // INITIATE LINK</span>
          <h2 className="thesis-text thesis-lg">
            Establish Root <br />
            Connection.
          </h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="[ IDENTIFICATION ] NAME"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <div className="input-bg-focus"></div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="[ VECTOR ] EMAIL ADDRESS"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="input-bg-focus"></div>
          </div>

          <div className="form-group full">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="[ COMMS ] PHONE NUMBER"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div className="input-bg-focus"></div>
          </div>

          <div className="form-group full">
            <label className="form-label">Message Log</label>
            <input
              type="text"
              name="message"
              className="form-input pb-40"
              placeholder="[ ENCRYPTED DATA ] YOUR MESSAGE LOG"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="input-bg-focus"></div>
          </div>

          <div className="form-group full mt-20">
            <button type="submit" className="btn-apex cursor-hv form-btn">
              {submitted ? (
                <>
                  SIGNAL TRANSMITTED <i className="fa-solid fa-check ml-10"></i>
                </>
              ) : (
                <>
                  TRANSMIT SIGNAL <i className="fa-solid fa-satellite-dish ml-10"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
