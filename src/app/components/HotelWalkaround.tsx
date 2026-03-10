import { motion } from "motion/react";

export function HotelWalkaround() {
    return (
        <section className="py-24 bg-[#F5F1E8]">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <motion.h2
                    className="text-4xl md:text-5xl text-[#2F4F46] mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Hotel Walkaround
                </motion.h2>

                <motion.div
                    className="w-16 h-px bg-[#C6A75E] mx-auto mb-12"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                />

                {/* VIDEO */}
                <motion.div
                    className="aspect-video w-full rounded-lg overflow-hidden shadow-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/abcd1234?autoplay=1&mute=1&loop=1&playlist=abcd1234"
                        title="Hotel Walkaround"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </motion.div>

            </div>
        </section>
    );
}