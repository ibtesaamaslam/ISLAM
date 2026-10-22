import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Volume2, Bell, BellOff, Compass, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { calculateFallbackPrayerTimes, PrayerTimings } from '../utils/prayerTimesCalculator';
import AzanOverlayModal from './AzanOverlayModal';
import { stopAllAppMedia } from '../utils/audioStopper';

interface PrayerCardInfo {
    key: keyof PrayerTimings;
    name: string;
    arabicName: string;
    icon: string;
    description: string;
    bgGradient: string;
    activeBorder: string;
}

const PRAYER_LIST: PrayerCardInfo[] = [
    {
        key: 'Fajr',
        name: 'Fajr',
        arabicName: 'الفجر',
        icon: '🌅',
        description: 'Dawn Prayer before Sunrise',
        bgGradient: 'from-blue-600 to-indigo-800',
        activeBorder: 'border-blue-400 ring-4 ring-blue-300'
    },
    {
        key: 'Sunrise',
        name: 'Sunrise',
        arabicName: 'الشروق',
        icon: '☀️',
        description: 'End of Fajr & Morning Light',
        bgGradient: 'from-amber-400 to-orange-500',
        activeBorder: 'border-yellow-300 ring-4 ring-yellow-200'
    },
    {
        key: 'Dhuhr',
        name: 'Dhuhr',
        arabicName: 'الظهر',
        icon: '🌞',
        description: 'Midday Noon Prayer',
        bgGradient: 'from-sky-400 to-blue-600',
        activeBorder: 'border-sky-300 ring-4 ring-sky-200'
    },
    {
        key: 'Asr',
        name: 'Asr',
        arabicName: 'العصر',
        icon: '🌤️',
        description: 'Late Afternoon Prayer',
        bgGradient: 'from-amber-500 to-orange-600',
        activeBorder: 'border-amber-400 ring-4 ring-amber-300'
    },
    {
        key: 'Maghrib',
        name: 'Maghrib',
        arabicName: 'المغرب',
        icon: '🌇',
        description: 'Sunset Prayer & Iftar Time',
        bgGradient: 'from-rose-500 to-purple-700',
        activeBorder: 'border-rose-400 ring-4 ring-rose-300'
    },
    {
        key: 'Isha',
        name: 'Isha',
        arabicName: 'العشاء',
        icon: '🌙',
        description: 'Night Prayer under the Stars',
        bgGradient: 'from-indigo-900 to-slate-950',
        activeBorder: 'border-indigo-400 ring-4 ring-indigo-300'
    }
];

export const PrayerTimesWidget: React.FC = () => {
    const [timings, setTimings] = useState<PrayerTimings | null>(null);
    const [locationName, setLocationName] = useState<string>('Detecting location...');
    const [isGpsEnabled, setIsGpsEnabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [activePrayer, setActivePrayer] = useState<string>('Dhuhr');
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; timeLeftStr: string }>({
        name: 'Asr',
        time: '',
        timeLeftStr: ''
    });
    
    // Azan Audio Alert State
    const [isAzanModalOpen, setIsAzanModalOpen] = useState<boolean>(false);
    const [azanPrayerName, setAzanPrayerName] = useState<string>('Prayer');
    const [azanAlertsEnabled, setAzanAlertsEnabled] = useState<boolean>(() => {
        try {
            const saved = localStorage.getItem('azan_alerts_enabled');
            return saved !== null ? saved === 'true' : true;
        } catch {
            return true;
        }
    });

    const lastTriggeredMinuteRef = useRef<string>('');

    // Fetch Prayer Times from Aladhan or Fallback Calculation
    const loadPrayerTimes = async (lat: number, lng: number, cityGuess?: string) => {
        setIsLoading(true);
        try {
            // Try Aladhan API with timestamp
            const timestamp = Math.floor(Date.now() / 1000);
            const response = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=2`);
            if (response.ok) {
                const data = await response.json();
                if (data.data && data.data.timings) {
                    const t = data.data.timings;
                    setTimings({
                        Fajr: t.Fajr.split(' ')[0],
                        Sunrise: t.Sunrise.split(' ')[0],
                        Dhuhr: t.Dhuhr.split(' ')[0],
                        Asr: t.Asr.split(' ')[0],
                        Maghrib: t.Maghrib.split(' ')[0],
                        Isha: t.Isha.split(' ')[0]
                    });

                    // Set location display
                    if (cityGuess) {
                        setLocationName(cityGuess);
                    } else if (data.data.meta && data.data.meta.timezone) {
                        const cleanTz = data.data.meta.timezone.replace('_', ' ').split('/').pop() || 'Local Area';
                        setLocationName(`${cleanTz} (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
                    }
                    setIsLoading(false);
                    return;
                }
            }
        } catch (err) {
            console.warn('Aladhan API unavailable, using astronomical fallback:', err);
        }

        // Astronomical solar calculation fallback
        const calculated = calculateFallbackPrayerTimes(lat, lng, new Date());
        setTimings(calculated);
        setLocationName(cityGuess || `Local Coordinates (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
        setIsLoading(false);
    };

    // Request Browser Geolocation
    const requestLocation = () => {
        if (!navigator.geolocation) {
            // Fallback to Makkah coordinates if geolocation not supported
            loadPrayerTimes(21.4225, 39.8262, 'Makkah Al-Mukarramah');
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                setIsGpsEnabled(true);
                try {
                    localStorage.setItem('user_prayer_lat', lat.toString());
                    localStorage.setItem('user_prayer_lng', lng.toString());
                } catch {}

                // Try reverse geocoding via OpenStreetMap Nominatim for human-readable city
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then(res => res.json())
                    .then(data => {
                        const city = data.address?.city || data.address?.town || data.address?.county || data.address?.country || 'Local Location';
                        const country = data.address?.country ? `, ${data.address.country}` : '';
                        loadPrayerTimes(lat, lng, `${city}${country}`);
                    })
                    .catch(() => {
                        loadPrayerTimes(lat, lng);
                    });
            },
            (error) => {
                console.warn('Geolocation denied or failed:', error.message);
                setIsGpsEnabled(false);
                // Try saved coordinates, or user's local timezone approximation
                const savedLat = localStorage.getItem('user_prayer_lat');
                const savedLng = localStorage.getItem('user_prayer_lng');
                if (savedLat && savedLng) {
                    loadPrayerTimes(parseFloat(savedLat), parseFloat(savedLng));
                } else {
                    // Default to Makkah Al-Mukarramah with guidance to enable GPS
                    loadPrayerTimes(21.4225, 39.8262, 'Makkah (Default) - Tap "Use My GPS"');
                }
            },
            { timeout: 8000, enableHighAccuracy: false }
        );
    };

    // Initial location check
    useEffect(() => {
        requestLocation();
    }, []);

    // Helper: Convert "HH:mm" to Date object on today's date
    const parseTimeToDate = (timeStr: string, baseDate: Date = new Date()): Date => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const d = new Date(baseDate);
        d.setHours(hours, minutes, 0, 0);
        return d;
    };

    // Format 24h "HH:mm" to 12h format with AM/PM
    const formatTo12Hour = (timeStr: string): string => {
        if (!timeStr) return '--:--';
        const [hStr, mStr] = timeStr.split(':');
        let h = parseInt(hStr, 10);
        const m = mStr || '00';
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12; // 0 becomes 12
        return `${h}:${m} ${ampm}`;
    };

    // Clock update and Active Prayer calculation every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            if (!timings) return;

            const nowMs = now.getTime();
            const fajrDate = parseTimeToDate(timings.Fajr, now);
            const sunriseDate = parseTimeToDate(timings.Sunrise, now);
            const dhuhrDate = parseTimeToDate(timings.Dhuhr, now);
            const asrDate = parseTimeToDate(timings.Asr, now);
            const maghribDate = parseTimeToDate(timings.Maghrib, now);
            const ishaDate = parseTimeToDate(timings.Isha, now);

            // Determine active prayer based on current time
            let currentActive = 'Isha';
            let nextInfo = { name: 'Fajr', date: fajrDate, time: timings.Fajr };

            if (nowMs >= fajrDate.getTime() && nowMs < sunriseDate.getTime()) {
                currentActive = 'Fajr';
                nextInfo = { name: 'Sunrise', date: sunriseDate, time: timings.Sunrise };
            } else if (nowMs >= sunriseDate.getTime() && nowMs < dhuhrDate.getTime()) {
                currentActive = 'Sunrise';
                nextInfo = { name: 'Dhuhr', date: dhuhrDate, time: timings.Dhuhr };
            } else if (nowMs >= dhuhrDate.getTime() && nowMs < asrDate.getTime()) {
                currentActive = 'Dhuhr';
                nextInfo = { name: 'Asr', date: asrDate, time: timings.Asr };
            } else if (nowMs >= asrDate.getTime() && nowMs < maghribDate.getTime()) {
                currentActive = 'Asr';
                nextInfo = { name: 'Maghrib', date: maghribDate, time: timings.Maghrib };
            } else if (nowMs >= maghribDate.getTime() && nowMs < ishaDate.getTime()) {
                currentActive = 'Maghrib';
                nextInfo = { name: 'Isha', date: ishaDate, time: timings.Isha };
            } else {
                currentActive = 'Isha';
                // Next is tomorrow's Fajr
                const tomorrowFajr = new Date(fajrDate);
                if (nowMs >= ishaDate.getTime()) {
                    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
                }
                nextInfo = { name: 'Fajr', date: tomorrowFajr, time: timings.Fajr };
            }

            setActivePrayer(currentActive);

            // Calculate countdown string to next prayer
            const diffMs = nextInfo.date.getTime() - nowMs;
            if (diffMs > 0) {
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
                setNextPrayer({
                    name: nextInfo.name,
                    time: nextInfo.time,
                    timeLeftStr: `${hours > 0 ? `${hours}h ` : ''}${mins}m ${secs}s`
                });
            } else {
                setNextPrayer({
                    name: nextInfo.name,
                    time: nextInfo.time,
                    timeLeftStr: 'Right now!'
                });
            }

            // --- CHECK FOR AZAN TRIGGER AT PRAYER HIT TIME ---
            // Only trigger Azan for actual prayers (Fajr, Dhuhr, Asr, Maghrib, Isha), not Sunrise
            if (azanAlertsEnabled) {
                const nowHourMinute = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
                
                const prayersToCheck: (keyof PrayerTimings)[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
                
                for (const pKey of prayersToCheck) {
                    const pTime = timings[pKey];
                    if (pTime === nowHourMinute) {
                        const triggerKey = `${todayKey}_${pKey}_${nowHourMinute}`;
                        if (lastTriggeredMinuteRef.current !== triggerKey) {
                            lastTriggeredMinuteRef.current = triggerKey;
                            
                            // 1. STOP ALL AUDIO ACROSS THE APP IMMEDIATELY
                            stopAllAppMedia();

                            // 2. Open Azan overlay & start Azan audio
                            setAzanPrayerName(pKey);
                            setIsAzanModalOpen(true);
                            break;
                        }
                    }
                }
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [timings, azanAlertsEnabled]);

    // Handle Manual Test / Preview Azan
    const handleTestAzan = () => {
        stopAllAppMedia();
        setAzanPrayerName(activePrayer !== 'Sunrise' ? activePrayer : 'Dhuhr');
        setIsAzanModalOpen(true);
    };

    // Toggle Azan Alerts
    const handleToggleAzanAlerts = () => {
        const next = !azanAlertsEnabled;
        setAzanAlertsEnabled(next);
        try {
            localStorage.setItem('azan_alerts_enabled', next ? 'true' : 'false');
        } catch {}
    };

    return (
        <section className="relative mb-12 w-full">
            {/* Azan Modal Overlay */}
            <AzanOverlayModal 
                isOpen={isAzanModalOpen}
                prayerName={azanPrayerName}
                onClose={() => setIsAzanModalOpen(false)}
            />

            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 md:p-10 text-white shadow-2xl border-4 border-amber-300">
                {/* Decorative golden ambient glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header Row */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
                    <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider shadow-sm">
                                🕌 Daily Prayer Times
                            </span>
                            <span className="text-xs font-bold text-amber-200/90 flex items-center gap-1">
                                <Clock size={13} /> Synchronized with Browser Geolocation
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                            <span>Today's Local Salah Schedule</span>
                        </h2>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-yellow-100 font-bold mt-1 flex-wrap">
                            <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                                <MapPin size={13} className="text-amber-400" />
                                {locationName}
                            </span>
                            <button
                                onClick={requestLocation}
                                className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline cursor-pointer text-xs"
                                title="Refresh live GPS location"
                            >
                                <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                                {isGpsEnabled ? "Update GPS" : "Use My GPS"}
                            </button>
                        </div>
                    </div>

                    {/* Quick Controls: Azan Sound Alerts & Test Azan Button */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleTestAzan}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-900 font-black text-xs sm:text-sm rounded-2xl shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none transition-all cursor-pointer border border-white/40"
                            title="Test Azan sound and audio pause across the app"
                        >
                            <Volume2 size={16} strokeWidth={2.5} />
                            <span>Test Azan & Sound Halt</span>
                        </motion.button>

                        <button
                            onClick={handleToggleAzanAlerts}
                            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                                azanAlertsEnabled 
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30' 
                                    : 'bg-rose-500/20 text-rose-300 border-rose-400/40 hover:bg-rose-500/30'
                            }`}
                            title={azanAlertsEnabled ? "Azan audio alert is active at prayer times" : "Azan alerts muted"}
                        >
                            {azanAlertsEnabled ? <Bell size={15} /> : <BellOff size={15} />}
                            <span>{azanAlertsEnabled ? 'Azan Alert: ON' : 'Azan Alert: OFF'}</span>
                        </button>
                    </div>
                </div>

                {/* Active Prayer Spotlight Banner */}
                <div className="relative z-10 my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-orange-500/25 border-2 border-amber-400/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-3xl shadow-lg border-2 border-white shrink-0">
                            {PRAYER_LIST.find(p => p.name === activePrayer)?.icon || '🕌'}
                        </div>
                        <div>
                            <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                                <Sparkles size={13} className="text-amber-400" />
                                Current Active Salah Time
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white">
                                {activePrayer} <span className="font-serif text-amber-200 text-lg">({PRAYER_LIST.find(p => p.name === activePrayer)?.arabicName})</span>
                            </h3>
                            <p className="text-xs font-bold text-yellow-100">
                                {PRAYER_LIST.find(p => p.name === activePrayer)?.description}
                            </p>
                        </div>
                    </div>

                    {/* Next Prayer Countdown */}
                    <div className="bg-black/40 px-5 py-3 rounded-2xl border border-white/20 text-center sm:text-right shrink-0">
                        <div className="text-[10px] font-black uppercase text-yellow-300">
                            Next: {nextPrayer.name} ({formatTo12Hour(nextPrayer.time)})
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white tracking-wide font-mono mt-0.5">
                            {nextPrayer.timeLeftStr || '--:--'}
                        </div>
                        <div className="text-[10px] text-white/70 font-medium">
                            Azan will sound automatically
                        </div>
                    </div>
                </div>

                {/* 6 Prayer Cards Grid (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    {PRAYER_LIST.map((prayer) => {
                        const rawTime = timings ? timings[prayer.key] : '--:--';
                        const formatted12h = formatTo12Hour(rawTime);
                        const isActive = activePrayer === prayer.name;
                        const isNext = nextPrayer.name === prayer.name;

                        return (
                            <motion.div
                                key={prayer.name}
                                whileHover={{ scale: 1.03 }}
                                className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                                    isActive
                                        ? `bg-gradient-to-b ${prayer.bgGradient} ${prayer.activeBorder} shadow-2xl`
                                        : isNext
                                            ? 'bg-slate-800/80 border-2 border-yellow-400/80 shadow-lg'
                                            : 'bg-white/5 border border-white/10 hover:border-white/30'
                                }`}
                            >
                                {/* Active Badge */}
                                {isActive && (
                                    <div className="absolute top-2 right-2 bg-yellow-300 text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                                        ACTIVE
                                    </div>
                                )}
                                {!isActive && isNext && (
                                    <div className="absolute top-2 right-2 bg-amber-400/90 text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                                        UPCOMING
                                    </div>
                                )}

                                <div>
                                    <div className="text-3xl mb-2">{prayer.icon}</div>
                                    <div className="flex items-baseline justify-between gap-1">
                                        <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                                            {prayer.name}
                                        </h4>
                                        <span className="font-serif text-xs text-yellow-200" dir="rtl">
                                            {prayer.arabicName}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/15">
                                    <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                                        {isLoading ? '...' : formatted12h}
                                    </div>
                                    <div className="text-[10px] text-white/60 font-medium">
                                        {isLoading ? 'Calculating' : `${rawTime} (24h)`}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-yellow-100/80 font-medium gap-2">
                    <p className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-amber-400" />
                        "Guard strictly your prayers, especially the middle prayer, and stand before Allah with devotion." (Quran 2:238)
                    </p>
                    <p className="text-white/60 text-[11px]">
                        Audio auto-stops when Azan plays &bull; High accuracy calculation
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrayerTimesWidget;
