import React, { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: 'How does bio-algorithmic synthesis integrate securely?',
      answer:
        'Integration occurs through a highly encrypted, non-invasive overlay measuring surface electro-dermal activity alongside cardiovascular density maps. It does not alter native chemistry instantly; it architects an optimized behavioral subroutine running parallel to natural instinct precisely seamlessly correctly mapped without failure perfectly scaling actively securely executed correctly.',
    },
    {
      question: 'What is the latency on the telemetry readouts?',
      answer:
        'Standard biological readouts incur a latency of less than 45 milliseconds natively. The quantum sync engine pulls real-time isotonic displacement metrics straight to the logical compiler, rendering lag functionally zero in observing cellular distress exactly synchronized reliably natively across all environments accurately seamlessly deployed flawlessly.',
    },
    {
      question: 'Can the neurological mapping disrupt sleep patterns?',
      answer:
        'Conversely, the Vector Sleep Index forces absolute washout synchronization. By mapping chronometric brainwave states, AETHRIZ identifies exact entry points for delta wave enhancement, actively erasing toxic metabolite accumulation safely removing native chemical suppressants smoothly without causing active organic interruptions natively perfectly.',
    },
    {
      question: 'Is the structural nucleotide monitoring physically invasive?',
      answer:
        'No. We utilize advanced photonic resonance imaging combined with historical genetic marker databases to calculate structural deterioration probabilistically with a 99.999% purity substrate accuracy rating perfectly engineered ensuring seamless reading arrays correctly mapping arrays seamlessly beautifully correctly organically mapped reliably dynamically.',
    },
    {
      question: 'How soon can algorithmic macro habits deploy dynamically?',
      answer:
        'Immediately following the initial 72-hour algorithmic trial phase accurately securely mapped correctly cleanly seamlessly directly successfully scaled. Once the Architect Push compiles your unique biometric blueprint micro interventions directly safely mapped properly accurately beautifully reliably consistently safely flawlessly gracefully engineered.',
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
            Critical Data <br />
            Retrieval.
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
