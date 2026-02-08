import { APP_PAGES, ROUTES } from '../constants/routes';

export function getCurrentPageFromPathname(pathname) {
  if (pathname === ROUTES.AUTH) return APP_PAGES.AUTH;
  if (pathname === ROUTES.PROFILE) return APP_PAGES.PROFILE;
  return APP_PAGES.HOME;
}

export function getCurrentPage() {
  if (typeof window === 'undefined') {
    return APP_PAGES.HOME;
  }

  return getCurrentPageFromPathname(window.location.pathname);
}

export function navigateTo(path) {
  if (typeof window === 'undefined') return;

  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
}

