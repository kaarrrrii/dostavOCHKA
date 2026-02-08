const AUTH_KEY = 'isAuthenticated';

export function readAuthState() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(AUTH_KEY) === 'true';
}

export function writeAuthState(value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_KEY, value ? 'true' : 'false');
}

export function clearAuthState() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_KEY);
}

