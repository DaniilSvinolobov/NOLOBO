import { useEffect, useState } from 'react';

const PREFIX = '#/project/';

export type Page = 'home' | 'studio' | 'services' | 'research' | 'contact';

export interface Route {
  page: Page;
  projectId: string | null;
}

const PAGES: Page[] = ['studio', 'services', 'research', 'contact'];

/** Old section anchors still resolve: #work is the home page, #materials is Research. */
const LEGACY: Record<string, Page> = {
  work: 'home',
  approach: 'studio',
  materials: 'research',
};

const read = (): Route => {
  const h = typeof window === 'undefined' ? '' : window.location.hash;
  if (h.startsWith(PREFIX)) return { page: 'home', projectId: decodeURIComponent(h.slice(PREFIX.length)) };
  const key = h.replace(/^#\/?/, '');
  if ((PAGES as string[]).includes(key)) return { page: key as Page, projectId: null };
  return { page: LEGACY[key] ?? 'home', projectId: null };
};

export const projectHref = (id: string) => `${PREFIX}${encodeURIComponent(id)}`;
export const pageHref = (page: Page) => (page === 'home' ? '#/' : `#/${page}`);

/** Current page or project from the URL hash (#/studio, #/project/<id>). */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(read);

  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
