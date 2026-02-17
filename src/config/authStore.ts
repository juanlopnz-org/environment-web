import { supabase } from "./supabaseConfig";
import type { Session, User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

let state: AuthState = {
  user: null,
  session: null,
  loading: true,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function getAuthState() {
  return state;
}

export function subscribe(callback: () => void): () => void {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

supabase.auth.getSession().then(({ data }) => {
  state = {
    user: data.session?.user ?? null,
    session: data.session ?? null,
    loading: false,
  };

  emit();
});

supabase.auth.onAuthStateChange((_event, session) => {
  state = {
    user: session?.user ?? null,
    session: session ?? null,
    loading: false,
  };

  emit();
});
