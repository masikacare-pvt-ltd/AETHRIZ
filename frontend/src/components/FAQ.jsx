import React, { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: 'What is AETHRIZ?',
      answer:
        'AETHRIZ is an AI-powered health intelligence platform that analyzes health data and provides personalized diet, lifestyle, and health insights based on an individual\'s unique profile.',
    },
    {
      question: 'What health data can AETHRIZ analyze?',
      answer:
        'AETHRIZ can work with relevant health information such as laboratory reports, health parameters, dietary habits, lifestyle information, and other available health data to build a personalized health profile.',
    },
    {
      question: 'How is AETHRIZ different from normal health apps?',
      answer:
        'Most health apps provide general advice. AETHRIZ focuses on connecting your health data with your lifestyle and dietary patterns to generate recommendations specifically for you.',
    },
    {
      question: 'Does AETHRIZ replace a doctor?',
      answer:
        'No. AETHRIZ is designed to support health awareness and informed decision-making, not replace qualified medical professionals, diagnosis, or emergency medical care.',
    },
    {
      question: 'Can AETHRIZ work for people with different diets, languages, ages, and lifestyles?',
      answer:
        'Yes. AETHRIZ is designed around personalization, allowing its intelligence layer to adapt recommendations according to individual health data, dietary preferences, lifestyle, language, and user context.',
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="container rv-scroll reveal-node">
      <div className="faq-block-wrap">
        <div className="align-left-header mb-40">
          <span className="data-mono c-red mb-15-block">[07] // QUERY RESOLUTION</span>
          <h2 className="thesis-text thesis-lg">
            Frequently Asked <br />
            Questions.
          </h2>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isActive ? 'active' : ''}`}
                onClick={() => handleToggle(index)}
              >
                <div className="faq-question">
                  {item.question}
                  <div className="faq-icon"></div>
                </div>
                <div className="faq-answer">{item.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
