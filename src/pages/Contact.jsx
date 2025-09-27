import React, { useState } from 'react';

const Contact = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      question: "How quickly is food picked up?",
      answer: "Typically within 1-2 hours of posting."
    },
    {
      question: "Is there any cost involved?",
      answer: "No, our platform is completely free for both restaurants and NGOs."
    },
    {
      question: "What types of food can be donated?",
      answer: "Any safe, edible food that meets health standards."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="page-contact">
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you</p>
      </section>

      <div className="contact-content">
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            <button type="submit" className="send-button">Send Message</button>
          </form>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="faq-question">
                  {faq.question}
                  <span className="faq-toggle">
                    {activeFAQ === index ? '−' : '+'}
                  </span>
                </div>
                {activeFAQ === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;