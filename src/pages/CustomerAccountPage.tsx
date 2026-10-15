import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Building2,
  Package,
  FileText,
  Settings,
  LogOut,
  MapPin,
  Mail,
  Truck,
  ExternalLink,
  PlusCircle,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  Database,
  Server,
  RefreshCw,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SUPABASE_PROJECT_ID, SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';

interface CustomerAccountPageProps {
  onNavigate: (path: string) => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({ onNavigate }) => {
  const {
    user,
    userProfile,
    logoutUser,
    customerOrders,
    userQuotations,
    updateUserProfileData,
    openQuoteModal,
    getWhatsAppUrl,
    showToast,
    setIsSupabaseModalOpen,
    supabaseStatus,
    refreshSupabaseConnection,
    supabaseSql,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'quotations' | 'profile' | 'supabase' | 'shopify'>('orders');
  const [isPingingSupabase, setIsPingingSupabase] = useState(false);

  // Profile Edit State
  const [displayName, setDisplayName] = useState(userProfile?.displayName || user?.displayName || '');
  const [institution, setInstitution] = useState(userProfile?.institution || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [city, setCity] = useState(userProfile?.city || 'Lahore');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Liquid code export tab selection
  const [activeLiquidFile, setActiveLiquidFile] = useState<
    'login' | 'register' | 'recover' | 'dashboard' | 'css'
  >('login');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // If user is not logged in, prompt sign in
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F9FC] px-4 py-16">
        <SEO
          title="Customer Account Access - Decent School Furniture"
          description="Sign in to your customer portal to view orders, track quotation status, and manage school furniture specifications."
        />
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#D9E2EC] p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-[#102A43]/10 text-[#102A43] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#102A43]">
            Customer Account Access
          </h2>
          <p className="mt-2 text-sm text-[#486581]">
            Please sign in to view your orders, institutional quotation inquiries, and account settings.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => onNavigate('/account/login')}
              className="w-full py-3 bg-[#102A43] hover:bg-[#1E3A5F] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => onNavigate('/account/register')}
              className="w-full py-2.5 bg-white hover:bg-[#F7F9FC] border border-[#D9E2EC] text-[#102A43] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    const result = await updateUserProfileData({
      displayName,
      institution,
      phone,
      city,
      address,
    });
    setIsSavingProfile(false);
    if (!result.success) {
      showToast(result.error || 'Failed to update profile', 'error');
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Liquid code copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const liquidFiles = {
    login: `{% comment %}
  DECENT SCHOOL FURNITURE - CUSTOMER LOGIN SECTION
  Brand Colors: Navy (#102A43), Steel (#486581), Accent (#F59E0B)
  File: sections/dsf-customer-login.liquid
{% endcomment %}
<div class="dsf-auth-container">
  <div class="dsf-auth-card">
    <div class="dsf-auth-header">
      {% if section.settings.logo != blank %}
        <img src="{{ section.settings.logo | image_url: width: 220 }}" alt="{{ shop.name }}" class="dsf-logo" />
      {% else %}
        <h2 class="dsf-brand-title">DECENT SCHOOL FURNITURE</h2>
      {% endif %}
      <p class="dsf-tagline">Better Study, Better Future</p>
      <h1 class="dsf-heading">Welcome Back</h1>
      <p class="dsf-subheading">Sign in to manage your orders and customer profile.</p>
    </div>
    {% form 'customer_login' %}
      {{ form.errors | default_errors }}
      <div class="dsf-form-group">
        <label for="CustomerEmail" class="dsf-label">Email Address *</label>
        <input
          type="email"
          name="customer[email]"
          id="CustomerEmail"
          autocomplete="email"
          autocorrect="off"
          autocapitalize="off"
          required
          placeholder="name@school.edu.pk"
          class="dsf-input"
        >
      </div>
      {% if form.password_needed %}
        <div class="dsf-form-group">
          <div class="dsf-label-row">
            <label for="CustomerPassword" class="dsf-label">Password *</label>
            <a href="#recover" class="dsf-link-secondary" onclick="Shopify.CustomerPath.toggleRecover(true)">Forgot Password?</a>
          </div>
          <input
            type="password"
            name="customer[password]"
            id="CustomerPassword"
            required
            placeholder="••••••••"
            class="dsf-input"
          >
        </div>
      {% endif %}
      <button type="submit" class="dsf-btn-primary">
        Sign In
      </button>
    {% endform %}
    <div class="dsf-auth-footer">
      <p>Don't have an institutional account yet? <a href="{{ routes.account_register_url }}" class="dsf-link-bold">Create Your Account</a></p>
      <a href="{{ routes.root_url }}" class="dsf-back-link">← Back to Store</a>
    </div>
  </div>
</div>`,
    register: `{% comment %}
  DECENT SCHOOL FURNITURE - CUSTOMER REGISTRATION
  File: sections/dsf-customer-register.liquid
{% endcomment %}
<div class="dsf-auth-container">
  <div class="dsf-auth-card">
    <div class="dsf-auth-header">
      <h2 class="dsf-brand-title">DECENT SCHOOL FURNITURE</h2>
      <p class="dsf-tagline">Better Study, Better Future</p>
      <h1 class="dsf-heading">Create Customer Account</h1>
      <p class="dsf-subheading">Register for bulk school pricing and verified quotations.</p>
    </div>
    {% form 'create_customer' %}
      {{ form.errors | default_errors }}
      <div class="dsf-grid-2">
        <div class="dsf-form-group">
          <label for="FirstName" class="dsf-label">First Name *</label>
          <input type="text" name="customer[first_name]" id="FirstName" required class="dsf-input">
        </div>
        <div class="dsf-form-group">
          <label for="LastName" class="dsf-label">Last Name *</label>
          <input type="text" name="customer[last_name]" id="LastName" required class="dsf-input">
        </div>
      </div>
      <div class="dsf-form-group">
        <label for="CustomerNoteInstitution" class="dsf-label">School / Institution Name</label>
        <input type="text" name="customer[note][Institution]" id="CustomerNoteInstitution" placeholder="e.g. Allied School System" class="dsf-input">
      </div>
      <div class="dsf-form-group">
        <label for="Email" class="dsf-label">Email Address *</label>
        <input type="email" name="customer[email]" id="Email" required class="dsf-input">
      </div>
      <div class="dsf-form-group">
        <label for="CreatePassword" class="dsf-label">Password *</label>
        <input type="password" name="customer[password]" id="CreatePassword" required class="dsf-input">
      </div>
      <button type="submit" class="dsf-btn-primary">Create Account</button>
    {% endform %}
    <div class="dsf-auth-footer">
      <p>Already have an account? <a href="{{ routes.account_login_url }}" class="dsf-link-bold">Sign In</a></p>
      <a href="{{ routes.root_url }}" class="dsf-back-link">← Back to Store</a>
    </div>
  </div>
</div>`,
    recover: `{% comment %}
  DECENT SCHOOL FURNITURE - PASSWORD RECOVERY
  File: sections/dsf-password-recovery.liquid
{% endcomment %}
<div class="dsf-auth-container">
  <div class="dsf-auth-card">
    <div class="dsf-auth-header">
      <h2 class="dsf-brand-title">DECENT SCHOOL FURNITURE</h2>
      <h1 class="dsf-heading">Reset Your Password</h1>
      <p class="dsf-subheading">Enter your email and we'll send recovery instructions.</p>
    </div>
    {% form 'recover_customer_password' %}
      {{ form.errors | default_errors }}
      <div class="dsf-form-group">
        <label for="RecoverEmail" class="dsf-label">Email Address *</label>
        <input type="email" name="email" id="RecoverEmail" required class="dsf-input">
      </div>
      <button type="submit" class="dsf-btn-primary">Send Recovery Instructions</button>
    {% endform %}
    <div class="dsf-auth-footer">
      <a href="{{ routes.account_login_url }}" class="dsf-link-secondary">Return to Sign In</a>
    </div>
  </div>
</div>`,
    dashboard: `{% comment %}
  DECENT SCHOOL FURNITURE - CUSTOMER DASHBOARD
  File: sections/dsf-customer-dashboard.liquid
{% endcomment %}
<div class="dsf-dashboard-wrapper">
  <div class="dsf-dashboard-header">
    <h1>Welcome, {{ customer.name }}</h1>
    <p>{{ customer.email }} • Currency: PKR</p>
  </div>
  <div class="dsf-orders-section">
    <h2>Your Orders ({{ customer.orders_count }})</h2>
    {% paginate customer.orders by 10 %}
      {% if customer.orders.size != 0 %}
        <table class="dsf-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Fulfillment</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {% for order in customer.orders %}
              <tr>
                <td>{{ order.name | link_to: order.customer_url }}</td>
                <td>{{ order.created_at | date: "%b %d, %Y" }}</td>
                <td>{{ order.financial_status_label }}</td>
                <td>{{ order.fulfillment_status_label }}</td>
                <td>{{ order.total_net_amount | money }}</td>
              </tr>
            {% endfor %}
          </tbody>
        </table>
      {% else %}
        <p>You haven't placed any school furniture orders yet.</p>
      {% endif %}
      {{ paginate | default_pagination }}
    {% endpaginate %}
  </div>
</div>`,
    css: `/* DECENT SCHOOL FURNITURE - CUSTOMER AUTHENTICATION & DASHBOARD STYLES */
:root {
  --dsf-navy: #102A43;
  --dsf-navy-hover: #1E3A5F;
  --dsf-steel: #486581;
  --dsf-orange: #F59E0B;
  --dsf-bg: #F7F9FC;
  --dsf-white: #FFFFFF;
  --dsf-border: #D9E2EC;
}

.dsf-auth-container {
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dsf-bg);
  padding: 40px 16px;
}

.dsf-auth-card {
  width: 100%;
  max-width: 470px;
  background: var(--dsf-white);
  border: 1px solid var(--dsf-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(16, 42, 67, 0.08);
  padding: 36px 32px;
}

.dsf-btn-primary {
  width: 100%;
  background-color: var(--dsf-navy);
  color: var(--dsf-white);
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.dsf-btn-primary:hover {
  background-color: var(--dsf-orange);
  color: #FFFFFF;
}`,
  };

  return (
    <div className="min-h-[85vh] bg-[#F7F9FC] py-8 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Customer Dashboard & Orders - Decent School Furniture"
        description="Manage your institutional account, track recent school furniture orders, review quotation requests, and access Shopify theme templates."
      />
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Customer Header Card */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={userProfile?.displayName || user.displayName || 'Customer'}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#102A43]"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#102A43] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  {(userProfile?.displayName || user.displayName || user.email || 'D')[0].toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#102A43]">
                    {userProfile?.displayName || user.displayName || 'Institutional Partner'}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Customer
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#486581]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#627D98]" />
                    {user.email}
                  </span>
                  {(userProfile?.institution || institution) && (
                    <span className="flex items-center gap-1 font-medium text-[#102A43]">
                      <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {userProfile?.institution || institution}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#627D98]" />
                    {userProfile?.city || city || 'Pakistan'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => setIsSupabaseModalOpen(true)}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="View Supabase backend sync status"
              >
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Supabase Sync</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
              <button
                onClick={() => openQuoteModal()}
                className="flex-1 sm:flex-initial px-3.5 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Quote Request</span>
              </button>
              <button
                onClick={logoutUser}
                className="px-3.5 py-2 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-[#D9E2EC] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Sign out of account"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-[#E2E8F0] overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#102A43] text-[#102A43] bg-[#F7F9FC]'
                  : 'border-transparent text-[#627D98] hover:text-[#102A43]'
              }`}
            >
              <Package className="w-4 h-4 text-[#F59E0B]" />
              <span>Orders History ({customerOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('quotations')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'quotations'
                  ? 'border-[#102A43] text-[#102A43] bg-[#F7F9FC]'
                  : 'border-transparent text-[#627D98] hover:text-[#102A43]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#F59E0B]" />
              <span>Institutional Quotations ({userQuotations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-[#102A43] text-[#102A43] bg-[#F7F9FC]'
                  : 'border-transparent text-[#627D98] hover:text-[#102A43]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#F59E0B]" />
              <span>Profile & Campus Details</span>
            </button>
            <button
              onClick={() => setActiveTab('supabase')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'supabase'
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/70'
                  : 'border-transparent text-[#627D98] hover:text-emerald-700'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Supabase Backend</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <button
              onClick={() => setActiveTab('shopify')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'shopify'
                  ? 'border-[#102A43] text-[#102A43] bg-[#F7F9FC]'
                  : 'border-transparent text-[#627D98] hover:text-[#102A43]'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#F59E0B]" />
              <span>Shopify Liquid Code</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {customerOrders.length > 0 ? (
              customerOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#F0F4F8] gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-bold text-[#102A43]">
                          Order #{order.orderNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            order.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : order.status === 'in_production'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#829AB1] mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-PK', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-[#829AB1]">Order Total</p>
                      <p className="text-lg font-bold text-[#102A43]">
                        PKR {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="py-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#F7F9FC] border border-[#D9E2EC] flex items-center justify-center text-xs font-bold text-[#102A43]">
                            {item.quantity}x
                          </div>
                          <div>
                            <p className="font-semibold text-[#102A43]">{item.title}</p>
                            {item.variantName && (
                              <p className="text-xs text-[#627D98]">{item.variantName}</p>
                            )}
                          </div>
                        </div>
                        <p className="font-semibold text-[#102A43]">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Tracking */}
                  <div className="pt-4 border-t border-[#F0F4F8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#486581]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#F59E0B]" />
                      <span>
                        Destination: <strong className="text-[#102A43]">{order.deliveryAddress}</strong>
                      </span>
                    </div>
                    {order.trackingNumber && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#829AB1]">Waybill:</span>
                        <code className="bg-[#F7F9FC] px-2 py-1 rounded border border-[#D9E2EC] text-[#102A43] font-mono font-semibold">
                          {order.trackingNumber}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-[#D9E2EC] p-12 text-center shadow-sm">
                <Package className="w-12 h-12 text-[#9FB3C8] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#102A43]">No Orders Found</h3>
                <p className="text-xs text-[#486581] mt-1 max-w-sm mx-auto">
                  Your campus has not placed any online purchases yet. You can browse our school furniture catalogue or request a formal quotation.
                </p>
                <button
                  onClick={() => onNavigate('/collections/all')}
                  className="mt-4 px-4 py-2 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Browse School Furniture Catalogue
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Quotations */}
        {activeTab === 'quotations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#102A43] text-white p-4 rounded-2xl shadow-sm">
              <div>
                <h3 className="font-bold text-sm">Institutional Quotation System</h3>
                <p className="text-xs text-slate-300">
                  Track custom campus bids, tenders, and official proforma invoices.
                </p>
              </div>
              <button
                onClick={() => openQuoteModal()}
                className="px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Submit New Inquiry
              </button>
            </div>

            {userQuotations.length > 0 ? (
              userQuotations.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#F0F4F8] gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#102A43]">
                          Quotation Ref: #{quote.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                            quote.status === 'quoted'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {quote.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#829AB1] mt-0.5">
                        School: {quote.institutionName} • City: {quote.deliveryCity}
                      </p>
                    </div>
                    <a
                      href={getWhatsAppUrl(`Quotation Inquiry Ref #${quote.id} for ${quote.institutionName}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Discuss on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs">
                    <div>
                      <span className="text-[#829AB1] block">Product Category</span>
                      <strong className="text-[#102A43]">{quote.productCategory}</strong>
                    </div>
                    <div>
                      <span className="text-[#829AB1] block">Units Requested</span>
                      <strong className="text-[#102A43]">{quote.requestedQuantity} Units</strong>
                    </div>
                    <div>
                      <span className="text-[#829AB1] block">Submission Date</span>
                      <strong className="text-[#102A43]">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </strong>
                    </div>
                  </div>

                  {quote.additionalRequirements && (
                    <div className="mt-2 p-2.5 bg-[#F7F9FC] rounded-xl text-xs text-[#486581] border border-[#E2E8F0]">
                      <strong>Specifications:</strong> {quote.additionalRequirements}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-[#D9E2EC] p-12 text-center shadow-sm">
                <FileText className="w-12 h-12 text-[#9FB3C8] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#102A43]">No Quotation Requests</h3>
                <p className="text-xs text-[#486581] mt-1 max-w-sm mx-auto">
                  Submit a tender inquiry for classroom desks, library units, science lab benches, or faculty stations.
                </p>
                <button
                  onClick={() => openQuoteModal()}
                  className="mt-4 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Request Bulk School Quote
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#102A43] mb-1">
              Customer & Institutional Profile
            </h2>
            <p className="text-xs text-[#486581] mb-6">
              Update your institution name and delivery coordinates for seamless order processing.
            </p>
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1">
                  Full Name / Contact Person
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1">
                  School / College / Organization
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Army Public School & College"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1">
                    Campus City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102A43] uppercase tracking-wider mb-1">
                  Campus Delivery Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Sector H-8/4, St 14, Islamabad, Pakistan"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9E2EC] rounded-xl text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>
              <button
                type="submit"
                disabled={isSavingProfile}
                className="py-2.5 px-6 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Shopify Theme Code & Liquid Templates */}
        {activeTab === 'shopify' && (
          <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#F0F4F8] gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#102A43]">
                    Shopify Theme Code Integration
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    Production Ready
                  </span>
                </div>
                <p className="text-xs text-[#486581] mt-0.5">
                  Complete liquid files and styling matching DECENT SCHOOL FURNITURE design specs.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(liquidFiles[activeLiquidFile], activeLiquidFile)}
                className="px-3.5 py-2 bg-[#102A43] hover:bg-[#F59E0B] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === activeLiquidFile ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied Code!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Current File</span>
                  </>
                )}
              </button>
            </div>

            {/* File Switcher */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveLiquidFile('login')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeLiquidFile === 'login'
                    ? 'bg-[#102A43] text-white'
                    : 'bg-[#F7F9FC] text-[#486581] hover:bg-slate-200'
                }`}
              >
                dsf-customer-login.liquid
              </button>
              <button
                onClick={() => setActiveLiquidFile('register')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeLiquidFile === 'register'
                    ? 'bg-[#102A43] text-white'
                    : 'bg-[#F7F9FC] text-[#486581] hover:bg-slate-200'
                }`}
              >
                dsf-customer-register.liquid
              </button>
              <button
                onClick={() => setActiveLiquidFile('recover')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeLiquidFile === 'recover'
                    ? 'bg-[#102A43] text-white'
                    : 'bg-[#F7F9FC] text-[#486581] hover:bg-slate-200'
                }`}
              >
                dsf-password-recovery.liquid
              </button>
              <button
                onClick={() => setActiveLiquidFile('dashboard')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeLiquidFile === 'dashboard'
                    ? 'bg-[#102A43] text-white'
                    : 'bg-[#F7F9FC] text-[#486581] hover:bg-slate-200'
                }`}
              >
                dsf-customer-dashboard.liquid
              </button>
              <button
                onClick={() => setActiveLiquidFile('css')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeLiquidFile === 'css'
                    ? 'bg-[#102A43] text-white'
                    : 'bg-[#F7F9FC] text-[#486581] hover:bg-slate-200'
                }`}
              >
                dsf-account.css
              </button>
            </div>

            {/* Code Display */}
            <div className="mt-3 relative">
              <pre className="p-4 bg-[#0B1D2D] text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-[420px] leading-relaxed border border-[#1E3A5F]">
                <code>{liquidFiles[activeLiquidFile]}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab 5: Supabase Backend Integration */}
        {activeTab === 'supabase' && (
          <div className="space-y-6">
            {/* Status Hero Card */}
            <div className="bg-gradient-to-r from-[#102A43] via-[#1A365D] to-[#0F2942] rounded-2xl p-6 text-white border border-[#243B53] shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-black text-xl text-white">
                        Supabase Backend Sync
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Target Project: <span className="font-mono text-amber-300 font-semibold">{SUPABASE_PROJECT_ID}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={async () => {
                      setIsPingingSupabase(true);
                      try {
                        const res = await refreshSupabaseConnection();
                        showToast(res.connected ? 'Supabase connection verified! Server active.' : 'Notice: ' + res.error, 'success');
                      } finally {
                        setIsPingingSupabase(false);
                      }
                    }}
                    disabled={isPingingSupabase}
                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isPingingSupabase ? 'animate-spin text-emerald-400' : ''}`} />
                    <span>{isPingingSupabase ? 'Checking...' : 'Check Connection'}</span>
                  </button>

                  <button
                    onClick={() => setIsSupabaseModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Full Diagnostics & Test Write</span>
                  </button>
                </div>
              </div>

              {/* Endpoint Badges */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-black/30 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[11px] block font-medium">Supabase URL</span>
                  <div className="flex items-center justify-between font-mono text-emerald-300 mt-1 break-all">
                    <span>{SUPABASE_URL}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_URL);
                        showToast('Copied Supabase URL!', 'success');
                      }}
                      className="p-1 text-slate-400 hover:text-white cursor-pointer ml-2"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[11px] block font-medium">Publishable API Key</span>
                  <div className="flex items-center justify-between font-mono text-emerald-300 mt-1">
                    <span className="truncate">{SUPABASE_ANON_KEY}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_ANON_KEY);
                        showToast('Copied Supabase Key!', 'success');
                      }}
                      className="p-1 text-slate-400 hover:text-white cursor-pointer ml-2"
                      title="Copy Key"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Synced Tables Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#D9E2EC] rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#F59E0B]" />
                    <h4 className="font-mono font-bold text-sm text-[#102A43]">public.orders</h4>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    {customerOrders.length} records cached
                  </span>
                </div>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  Every order submitted via cart checkout is automatically formatted and inserted into Supabase with order numbers, line items array, total in PKR, customer shipping address, and tracking code.
                </p>
              </div>

              <div className="bg-white border border-[#D9E2EC] rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F59E0B]" />
                    <h4 className="font-mono font-bold text-sm text-[#102A43]">public.quotations</h4>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    {userQuotations.length} inquiries cached
                  </span>
                </div>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  Bulk quotation requests and custom campus order specifications (desks, benches, labs) are posted straight to Supabase with institutional requirements and phone numbers.
                </p>
              </div>

              <div className="bg-white border border-[#D9E2EC] rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#F59E0B]" />
                    <h4 className="font-mono font-bold text-sm text-[#102A43]">public.messages</h4>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Inquiries Active
                  </span>
                </div>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  Messages submitted on the Contact Us page are synchronized to Supabase with customer contact name, institution name, phone number, and inquiry message body.
                </p>
              </div>

              <div className="bg-white border border-[#D9E2EC] rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#F59E0B]" />
                    <h4 className="font-mono font-bold text-sm text-[#102A43]">public.profiles</h4>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Profile Synced
                  </span>
                </div>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  Registered customer accounts and institutional profile updates (campus name, delivery address, city, phone) are upserted into Supabase.
                </p>
              </div>
            </div>

            {/* SQL Setup Migration Box */}
            <div className="bg-white border border-[#D9E2EC] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-sm text-[#102A43]">
                    Supabase SQL Migration Script
                  </h4>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(supabaseSql);
                    showToast('SQL setup schema copied to clipboard!', 'success');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL Schema</span>
                </button>
              </div>
              <p className="text-xs text-[#627D98]">
                If you have not already created the tables in your Supabase project (<strong>{SUPABASE_PROJECT_ID}</strong>), paste this SQL into the Supabase SQL Editor and click <strong>Run</strong>.
              </p>
              <pre className="bg-[#102A43] text-emerald-300 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-56 border border-slate-700 leading-relaxed">
                {supabaseSql}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
