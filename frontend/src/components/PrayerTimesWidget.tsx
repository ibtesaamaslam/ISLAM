import React, { useState, useEffect } from 'react';
import { PrayerTimes, Coordinates, CalculationMethod } from 'adhan';
import { MapPin, Clock, Edit2, Save, X, Moon, Sun } from 'lucide-react';

interface PrayerTimesState {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

interface PrayerOffsets {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
}

const PrayerTimesWidget = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimesState | null>(null);
    const [rawPrayerTimes, setRawPrayerTimes] = useState<PrayerTimes | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Load offsets from local storage
    const [offsets, setOffsets] = useState<PrayerOffsets>(() => {
        try {
            const saved = localStorage.getItem('prayer_offsets');
            return saved ? JSON.parse(saved) : { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
        } catch {
            return { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('prayer_offsets', JSON.stringify(offsets));
        } catch {
            // Ignore storage restrictions
        }
    }, [offsets]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLoading(false);
                },
                (err) => {
                    console.error("Error getting location", err);
                    setError("Location access denied. Using default location (Mecca).");
                    setLocation({ lat: 21.4225, lng: 39.8262 }); // Default to Mecca
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (location) {
            const coordinates = new Coordinates(location.lat, location.lng);
            const params = CalculationMethod.MuslimWorldLeague();
            const date = new Date();
            const times = new PrayerTimes(coordinates, date, params);
            setRawPrayerTimes(times);

            const formatTime = (time: Date, offset: number) => {
                const adjustedTime = new Date(time.getTime() + offset * 60000);
                return adjustedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            setPrayerTimes({
                fajr: formatTime(times.fajr, offsets.fajr),
                dhuhr: formatTime(times.dhuhr, offsets.dhuhr),
                asr: formatTime(times.asr, offsets.asr),
                maghrib: formatTime(times.maghrib, offsets.maghrib),
                isha: formatTime(times.isha, offsets.isha),
            });
        }
    }, [location, offsets]);

    const handleTimeChange = (prayer: keyof PrayerOffsets, newTimeStr: string) => {
        if (!rawPrayerTimes) return;
        
        // Parse the input time string (e.g., "05:30 PM")
        const [timePart, modifier] = newTimeStr.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        // Create a date object for the new target time (using today's date)
        const targetDate = new Date();
        targetDate.setHours(hours, minutes, 0, 0);
        
        // Get the original calculated time for this prayer
        const originalTime = rawPrayerTimes[prayer];
        
        // Calculate difference in minutes
        const diffMs = targetDate.getTime() - originalTime.getTime();
        const diffMins = Math.round(diffMs / 60000);
        
        setOffsets(prev => ({ ...prev, [prayer]: diffMins }));
    };

    // Helper to convert 24h date to input value format (HH:mm) for the time input
    // Note: HTML time input uses 24h format (HH:mm)
    const getInputValue = (prayer: keyof PrayerOffsets) => {
        if (!rawPrayerTimes) return "";
        const originalTime = rawPrayerTimes[prayer];
        const adjustedTime = new Date(originalTime.getTime() + offsets[prayer] * 60000);
        const h = adjustedTime.getHours().toString().padStart(2, '0');
        const m = adjustedTime.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    };

    if (loading) return <div className="p-4 text-center text-blue-500 font-bold animate-pulse">Loading Prayer Times...</div>;

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border-4 border-indigo-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -mr-10 -mt-10 opacity-50" />
            
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-md transform rotate-3">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-indigo-900">Prayer Times</h2>
                            <p className="text-xs font-bold text-indigo-400 flex items-center gap-1 uppercase tracking-wide">
                                <MapPin size={12} /> {error ? "Mecca (Default)" : "Your Location"}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`p-3 rounded-2xl transition-all border-2 ${isEditing ? 'bg-rose-100 text-rose-600 border-rose-200' : 'bg-indigo-50 text-indigo-500 border-indigo-100 hover:bg-indigo-100'}`}
                    >
                        {isEditing ? <X size={20} strokeWidth={3} /> : <Edit2 size={20} strokeWidth={3} />}
                    </button>
                </div>

                <div className="space-y-3">
                    {prayerTimes && Object.entries(prayerTimes).map(([name, time]) => (
                        <div key={name} className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-transform hover:scale-[1.02] ${
                            name === 'fajr' || name === 'maghrib' || name === 'isha' 
                            ? 'bg-indigo-50 border-indigo-100' 
                            : 'bg-amber-50 border-amber-100'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${
                                    name === 'fajr' || name === 'maghrib' || name === 'isha'
                                    ? 'bg-indigo-200 text-indigo-600'
                                    : 'bg-amber-200 text-amber-600'
                                }`}>
                                    {name === 'fajr' || name === 'maghrib' || name === 'isha' ? (
                                        <Moon size={18} strokeWidth={3} />
                                    ) : (
                                        <Sun size={18} strokeWidth={3} />
                                    )}
                                </div>
                                <span className="capitalize font-black text-slate-700 text-lg">{name}</span>
                            </div>
                            
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="time" 
                                        value={getInputValue(name as keyof PrayerOffsets)}
                                        onChange={(e) => {
                                            // Convert HH:mm (24h) to AM/PM format for our handler
                                            const [h, m] = e.target.value.split(':').map(Number);
                                            const ampm = h >= 12 ? 'PM' : 'AM';
                                            const h12 = h % 12 || 12;
                                            const timeStr = `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
                                            handleTimeChange(name as keyof PrayerOffsets, timeStr);
                                        }}
                                        className="p-2 text-sm font-bold border-2 border-indigo-200 rounded-xl text-center focus:outline-none focus:border-indigo-400 bg-white text-indigo-900"
                                    />
                                </div>
                            ) : (
                                <span className={`font-black font-mono px-4 py-1 rounded-xl text-lg ${
                                    name === 'fajr' || name === 'maghrib' || name === 'isha'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'bg-white text-amber-600 shadow-sm'
                                }`}>
                                    {time}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {isEditing && (
                    <div className="mt-6 text-center bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-100">
                        <p className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-wide">Set the exact time for your location</p>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="w-full bg-indigo-500 text-white px-4 py-3 rounded-xl text-sm font-black shadow-[0_4px_0_#4338ca] active:shadow-none active:translate-y-[4px] hover:bg-indigo-600 transition-all"
                        >
                            <Save size={16} className="inline mr-2" strokeWidth={3} /> Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrayerTimesWidget;
