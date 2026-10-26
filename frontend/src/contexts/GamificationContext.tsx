import React, { createContext, useContext, useState, useEffect } from 'react';
import { achievements as allAchievements, Achievement } from '../data/achievements';
import { calculateLevelFromPoints, getLevelProgressMetrics, LevelProgressMetrics } from '../utils/levelScaling';

interface GamificationState {
    points: number;
    level: number;
    streak: number;
    levelProgress: LevelProgressMetrics;
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
    const [streak, setStreak] = useState(() => {
        try {
            return parseInt(localStorage.getItem('app_daily_streak') || localStorage.getItem('tasbeeh_streak') || '1', 10) || 1;
        } catch {
            return 1;
        }
    });

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

    const level = calculateLevelFromPoints(points);
    const levelProgress = getLevelProgressMetrics(points);

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

    // Automatically claim Daily Streak whenever app opens
    useEffect(() => {
        try {
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

            const lastActiveDate = localStorage.getItem('app_last_active_date') || localStorage.getItem('tasbeeh_last_completed_date');
            if (lastActiveDate !== todayStr) {
                const currentStreak = parseInt(localStorage.getItem('app_daily_streak') || localStorage.getItem('tasbeeh_streak') || '0', 10);
                const newStreak = lastActiveDate === yesterdayStr ? currentStreak + 1 : 1;
                const bonusXp = 25 + (newStreak > 5 ? 25 : 0);

                localStorage.setItem('app_daily_streak', newStreak.toString());
                localStorage.setItem('tasbeeh_streak', newStreak.toString());
                localStorage.setItem('app_last_active_date', todayStr);
                localStorage.setItem('tasbeeh_last_completed_date', todayStr);

                addPoints(bonusXp);
                setStreak(newStreak);
                window.dispatchEvent(new CustomEvent('app:daily_streak_claimed', { detail: { streak: newStreak, bonusXp } }));
            }
        } catch {
            // Ignore storage restrictions
        }
    }, []);

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
            streak,
            levelProgress,
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
