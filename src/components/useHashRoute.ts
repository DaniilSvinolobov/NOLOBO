import { useEffect, useState } from 'react';

const PREFIX = '#/project/';

const read = () => {
  const h = typeof window === 'undefined' ? '' : window.location.hash;
  return h.startsWith(PREFIX) ? decodeURIComponent(h.slice(PREFIX.length)) : null;
};

export const projectHref = (id: string) => `${PREFIX}${encodeURIComponent(id)}`;

/** Current project id from the URL hash (#/project/<id>), or null on the main page. */
export function useProjectRoute(): string | null {
  const [id, setId] = useState<string | null>(read);

  useEffect(() => {
    const onChange = () => setId(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return id;
}
