import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <section id="about" className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="order-2 md:order-1 relative group">
            <div className="absolute inset-0 bg-[#1B4332] transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcxNzgxMTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="The Swiss Residency Exterior"
              className="w-full h-[600px] object-cover relative z-10"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2">
            <div className="text-[#1B4332] text-xs tracking-[0.3em] mb-6">DISCOVER</div>
            <h2 className="text-4xl md:text-5xl text-[#1B4332] mb-6 tracking-wide font-light leading-tight">
              Business Class<br />Accommodations
            </h2>
            <div className="w-16 h-px bg-[#1B4332] mb-10"></div>
            <p className="text-gray-600 text-base leading-relaxed mb-6 font-light">
              The Swiss Residency features compact and cozy rooms which are cleverly designed and stylish. 
              The hotel offers Free Wi-Fi to its guests. The soft, relaxing colors and enhanced approach 
              to light, space and materials give it an inviting and modern atmosphere.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-12 font-light">
              Just one kilometer from the Yamuna Expressway and only 2 minutes from the India Expo Mart and 10 kms 
              from Buddh International Circuit (Formula 1 Race Track), The Swiss Residency offers a very convenient 
              location in the NCR for business and leisure travelers.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-4xl text-[#1B4332] mb-3 font-light">1 km</div>
                <div className="text-xs text-gray-500 tracking-widest">FROM EXPO MART</div>
              </div>
              <div>
                <div className="text-4xl text-[#1B4332] mb-3 font-light">10 km</div>
                <div className="text-xs text-gray-500 tracking-widest">F1 CIRCUIT</div>
              </div>
              <div>
                <div className="text-4xl text-[#1B4332] mb-3 font-light">24/7</div>
                <div className="text-xs text-gray-500 tracking-widest">SERVICE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}