import { DashboardLayout } from '../components/DashboardLayout';
import { User, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <div>
          <BackButton />
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl text-[#1B4332] tracking-wide font-light mb-2">
            Profile
          </h1>
          <p className="text-gray-500 font-light">
            Manage your account information
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white p-8 shadow-sm">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#1B4332] mb-2 tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" />
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[#1B4332] mb-2 tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1B4332] mb-2 tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" />
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#1B4332] mb-2 tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                ADDRESS
              </label>
              <textarea
                rows={3}
                placeholder="Enter your address"
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#1B4332] mb-2 tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                DATE OF BIRTH
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors"
              />
            </div>

            <button className="w-full bg-[#1B4332] text-white py-3 tracking-wider text-sm hover:bg-[#2D5940] transition-colors">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}