import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';
import { SEO } from '../components/SEO';
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { sendPasswordReset } = useStore();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    const result = await sendPasswordReset(email);
    setIsLoading(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(result.error || 'Failed to send recovery email.');
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F7F9FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title="Reset Password - Decent School Furniture"
        description="Reset your institutional account password to recover your Decent School Furniture customer portal access."
      />
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-[#102A43]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#102A43]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-[470px] relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div
            onClick={() => onNavigate('/')}
            className="inline-block cursor-pointer transition-transform hover:scale-105"
            title="Return to Decent School Furniture Homepage"
          >
            <Logo size="lg" />
          </div>
          <p className="mt-3 text-xs font-semibold tracking-wider uppercase text-[#F59E0B]">
            Better Study, Better Future
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-900/5 rounded-2xl border border-[#D9E2EC]">
          {!isSuccess ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-[#102A43] tracking-tight">
                  Reset Your Password
                </h1>
                <p className="mt-2 text-sm text-[#486581] leading-relaxed">
                  Enter your registered institutional email and we will send you secure recovery instructions.
                </p>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <div className="leading-relaxed font-medium">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="recover-email"
                    className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="recover-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@school.edu.pk"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 bg-[#102A43] hover:bg-[#1E3A5F] active:bg-[#0B1D2D] disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Recovery Instructions</span>
                      <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-[#102A43]">
                Recovery Instructions Sent
              </h2>
              <p className="text-sm text-[#486581] leading-relaxed">
                We have emailed password reset instructions to{' '}
                <span className="font-semibold text-[#102A43]">{email}</span>. Please check your inbox and spam folder.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#F7F9FC] border border-[#D9E2EC] text-[#102A43] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resend Recovery Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/account/login')}
                  className="w-full py-2.5 px-4 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-[#F0F4F8] text-center text-xs text-[#486581]">
            Remember your credentials?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/account/login')}
              className="font-bold text-[#102A43] hover:text-[#F59E0B] transition-colors underline cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </div>

        {/* Back to store navigation */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#486581] hover:text-[#102A43] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Store</span>
          </button>
        </div>
      </div>
    </div>
  );
};
