import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';
import { SEO } from '../components/SEO';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { user, registerWithEmail, loginWithGoogle, isLoggingIn } = useStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [institution, setInstitution] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      onNavigate('/account');
    }
  }, [user, onNavigate]);

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 9) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-[#F59E0B]' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength(password);

  const validate = (): boolean => {
    setErrorMessage(null);
    if (!firstName.trim()) {
      setErrorMessage('Please enter your First Name.');
      return false;
    }
    if (!lastName.trim()) {
      setErrorMessage('Please enter your Last Name.');
      return false;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your Email Address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setErrorMessage('Please enter a password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return false;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service & Privacy Policy.');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrorMessage(null);
    const result = await registerWithEmail({
      email,
      password,
      firstName,
      lastName,
      institution,
      phone,
      city,
    });
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Failed to create account.');
    } else {
      onNavigate('/account');
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#F7F9FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title="Create Customer Account - Decent School Furniture"
        description="Register a school or institutional account to access bulk educational discounts, submit requests for proposal, and track classroom orders."
      />
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#102A43]/5 to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#102A43]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-[520px] relative z-10 px-4">
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
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#102A43] tracking-tight">
              Create Customer Account
            </h1>
            <p className="mt-1 text-sm text-[#486581]">
              Register to access institutional pricing, quotations, and order tracking.
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

          {/* Registration Form */}
          <form onSubmit={handleRegister} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="reg-first-name"
                  className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-first-name"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Tariq"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="reg-last-name"
                  className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-last-name"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Mahmood"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                />
              </div>
            </div>

            {/* School / Institution */}
            <div>
              <label
                htmlFor="reg-institution"
                className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
              >
                School / Institution Name{' '}
                <span className="text-[11px] font-normal text-[#627D98] normal-case">
                  (Recommended for Bulk Discount)
                </span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  id="reg-institution"
                  name="institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Beaconhouse School System / Allied School"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                />
              </div>
            </div>

            {/* Phone & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="reg-phone"
                  className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
                >
                  Phone / WhatsApp
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="reg-city"
                  className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
                >
                  Campus City
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    id="reg-city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all cursor-pointer"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.edu.pk"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#627D98] hover:text-[#102A43] cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        strength.score >= 1 ? strength.color : 'bg-slate-200'
                      }`}
                      style={{ width: '33.3%' }}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        strength.score >= 2 ? strength.color : 'bg-slate-200'
                      }`}
                      style={{ width: '33.3%' }}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        strength.score >= 3 ? strength.color : 'bg-slate-200'
                      }`}
                      style={{ width: '33.3%' }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#486581]">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="reg-confirm-password"
                className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1.5"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-confirm-password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] placeholder-[#9FB3C8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43] transition-all"
                />
                {confirmPassword && confirmPassword === password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start text-xs text-[#486581] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-[#102A43] focus:ring-[#102A43] border-[#D9E2EC] cursor-pointer"
                />
                <span className="ml-2 leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/policies/terms-of-service')}
                    className="text-[#102A43] font-semibold hover:underline cursor-pointer"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/policies/privacy-policy')}
                    className="text-[#102A43] font-semibold hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Alternative */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#829AB1] font-medium tracking-wider">
                  or sign up with
                </span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={loginWithGoogle}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-[#F7F9FC] border border-[#D9E2EC] rounded-xl text-xs font-semibold text-[#102A43] shadow-sm hover:border-[#BCCCDC] transition-all cursor-pointer"
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
                <span>Continue with Google</span>
              </button>
            </div>
          </div>

          {/* Already have account */}
          <div className="mt-6 text-center text-xs text-[#486581]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/account/login')}
              className="font-bold text-[#102A43] hover:text-[#F59E0B] transition-colors underline underline-offset-2 cursor-pointer"
            >
              Sign In
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
