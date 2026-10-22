// Level scaling calculation utility
// Levels 1-20 are accessible and encouraging for kids/beginners
// Levels 21-100 scale significantly steeper so achieving higher ranks requires dedication

export function getXpDeltaForLevel(lvl: number): number {
    if (lvl < 1) return 100;
    if (lvl <= 5) return 100;      // Lvl 1->2, 2->3, 3->4, 4->5, 5->6 (100 XP each)
    if (lvl <= 10) return 150;     // Lvl 6->10 (150 XP each)
    if (lvl <= 20) return 250;     // Lvl 11->20 (250 XP each)
    // After Level 20: Significantly harder progression!
    if (lvl <= 30) return 600;     // Lvl 21->30 (600 XP each)
    if (lvl <= 40) return 1000;    // Lvl 31->40 (1,000 XP each)
    if (lvl <= 50) return 1600;    // Lvl 41->50 (1,600 XP each)
    if (lvl <= 60) return 2400;    // Lvl 51->60 (2,400 XP each)
    if (lvl <= 70) return 3500;    // Lvl 61->70 (3,500 XP each)
    if (lvl <= 80) return 4800;    // Lvl 71->80 (4,800 XP each)
    if (lvl <= 90) return 6500;    // Lvl 81->90 (6,500 XP each)
    if (lvl < 100) return 9000;    // Lvl 91->100 (9,000 XP each)
    return 0; // Max level reached
}

// Precompute cumulative XP table for Levels 1 to 100
// LEVEL_CUMULATIVE_XP[lvl] = Total cumulative XP needed to REACH level `lvl`
// Level 1 starts at 0 XP.
export const LEVEL_CUMULATIVE_XP: number[] = new Array(101).fill(0);

(() => {
    LEVEL_CUMULATIVE_XP[1] = 0;
    for (let lvl = 2; lvl <= 100; lvl++) {
        LEVEL_CUMULATIVE_XP[lvl] = LEVEL_CUMULATIVE_XP[lvl - 1] + getXpDeltaForLevel(lvl - 1);
    }
})();

/**
 * Calculates current level (1 to 100) from total points/XP
 */
export function calculateLevelFromPoints(points: number): number {
    const p = Math.max(0, Math.floor(points || 0));
    // Binary search or linear scan up to 100
    for (let lvl = 100; lvl >= 1; lvl--) {
        if (p >= LEVEL_CUMULATIVE_XP[lvl]) {
            return lvl;
        }
    }
    return 1;
}

export interface LevelProgressMetrics {
    level: number;
    currentXpInLevel: number;
    deltaForLevel: number;
    xpNeededForNext: number;
    progressPercent: number;
    currentLevelBaseXp: number;
    nextLevelBaseXp: number;
    isMaxLevel: boolean;
}

/**
 * Calculates detailed progress within the user's current level
 */
export function getLevelProgressMetrics(points: number): LevelProgressMetrics {
    const p = Math.max(0, Math.floor(points || 0));
    const level = calculateLevelFromPoints(p);

    if (level >= 100) {
        return {
            level: 100,
            currentXpInLevel: LEVEL_CUMULATIVE_XP[100],
            deltaForLevel: 0,
            xpNeededForNext: 0,
            progressPercent: 100,
            currentLevelBaseXp: LEVEL_CUMULATIVE_XP[100],
            nextLevelBaseXp: LEVEL_CUMULATIVE_XP[100],
            isMaxLevel: true
        };
    }

    const currentLevelBaseXp = LEVEL_CUMULATIVE_XP[level];
    const nextLevelBaseXp = LEVEL_CUMULATIVE_XP[level + 1];
    const deltaForLevel = nextLevelBaseXp - currentLevelBaseXp;
    const currentXpInLevel = Math.max(0, p - currentLevelBaseXp);
    const xpNeededForNext = Math.max(0, nextLevelBaseXp - p);
    const progressPercent = deltaForLevel > 0 
        ? Math.min(100, Math.max(0, Math.round((currentXpInLevel / deltaForLevel) * 100))) 
        : 100;

    return {
        level,
        currentXpInLevel,
        deltaForLevel,
        xpNeededForNext,
        progressPercent,
        currentLevelBaseXp,
        nextLevelBaseXp,
        isMaxLevel: false
    };
}
