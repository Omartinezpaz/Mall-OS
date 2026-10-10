import { createClient } from '@supabase/supabase-js';
import type { Database } from '@mallos/types';

const DEFAULT_SUPABASE_URL = 'https://bgncghyhyosugfnraoqm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'sb_publishable_aFcWDnyP9OSoSEb5DVrIfA_MNcqrp-y';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // En el piloto: sesión anónima. No usamos AsyncStorage persistido para auth.
    // El usuario se registra al activar el primer cupón (D-010).
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
