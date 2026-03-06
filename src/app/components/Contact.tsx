import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Youtube } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="bg-white">
      {/* Contact Information */}
      <div className="py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="text-[#1B4332] text-xs tracking-[0.3em] mb-6">GET IN TOUCH</div>
            <h2 className="text-4xl md:text-5xl text-[#1B4332] mb-6 tracking-wide font-light">
              Contact Us
            </h2>
            <div className="w-16 h-px bg-[#1B4332] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Map */}
            <div className="bg-gray-100 h-[500px] flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8869344713447!2d77.49832537549909!3d28.47497257574558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea6f4a165bcd%3A0xedc26c5b33d0b25e!2sThe%20Swiss%20Residency!5e0!3m2!1sen!2sin!4v1708604400000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Hotel Location Map"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1B4332]" />
                </div>
                <div>
                  <h3 className="text-[#1B4332] text-sm mb-3 tracking-widest font-light">ADDRESS</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    E-146, 1st Cross St, Alpha 1,<br />
                    Block E, Alpha I,<br />
                    Greater Noida, Uttar Pradesh 201310
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#1B4332]" />
                </div>
                <div>
                  <h3 className="text-[#1B4332] text-sm mb-3 tracking-widest font-light">PHONE</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    <a href="tel:+918595908237" className="hover:text-[#1B4332] transition-colors">+91 8595908237</a><br />
                    <a href="tel:+919250226644" className="hover:text-[#1B4332] transition-colors">+91 9250226644</a><br />
                    <a href="tel:01204372351" className="hover:text-[#1B4332] transition-colors">0120 4372351</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#1B4332]" />
                </div>
                <div>
                  <h3 className="text-[#1B4332] text-sm mb-3 tracking-widest font-light">EMAIL</h3>
                  <p className="text-gray-500 font-light">
                    <a href="mailto:theswissresidency@gmail.com" className="hover:text-[#1B4332] transition-colors">
                      theswissresidency@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <div className="flex gap-1">
                    <Facebook className="w-4 h-4 text-[#1B4332]" />
                    <Twitter className="w-4 h-4 text-[#1B4332]" />
                    <Youtube className="w-4 h-4 text-[#1B4332]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#1B4332] text-sm mb-3 tracking-widest font-light">FOLLOW US</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-[#1B4332] transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#1B4332] transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#1B4332] transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B4332] text-white py-16 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl mb-6 tracking-[0.2em] font-light">THE SWISS RESIDENCY</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Experience unparalleled luxury and comfort in the heart of Greater Noida.
              </p>
            </div>
            <div>
              <h3 className="text-sm mb-6 tracking-widest font-light">QUICK LINKS</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Suites</a></li>
                <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm mb-6 tracking-widest font-light">POLICIES</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400 font-light">
            <p>&copy; 2026 The Swiss Residency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
}