/**
 * Sunset time for a location, using the NOAA sunrise equation
 * (accurate to about a minute, which is plenty for a status line).
 */
export function sunsetUTC(date: Date, latitude: number, longitude: number): Date | null {
  const rad = Math.PI / 180;
  const julianDay = date.getTime() / 86400000 + 2440587.5;
  const n = Math.round(julianDay - 2451545.0 + 0.0008);
  const meanSolarNoon = n - longitude / 360;
  const M = (357.5291 + 0.98560028 * meanSolarNoon) % 360;
  const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
  const lambda = (M + C + 180 + 102.9372) % 360;
  const transit = 2451545.0 + meanSolarNoon + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const sinDecl = Math.sin(lambda * rad) * Math.sin(23.4397 * rad);
  const cosDecl = Math.cos(Math.asin(sinDecl));
  const cosHourAngle =
    (Math.sin(-0.833 * rad) - Math.sin(latitude * rad) * sinDecl) / (Math.cos(latitude * rad) * cosDecl);
  if (cosHourAngle < -1 || cosHourAngle > 1) return null; // polar day or night
  const set = transit + Math.acos(cosHourAngle) / rad / 360;
  return new Date((set - 2440587.5) * 86400000);
}

/** "HH:MM" sunset in the given time zone, or null if it cannot be computed. */
export function formatSunset(date: Date, latitude: number, longitude: number, timeZone: string): string | null {
  const set = sunsetUTC(date, latitude, longitude);
  if (!set) return null;
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(set);
  } catch {
    return null;
  }
}

/**
 * Sun altitude and azimuth (degrees, azimuth clockwise from north) for a place and time.
 * Low-precision astronomical formulae, good to a fraction of a degree.
 */
export function sunPosition(date: Date, latitude: number, longitude: number): { altitude: number; azimuth: number } {
  const rad = Math.PI / 180;
  const d = date.getTime() / 86400000 + 2440587.5 - 2451545.0;
  const g = (357.528 + 0.9856003 * d) * rad;
  const lambda = (280.46 + 0.9856474 * d + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad;
  const eps = (23.439 - 0.0000004 * d) * rad;
  const ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
  const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
  const gmst = (18.697374558 + 24.06570982441908 * d) * 15 * rad;
  const hourAngle = gmst + longitude * rad - ra;
  const lat = latitude * rad;
  const altitude = Math.asin(Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(hourAngle));
  const azimuth =
    Math.atan2(Math.sin(hourAngle), Math.cos(hourAngle) * Math.sin(lat) - Math.tan(dec) * Math.cos(lat)) / rad + 180;
  return { altitude: altitude / rad, azimuth: ((azimuth % 360) + 360) % 360 };
}

/** Length in metres of the shadow of a 1 m pole, or null when the sun is below about 3°. */
export function poleShadow(altitudeDeg: number): number | null {
  if (altitudeDeg < 3) return null;
  return 1 / Math.tan((altitudeDeg * Math.PI) / 180);
}
