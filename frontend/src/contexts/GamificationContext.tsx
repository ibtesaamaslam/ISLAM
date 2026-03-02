import React, { createContext, useContext, useState, useEffect } from 'react';
import { achievements as allAchievements, Achievement } from '../data/achievements';

interface GamificationState {
    points: number;
    level: number;
    unlockedAchievements: string[];
    addPoints: (amount: number) => void;
    unlockAchievement: (id: string) => void;
    achievements: Achievement[];
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

    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
        const saved = localStorage.getItem('unlockedAchievements');
        return saved ? JSON.parse(saved) : [];
    });

    const level = Math.floor(points / 100) + 1;

    useEffect(() => {
        localStorage.setItem('islam_app_points', points.toString());
    }, [points]);

    useEffect(() => {
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    const unlockAchievement = (id: string) => {
        if (!unlockedAchievements.includes(id)) {
            setUnlockedAchievements(prev => [...prev, id]);
            // Optional: Show notification
            const achievement = allAchievements.find(a => a.id === id);
            if (achievement) {
                // You could add a toast notification here if you have a toast system
                console.log(`Unlocked: ${achievement.title}`);
            }
        }
    };

    return (
        <GamificationContext.Provider value={{ 
            points, 
            level, 
            unlockedAchievements, 
            addPoints, 
            unlockAchievement,
            achievements: allAchievements 
        }}>
            {children}
        </GamificationContext.Provider>
    );
};
