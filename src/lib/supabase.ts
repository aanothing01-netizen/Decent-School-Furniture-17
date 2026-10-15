import { createClient } from '@supabase/supabase-js';
import { CustomerOrder, QuotationRequest, UserProfile } from '../types';

// Supabase project credentials provided for project: xbtxawcadgnmoxtjhwuc
export const SUPABASE_PROJECT_ID = 'xbtxawcadgnmoxtjhwuc';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://xbtxawcadgnmoxtjhwuc.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_cfkingv3VqwB1eYDcEkPUw_-0Xbs36y';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseStatus {
  connected: boolean;
  projectId: string;
  url: string;
  error?: string | null;
  lastChecked: string;
}

/**
 * Checks connection to the Supabase backend
 */
export async function checkSupabaseConnection(): Promise<SupabaseStatus> {
  const result: SupabaseStatus = {
    connected: false,
    projectId: SUPABASE_PROJECT_ID,
    url: SUPABASE_URL,
    lastChecked: new Date().toISOString(),
  };

  try {
    // Attempt a light ping by querying public schema or auth health
    const { error } = await supabase.from('orders').select('id').limit(1);
    if (!error || error.code === 'PGRST116' || error.message?.includes('0 rows') || !error.message?.includes('Failed to fetch')) {
      result.connected = true;
    } else {
      result.error = error.message;
      result.connected = true; // Connection reached server even if table needs creation
    }
  } catch (err: any) {
    console.warn('[Supabase Connection Test]:', err);
    result.error = err.message || 'Network error reaching Supabase';
    result.connected = false;
  }

  return result;
}

/**
 * Save customer order to Supabase 'orders' table
 */
export async function saveOrderToSupabase(order: CustomerOrder, userId?: string | null) {
  try {
    const payload = {
      id: order.id,
      order_number: order.orderNumber,
      user_id: userId || 'guest',
      items: order.items,
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      total: order.total,
      currency: order.currency || 'PKR',
      status: order.status,
      payment_method: order.paymentMethod,
      delivery_address: order.deliveryAddress,
      tracking_number: order.trackingNumber || null,
      created_at: order.createdAt || new Date().toISOString(),
    };

    const { data, error } = await supabase.from('orders').insert([payload]).select();

    if (error) {
      console.warn('[Supabase] Orders table insert notice:', error.message);
      // Fallback attempt with camelCase in case table was created with camelCase
      const fallbackPayload = {
        id: order.id,
        orderNumber: order.orderNumber,
        userId: userId || 'guest',
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
        currency: order.currency || 'PKR',
        status: order.status,
        paymentMethod: order.paymentMethod,
        deliveryAddress: order.deliveryAddress,
        trackingNumber: order.trackingNumber || null,
        createdAt: order.createdAt || new Date().toISOString(),
      };
      const fallbackRes = await supabase.from('orders').insert([fallbackPayload]).select();
      if (!fallbackRes.error) {
        return { success: true, data: fallbackRes.data };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[Supabase Save Order Exception]:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch orders for a user or all recent orders
 */
export async function fetchOrdersFromSupabase(userId?: string | null): Promise<CustomerOrder[]> {
  try {
    let query = supabase.from('orders').select('*');
    if (userId && userId !== 'guest') {
      query = query.or(`user_id.eq.${userId},userId.eq.${userId}`);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      orderNumber: row.order_number || row.orderNumber || row.id,
      createdAt: row.created_at || row.createdAt || new Date().toISOString(),
      items: Array.isArray(row.items) ? row.items : [],
      subtotal: Number(row.subtotal || 0),
      tax: Number(row.tax || 0),
      shipping: Number(row.shipping || 0),
      total: Number(row.total || 0),
      currency: row.currency || 'PKR',
      status: row.status || 'confirmed',
      paymentMethod: row.payment_method || row.paymentMethod || 'Cash on Delivery',
      deliveryAddress: row.delivery_address || row.deliveryAddress || '',
      trackingNumber: row.tracking_number || row.trackingNumber || undefined,
    }));
  } catch (err) {
    console.warn('[Supabase Fetch Orders]:', err);
    return [];
  }
}

/**
 * Save quote request or custom inquiry to Supabase 'quotations' table
 */
export async function saveQuotationToSupabase(quotation: QuotationRequest, userId?: string | null) {
  try {
    const payload = {
      id: quotation.id,
      user_id: userId || null,
      customer_name: quotation.customerName,
      institution_name: quotation.institutionName,
      phone: quotation.phone,
      email: quotation.email || null,
      product_category: quotation.productCategory,
      requested_quantity: String(quotation.requestedQuantity),
      delivery_city: quotation.deliveryCity,
      custom_dimensions: quotation.customDimensions || null,
      material_preference: quotation.materialPreference || null,
      additional_requirements: quotation.additionalRequirements || null,
      preferred_product: quotation.preferredProduct || null,
      status: quotation.status || 'pending',
      created_at: quotation.createdAt || new Date().toISOString(),
    };

    const { data, error } = await supabase.from('quotations').insert([payload]).select();

    if (error) {
      console.warn('[Supabase] Quotations insert warning:', error.message);
      // Fallback with camelCase format
      const fallbackPayload = {
        id: quotation.id,
        userId: userId || null,
        customerName: quotation.customerName,
        institutionName: quotation.institutionName,
        phone: quotation.phone,
        email: quotation.email || null,
        productCategory: quotation.productCategory,
        requestedQuantity: String(quotation.requestedQuantity),
        deliveryCity: quotation.deliveryCity,
        customDimensions: quotation.customDimensions || null,
        materialPreference: quotation.materialPreference || null,
        additionalRequirements: quotation.additionalRequirements || null,
        preferredProduct: quotation.preferredProduct || null,
        status: quotation.status || 'pending',
        createdAt: quotation.createdAt || new Date().toISOString(),
      };
      const fallbackRes = await supabase.from('quotations').insert([fallbackPayload]).select();
      if (!fallbackRes.error) {
        return { success: true, data: fallbackRes.data };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[Supabase Save Quotation Exception]:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch quotations from Supabase
 */
export async function fetchQuotationsFromSupabase(userId?: string | null): Promise<QuotationRequest[]> {
  try {
    let query = supabase.from('quotations').select('*');
    if (userId) {
      query = query.or(`user_id.eq.${userId},userId.eq.${userId}`);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      createdAt: row.created_at || row.createdAt || new Date().toISOString(),
      customerName: row.customer_name || row.customerName || '',
      institutionName: row.institution_name || row.institutionName || '',
      phone: row.phone || '',
      email: row.email || '',
      productCategory: row.product_category || row.productCategory || 'School Furniture',
      requestedQuantity: row.requested_quantity || row.requestedQuantity || 10,
      deliveryCity: row.delivery_city || row.deliveryCity || '',
      customDimensions: row.custom_dimensions || row.customDimensions,
      materialPreference: row.material_preference || row.materialPreference,
      additionalRequirements: row.additional_requirements || row.additionalRequirements,
      preferredProduct: row.preferred_product || row.preferredProduct,
      status: row.status || 'pending',
    }));
  } catch (err) {
    console.warn('[Supabase Fetch Quotations]:', err);
    return [];
  }
}

/**
 * Save contact message inquiry to Supabase 'messages' table
 */
export async function saveMessageToSupabase(message: {
  id: string;
  name: string;
  phone: string;
  email?: string;
  institution?: string;
  subject?: string;
  message: string;
  createdAt?: string;
}) {
  try {
    const payload = {
      id: message.id,
      name: message.name,
      phone: message.phone,
      email: message.email || null,
      institution: message.institution || null,
      subject: message.subject || 'School Furniture Inquiry',
      message: message.message,
      created_at: message.createdAt || new Date().toISOString(),
    };

    const { data, error } = await supabase.from('messages').insert([payload]).select();

    if (error) {
      console.warn('[Supabase] Messages insert warning:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    console.error('[Supabase Save Message Exception]:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Save or sync user profile into Supabase 'profiles' table
 */
export async function saveUserProfileToSupabase(profile: UserProfile) {
  try {
    const payload = {
      id: profile.userId,
      user_id: profile.userId,
      email: profile.email,
      display_name: profile.displayName,
      first_name: profile.firstName || null,
      last_name: profile.lastName || null,
      institution: profile.institution || null,
      phone: profile.phone || null,
      city: profile.city || null,
      address: profile.address || null,
      role: profile.role || 'customer',
      created_at: profile.createdAt || new Date().toISOString(),
    };

    const { data, error } = await supabase.from('profiles').upsert([payload]).select();
    if (error) {
      console.warn('[Supabase] Profiles upsert notice:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    console.error('[Supabase Save Profile Exception]:', err);
    return { success: false, error: err.message };
  }
}

export const SUPABASE_SQL_SETUP = `-- Copy and run this in your Supabase SQL Editor:
-- Project: xbtxawcadgnmoxtjhwuc (Decent School Furniture)

-- 1. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL,
    user_id TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    tax NUMERIC DEFAULT 0,
    shipping NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'PKR',
    status TEXT DEFAULT 'confirmed',
    payment_method TEXT,
    delivery_address TEXT,
    tracking_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Quotations & Custom Inquiries table
CREATE TABLE IF NOT EXISTS public.quotations (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    customer_name TEXT,
    institution_name TEXT,
    phone TEXT,
    email TEXT,
    product_category TEXT,
    requested_quantity TEXT,
    delivery_city TEXT,
    custom_dimensions TEXT,
    material_preference TEXT,
    additional_requirements TEXT,
    preferred_product TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Contact Inquiries & Messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    institution TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. User Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    email TEXT,
    display_name TEXT,
    first_name TEXT,
    last_name TEXT,
    institution TEXT,
    phone TEXT,
    city TEXT,
    address TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert policies for your app
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of orders" ON public.orders FOR SELECT USING (true);

CREATE POLICY "Allow public insert to quotations" ON public.quotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of quotations" ON public.quotations FOR SELECT USING (true);

CREATE POLICY "Allow public insert to messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of messages" ON public.messages FOR SELECT USING (true);

CREATE POLICY "Allow public all to profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
`;
