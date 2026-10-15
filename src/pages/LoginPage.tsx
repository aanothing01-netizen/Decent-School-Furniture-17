import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';
import { SEO } from '../components/SEO';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Building2,
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const {
    user,
    loginWithEmail,
    loginWithGoogle,
    isLoggingIn,
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to customer account
  useEffect(() => {
    if (user) {
      onNavigate('/account');
    }
  }, [user, onNavigate]);

  // Load remembered email if present
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('dsf_remembered_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const validateForm = (): boolean => {
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address (e.g. name@school.edu.pk).');
      return false;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrorMessage(null);

    if (rememberMe) {
      try {
        localStorage.setItem('dsf_remembered_email', email.trim());
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.removeItem('dsf_remembered_email');
      } catch {
        // ignore
      }
    }

    const result = await loginWithEmail(email, password);
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Failed to sign in. Please verify your credentials.');
    } else {
      onNavigate('/account');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    await loginWithGoogle();
  };

  const handleQuickDemo = async (role: 'school' | 'admin') => {
    setErrorMessage(null);
    setIsLoading(true);
    const demoEmail = role === 'school' ? 'principal@beaconhouse.edu.pk' : 'aanothing01@gmail.com';
    const demoPass = role === 'school' ? 'DecentSchool2025!' : 'AdminDecent2025!';
    setEmail(demoEmail);
    setPassword(demoPass);
    const res = await loginWithEmail(demoEmail, demoPass);
    setIsLoading(false);
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to sign in with demo credentials.');
    } else {
      onNavigate('/account');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F7F9FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title="Customer Sign In - Decent School Furniture"
        description="Sign in to your customer account to track institutional orders, review furniture quotations, and manage campus profiles."
      />
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#102A43]/5 via-[#102A43]/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#102A43]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
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

        {/* Login Card */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-900/5 rounded-2xl border border-[#D9E2EC]">
          {/* Card Title */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#102A43] tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-[#486581]">
              Sign in to manage your orders and customer profile.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div className="leading-relaxed font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} noValidate className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="customer-email"
                className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="customer-email"
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="customer-password"
                  className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('/account/recover')}
                  className="text-xs font-medium text-[#486581] hover:text-[#F59E0B] transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="customer-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#627D98] hover:text-[#102A43] focus:outline-none cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center text-xs text-[#486581] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#102A43] focus:ring-[#102A43] border-[#D9E2EC] cursor-pointer"
                />
                <span className="ml-2 font-medium">Remember my email</span>
              </label>
              <span className="text-[11px] text-[#829AB1] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                256-Bit SSL Encrypted
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isLoggingIn}
              className="w-full mt-2 py-3 px-4 bg-[#102A43] hover:bg-[#1E3A5F] active:bg-[#0B1D2D] disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#829AB1] font-medium tracking-wider">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google One-Click Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoggingIn || isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-[#F7F9FC] border border-[#D9E2EC] rounded-xl text-xs font-semibold text-[#102A43] shadow-sm hover:border-[#BCCCDC] transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-5 border-t border-[#F0F4F8]">
            <div className="bg-[#F7F9FC] rounded-xl p-3 border border-[#E2E8F0]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#486581] mb-1.5">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  1-Click Instant Demo Login
                </span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('school')}
                  disabled={isLoading || isLoggingIn}
                  className="flex-1 py-1.5 px-2 bg-white hover:bg-[#F0F4F8] text-[#102A43] border border-[#D9E2EC] rounded-lg text-[11px] font-medium transition-colors text-center cursor-pointer disabled:opacity-50"
                >
                  🏫 School Partner (Instant)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  disabled={isLoading || isLoggingIn}
                  className="flex-1 py-1.5 px-2 bg-white hover:bg-[#F0F4F8] text-[#102A43] border border-[#D9E2EC] rounded-lg text-[11px] font-medium transition-colors text-center cursor-pointer disabled:opacity-50"
                >
                  🛡️ Administrator (Instant)
                </button>
              </div>
            </div>
          </div>

          {/* Registration link */}
          <div className="mt-6 text-center text-xs text-[#486581]">
            Don't have an institutional account yet?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/account/register')}
              className="font-bold text-[#102A43] hover:text-[#F59E0B] transition-colors underline underline-offset-2 cursor-pointer"
            >
              Create Your Account
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
