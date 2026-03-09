import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Phone, ArrowRight } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { supabase } from "../../lib/supabase";

export function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    });

    if (error) {
      console.error("Google login error:", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }
    };

    checkSession();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Logo */}
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
              Login
            </h1>
            <div className="w-16 h-px bg-[#1B4332] mx-auto"></div>
          </div>

          <div className="space-y-8">

            {/* Login Info */}
            <div className="text-center">
              <p className="text-sm text-gray-500 font-light">
                Continue with your Google account
              </p>
            </div>

            {/* Login Button (UI unchanged style) */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-[#1B4332] text-white py-4 tracking-wider text-sm hover:bg-[#2D5940] transition-all flex items-center justify-center gap-2"
            >
              CONTINUE WITH GOOGLE
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8 font-light">
          By continuing, you agree to our Terms & Conditions
        </p>

      </div>
    </div>
  );
}