import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Phone, ArrowRight } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../components/ui/input-otp';
import { BackButton } from '../components/BackButton';

export function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // Simulate successful login
      localStorage.setItem('isLoggedIn', 'true');
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      }
      navigate('/');
      window.location.reload(); // Reload to update navigation state
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Logo/Back to Home */}
        <div className="text-center mb-12">
          <a
            href="/"
            className="text-xl tracking-[0.2em] text-[#1B4332] hover:text-[#2D5940] transition-colors inline-block"
          >
            THE SWISS RESIDENCY
          </a>
        </div>

        {/* Login Card */}
        <div className="bg-white p-12 shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl text-[#1B4332] mb-3 tracking-wide font-light">
              Login with Phone Number
            </h1>
            <div className="w-16 h-px bg-[#1B4332] mx-auto"></div>
          </div>

          {step === 'phone' ? (
            <div className="space-y-8">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm text-[#1B4332] mb-3 tracking-wider">
                  PHONE NUMBER
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="Enter 10-digit number"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 font-light">
                  We'll send you an OTP to verify your number
                </p>
              </div>

              {/* Admin Checkbox (Demo Only) */}
              <div className="bg-[#F5F1E8] p-4 border border-[#E8DCC4]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-4 h-4 accent-[#1B4332]"
                  />
                  <span className="text-sm text-gray-700 font-light">
                    Login as Admin (Demo)
                  </span>
                </label>
              </div>

              {/* Send OTP Button */}
              <button
                onClick={handleSendOTP}
                disabled={phoneNumber.length !== 10}
                className="w-full bg-[#1B4332] text-white py-4 tracking-wider text-sm hover:bg-[#2D5940] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                SEND OTP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* OTP Input */}
              <div>
                <label className="block text-sm text-[#1B4332] mb-3 tracking-wider">
                  ENTER OTP
                </label>
                <p className="text-sm text-gray-500 mb-6 font-light">
                  Sent to +91 {phoneNumber}
                </p>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="border-[#1B4332]/30 text-[#1B4332]" />
                      <InputOTPSlot index={1} className="border-[#1B4332]/30 text-[#1B4332]" />
                      <InputOTPSlot index={2} className="border-[#1B4332]/30 text-[#1B4332]" />
                      <InputOTPSlot index={3} className="border-[#1B4332]/30 text-[#1B4332]" />
                      <InputOTPSlot index={4} className="border-[#1B4332]/30 text-[#1B4332]" />
                      <InputOTPSlot index={5} className="border-[#1B4332]/30 text-[#1B4332]" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full bg-[#1B4332] text-white py-4 tracking-wider text-sm hover:bg-[#2D5940] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                VERIFY & LOGIN
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  onClick={() => setStep('phone')}
                  className="text-sm text-[#1B4332] hover:underline font-light"
                >
                  Change Phone Number
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8 font-light">
          By continuing, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}