import { useEffect, useState } from "react";
import { getAuthState, subscribe, type AuthState } from "src/config/authStore";

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => getAuthState());

  useEffect(() => {
    setState(getAuthState());

    const unsub = subscribe(() => {
      setState({ ...getAuthState() });
    });

    return unsub;
  }, []);

  return state;
}