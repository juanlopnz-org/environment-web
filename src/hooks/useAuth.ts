import { useEffect, useState } from "react";
import { getAuthState, subscribe, type AuthState } from "src/config/authStore";

export function useAuth() {

  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    setState(prev => ({ ...prev, mounted: true }));

    return subscribe(() => {
      setState({
        ...getAuthState(),
      });
    });

  }, []);

  return state;
}
