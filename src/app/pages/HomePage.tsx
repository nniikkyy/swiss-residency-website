import { Hero } from '../components/Hero';
import { BusinessClassAccommodations } from '../components/BusinessClassAccommodations';
import { HotelWalkaround } from "../components/HotelWalkaround";
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SpecialOffers } from '../components/SpecialOffers';
import { ServicesFacilities } from '../components/ServicesFacilities';
import { Location } from '../components/Location';
import { InstagramFeed } from '../components/InstagramFeed';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

export function HomePage() {
  return (
    <>
      <Hero />

      <BusinessClassAccommodations />

      {/* Walkaround Video Section */}
      <HotelWalkaround />

      <WhyChooseUs />

      <SpecialOffers />

      <ServicesFacilities />

      <Location />

      <InstagramFeed />

      <Testimonials />

      <Contact />

      <FloatingWhatsApp />
    </>
  );
}