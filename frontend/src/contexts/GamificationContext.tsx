import React, { createContext, useContext, useState, useEffect } from 'react';
import { achievements as allAchievements, Achievement } from '../data/achievements';

interface GamificationState {
    points: number;
    level: number;
    unlockedAchievements: string[];
    addPoints: (amount: number) => void;
    unlockAchievement: (id: string) => void;
    achievements: Achievement[];
    notification: Achievement | null;
    clearNotification: () => void;
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
        try {
            const saved = localStorage.getItem('islam_app_points');
            return saved ? parseInt(saved) : 0;
        } catch {
            return 0;
        }
    });

    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('unlockedAchievements');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [notification, setNotification] = useState<Achievement | null>(null);

    const level = Math.floor(points / 100) + 1;

    useEffect(() => {
        try {
            localStorage.setItem('islam_app_points', points.toString());
        } catch {
            // Ignore storage restrictions
        }
    }, [points]);

    useEffect(() => {
        try {
            localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
        } catch {
            // Ignore storage restrictions
        }
    }, [unlockedAchievements]);

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    const unlockAchievement = (id: string) => {
        if (!unlockedAchievements.includes(id)) {
            setUnlockedAchievements(prev => [...prev, id]);
            const achievement = allAchievements.find(a => a.id === id);
            if (achievement) {
                setNotification(achievement);
                // Auto-clear after 4 seconds
                setTimeout(() => setNotification(null), 4000);
            }
        }
    };

    const clearNotification = () => setNotification(null);

    return (
        <GamificationContext.Provider value={{ 
            points, 
            level, 
            unlockedAchievements, 
            addPoints, 
            unlockAchievement,
            achievements: allAchievements,
            notification,
            clearNotification
        }}>
            {children}
        </GamificationContext.Provider>
    );
};
