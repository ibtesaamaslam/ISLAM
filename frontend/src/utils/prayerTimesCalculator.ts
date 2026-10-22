// Offline / Fallback Astronomical Prayer Times Calculation
// Based on standard solar positioning algorithms (Fajr/Isha angle ~18 degrees)

export interface PrayerTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}

export function calculateFallbackPrayerTimes(latitude: number, longitude: number, date: Date = new Date()): PrayerTimings {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    // Solar declination (approximate)
    const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
    const declination = 23.45 * Math.sin(B) * (Math.PI / 180);
    
    // Equation of time in minutes
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    
    // Local Timezone Offset in hours
    const timezoneOffsetHours = -date.getTimezoneOffset() / 60;
    
    // Solar Noon (Dhuhr) in local hours
    const solarNoon = 12 + (timezoneOffsetHours * 15 - longitude) / 15 - eot / 60;
    
    const latRad = latitude * (Math.PI / 180);
    
    // Helper to calculate hour angle for a given solar altitude angle
    const getHourAngle = (altitudeDeg: number): number => {
        const altRad = altitudeDeg * (Math.PI / 180);
        const cosHA = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(declination)) / 
                      (Math.cos(latRad) * Math.cos(declination));
        if (cosHA > 1) return 0;
        if (cosHA < -1) return 180;
        return Math.acos(cosHA) * (180 / Math.PI);
    };

    // Sunrise & Sunset: sun center is -0.833 degrees below horizon
    const haSunrise = getHourAngle(-0.833) / 15;
    
    // Fajr: sun is 18 degrees below horizon
    const haFajr = getHourAngle(-18) / 15;
    
    // Isha: sun is 17-18 degrees below horizon
    const haIsha = getHourAngle(-17) / 15;
    
    // Asr (Standard / Shafi: shadow length = object + noon shadow)
    const noonAlt = 90 - (latitude - (declination * 180 / Math.PI));
    const asrAlt = (Math.atan(1 / (1 + Math.tan((90 - noonAlt) * Math.PI / 180)))) * (180 / Math.PI);
    const haAsr = getHourAngle(asrAlt) / 15;

    const toTimeString = (decimalHours: number): string => {
        let h = Math.floor(decimalHours);
        let m = Math.floor((decimalHours - h) * 60);
        if (m >= 60) { h += 1; m = 0; }
        while (h < 0) h += 24;
        while (h >= 24) h -= 24;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    return {
        Fajr: toTimeString(solarNoon - haFajr),
        Sunrise: toTimeString(solarNoon - haSunrise),
        Dhuhr: toTimeString(solarNoon + 0.05), // slightly after zenith
        Asr: toTimeString(solarNoon + haAsr),
        Maghrib: toTimeString(solarNoon + haSunrise),
        Isha: toTimeString(solarNoon + haIsha)
    };
}
