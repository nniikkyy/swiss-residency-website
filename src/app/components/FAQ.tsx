import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out are subject to availability and may incur additional charges.'
    },
    {
      question: 'Is parking available at the hotel?',
      answer: 'Yes, we offer complimentary secure parking for all our guests. The parking area is monitored 24/7 for your safety and convenience.'
    },
    {
      question: 'Do you provide airport transfers?',
      answer: 'Yes, we can arrange airport transfers to and from both Indira Gandhi International Airport (IGI) and the new Jewar International Airport. Please contact us in advance to arrange this service.'
    },
    {
      question: "What's your cancellation policy?",
      answer: 'Free cancellation up to 48 hours before check-in. Cancellations made within 48 hours of check-in will incur a charge of one night\'s stay. No-shows will be charged the full amount.'
    },
    {
      question: 'Is breakfast included in the room rate?',
      answer: 'Yes, complimentary breakfast is included with all room bookings. We serve a variety of Indian and Continental options from 7:30 AM to 10:30 AM.'
    },
    {
      question: 'Do you offer WiFi?',
      answer: 'Yes, high-speed WiFi is available throughout the property free of charge for all guests. Network credentials will be provided at check-in.'
    },
    {
      question: 'Are pets allowed?',
      answer: 'We currently do not allow pets at the property. Please contact us if you have specific requirements and we will try our best to accommodate.'
    },
    {
      question: 'How far is the hotel from India Expo Mart?',
      answer: 'The Swiss Residency is conveniently located approximately 1 kilometer from India Expo Mart, making it ideal for exhibition visitors and business travelers.'
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">FAQ</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Have questions? We've got answers. Contact us if you need more information.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#F7F6F2] rounded-[18px] overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#E8F3EE] transition-colors"
              >
                <h3 style={{ fontFamily: 'Playfair Display' }} className="text-lg md:text-xl text-[#2F4F46] font-semibold pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === idx ? (
                    <Minus className="w-6 h-6 text-[#C6A75E]" strokeWidth={2} />
                  ) : (
                    <Plus className="w-6 h-6 text-[#C6A75E]" strokeWidth={2} />
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-[#EAEAEA] pt-4">
                        <p className="text-[#2F4F46] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
