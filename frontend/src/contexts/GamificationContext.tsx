import React, { createContext, useContext, useState, useEffect } from 'react';

interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlocked: boolean;
}

interface GamificationState {
    points: number;
    level: number;
    badges: Badge[];
    addPoints: (amount: number) => void;
    unlockBadge: (badgeId: string) => void;
}

const GamificationContext = createContext<GamificationState | undefined>(undefined);

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [points, setPoints] = useState(() => {
        const saved = localStorage.getItem('islam_app_points');
        return saved ? parseInt(saved) : 0;
    });

    const [badges, setBadges] = useState<Badge[]>(() => {
        const saved = localStorage.getItem('islam_app_badges');
        const defaultBadges = [
            { id: 'first_step', name: 'First Step', icon: '🦶', description: 'Read your first Ayah', unlocked: false },
            { id: 'quran_explorer', name: 'Quran Explorer', icon: '📖', description: 'Read 10 Ayahs', unlocked: false },
            { id: 'hadith_hero', name: 'Hadith Hero', icon: '🌟', description: 'Learn a Hadith', unlocked: false },
            { id: 'curious_mind', name: 'Curious Mind', icon: '🤔', description: 'Ask the AI a question', unlocked: false },
            { id: 'scholar_junior', name: 'Junior Scholar', icon: '🎓', description: 'Read a Tafseer', unlocked: false },
        ];
        return saved ? JSON.parse(saved) : defaultBadges;
    });

    const level = Math.floor(points / 100) + 1;

    useEffect(() => {
        localStorage.setItem('islam_app_points', points.toString());
    }, [points]);

    useEffect(() => {
        localStorage.setItem('islam_app_badges', JSON.stringify(badges));
    }, [badges]);

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    const unlockBadge = (badgeId: string) => {
        setBadges(prev => prev.map(badge => {
            if (badge.id === badgeId && !badge.unlocked) {
                // Show notification logic could go here
                alert(`🎉 Badge Unlocked: ${badge.name}!`);
                return { ...badge, unlocked: true };
            }
            return badge;
        }));
    };

    return (
        <GamificationContext.Provider value={{ points, level, badges, addPoints, unlockBadge }}>
            {children}
        </GamificationContext.Provider>
    );
};
