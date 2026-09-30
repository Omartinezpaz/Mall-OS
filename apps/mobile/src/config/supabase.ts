import { createClient } from '@supabase/supabase-js';
import type { Database } from '@mallos/types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno: EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY son obligatorias.',
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // En el piloto: sesión anónima. No usamos AsyncStorage persistido para auth.
    // El usuario se registra al activar el primer cupón (D-010).
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
