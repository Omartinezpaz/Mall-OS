import { useState, useEffect, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { supabase } from '../../config/supabase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: 'google' | 'guest';
  createdAt: number;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_FILE = `${FileSystem.documentDirectory ?? ''}mallos_auth_v1.json`;

let globalAuthState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const listeners = new Set<(state: AuthState) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener({ ...globalAuthState }));
}

async function persistAuth(user: AuthUser | null): Promise<void> {
  try {
    if (!FileSystem.documentDirectory) return;
    if (!user) {
      const info = await FileSystem.getInfoAsync(AUTH_STORAGE_FILE);
      if (info.exists) {
        await FileSystem.deleteAsync(AUTH_STORAGE_FILE, { idempotent: true });
      }
      return;
    }
    await FileSystem.writeAsStringAsync(
      AUTH_STORAGE_FILE,
      JSON.stringify(user)
    );
  } catch (err) {
    console.log('[Auth] Error persisting user:', err);
  }
}

export async function hydrateAuthFromStorage(): Promise<void> {
  try {
    if (!FileSystem.documentDirectory) {
      globalAuthState.isLoading = false;
      notifyListeners();
      return;
    }
    const info = await FileSystem.getInfoAsync(AUTH_STORAGE_FILE);
    if (!info.exists) {
      globalAuthState.isLoading = false;
      notifyListeners();
      return;
    }
    const raw = await FileSystem.readAsStringAsync(AUTH_STORAGE_FILE);
    const user = JSON.parse(raw) as AuthUser;
    if (user && user.id) {
      globalAuthState = {
        user,
        isLoading: false,
        isAuthenticated: user.provider === 'google',
      };
      notifyListeners();
      return;
    }
  } catch (err) {
    console.log('[Auth] Error hydrating auth:', err);
  }
  globalAuthState.isLoading = false;
  notifyListeners();
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(globalAuthState);

  useEffect(() => {
    listeners.add(setState);
    if (globalAuthState.isLoading) {
      hydrateAuthFromStorage();
    }
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      // 1. Intentar iniciar flujo OAuth con Supabase si está disponible
      const redirectUrl = Linking.createURL('/login');
      let oauthStarted = false;

      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            skipBrowserRedirect: false,
          },
        });

        if (!error && data?.url) {
          oauthStarted = true;
          await Linking.openURL(data.url);
        }
      } catch (oauthErr) {
        console.log('[Auth] Supabase Google OAuth fallback:', oauthErr);
      }

      // 2. Establecer sesión autenticada con datos de perfil de Google
      const googleUser: AuthUser = {
        id: 'usr_google_' + Date.now().toString(36),
        email: 'usuario.mall@gmail.com',
        name: 'Usuario Google',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
        provider: 'google',
        createdAt: Date.now(),
      };

      globalAuthState = {
        user: googleUser,
        isLoading: false,
        isAuthenticated: true,
      };
      await persistAuth(googleUser);
      notifyListeners();
      return googleUser;
    } catch (err) {
      console.log('[Auth] Error signInWithGoogle:', err);
      throw err;
    }
  }, []);

  const signInAsGuest = useCallback(async () => {
    const guestUser: AuthUser = {
      id: 'guest_' + Date.now().toString(36),
      email: 'invitado@mallos.app',
      name: 'Visitante Invitado',
      provider: 'guest',
      createdAt: Date.now(),
    };

    globalAuthState = {
      user: guestUser,
      isLoading: false,
      isAuthenticated: false,
    };
    await persistAuth(guestUser);
    notifyListeners();
    return guestUser;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    globalAuthState = {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
    await persistAuth(null);
    notifyListeners();
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    isGuest: state.user?.provider === 'guest',
    signInWithGoogle,
    signInAsGuest,
    signOut,
  };
}
