import { motion } from 'motion/react';

export function BusinessClassAccommodations() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            className="relative h-[530px]"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="absolute top-0 right-0 w-3 h-full bg-[#1B4332] z-20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: 'top' }}
            />
            <div className="bg-gray-200 h-64 w-full"></div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              className="text-xs tracking-[0.3em] text-gray-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              DISCOVER
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl mb-6 text-[#2F4F46]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Business Class Accommodations
            </motion.h2>

            <motion.div
              className="w-16 h-px bg-[#C6A75E] mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            <motion.p
              className="text-gray-700 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              The Swiss Residency features compact and cozy rooms which are cleverly designed and stylish. The hotel offers Free Wi-Fi to its guests. The soft, relaxing colors and enhanced approach to light, space and materials give it an inviting and modern atmosphere.
            </motion.p>

            <motion.p
              className="text-gray-700 leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Just one kilometer from the Yamuna Expressway and only 2 minutes from the India Expo Mart and 10 kms from Buddh International Circuit (Formula 1 Race Track), The Swiss Residency offers a very convenient location in the NCR for business and leisure travelers.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: '1 km', label: 'FROM EXPO MART' },
                { value: '10 km', label: 'F1 CIRCUIT' },
                { value: '24/7', label: 'SERVICE' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl text-[#2F4F46] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-wider text-gray-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}