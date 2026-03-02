export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    condition: (score: number, topic: string) => boolean;
}

export const achievements: Achievement[] = [
    // Basics Achievements
    { id: 'basics_novice', title: 'Basics Novice', description: 'Complete a Basics quiz with score > 5', icon: '🌱', condition: (score, topic) => topic === 'basics' && score > 5 },
    { id: 'basics_master', title: 'Basics Master', description: 'Complete a Basics quiz with a perfect score', icon: '🌟', condition: (score, topic) => topic === 'basics' && score === 10 },
    { id: 'pillar_explorer', title: 'Pillar Explorer', description: 'Learn about the 5 pillars', icon: '🏛️', condition: (score, topic) => topic === 'basics' && score > 0 },
    
    // Beliefs Achievements
    { id: 'faith_seeker', title: 'Faith Seeker', description: 'Complete a Beliefs quiz with score > 5', icon: '❤️', condition: (score, topic) => topic === 'beliefs' && score > 5 },
    { id: 'faith_keeper', title: 'Faith Keeper', description: 'Complete a Beliefs quiz with a perfect score', icon: '🛡️', condition: (score, topic) => topic === 'beliefs' && score === 10 },
    { id: 'angel_whisperer', title: 'Angel Whisperer', description: 'Answer questions about Angels correctly', icon: '👼', condition: (score, topic) => topic === 'beliefs' && score > 7 },

    // Science Achievements
    { id: 'science_explorer', title: 'Science Explorer', description: 'Complete a Science quiz with score > 5', icon: '🔬', condition: (score, topic) => topic === 'science' && score > 5 },
    { id: 'science_genius', title: 'Science Genius', description: 'Complete a Science quiz with a perfect score', icon: '🧠', condition: (score, topic) => topic === 'science' && score === 10 },
    { id: 'cosmos_traveler', title: 'Cosmos Traveler', description: 'Answer questions about Astronomy correctly', icon: '🚀', condition: (score, topic) => topic === 'science' && score > 7 },
    { id: 'biology_buff', title: 'Biology Buff', description: 'Answer questions about Biology correctly', icon: '🧬', condition: (score, topic) => topic === 'science' && score > 7 },

    // Guide Achievements
    { id: 'guide_follower', title: 'Guide Follower', description: 'Complete a Guide quiz with score > 5', icon: '🗺️', condition: (score, topic) => topic.startsWith('guide') && score > 5 },
    { id: 'guide_expert', title: 'Guide Expert', description: 'Complete a Guide quiz with a perfect score', icon: '🏆', condition: (score, topic) => topic.startsWith('guide') && score === 10 },
    
    // General Achievements
    { id: 'quiz_starter', title: 'Quiz Starter', description: 'Start your first quiz', icon: '🏁', condition: (score, topic) => true },
    { id: 'quiz_finisher', title: 'Quiz Finisher', description: 'Finish a quiz', icon: '🏁', condition: (score, topic) => true },
    { id: 'perfect_score', title: 'Perfect Score', description: 'Get a perfect score in any quiz', icon: '💯', condition: (score, topic) => score === 10 },
    { id: 'high_score', title: 'High Score', description: 'Get a score of 8 or higher', icon: '📈', condition: (score, topic) => score >= 8 },
    
    // Fun Achievements
    { id: 'fast_learner', title: 'Fast Learner', description: 'Complete a quiz in under 2 minutes', icon: '⚡', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'curious_mind', title: 'Curious Mind', description: 'Take 5 quizzes', icon: '🤔', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'knowledge_seeker', title: 'Knowledge Seeker', description: 'Take 10 quizzes', icon: '📚', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'wisdom_keeper', title: 'Wisdom Keeper', description: 'Take 20 quizzes', icon: '🦉', condition: (score, topic) => true }, // Logic to be implemented
    
    // More Achievements (Placeholders for now, logic can be expanded)
    { id: 'early_bird', title: 'Early Bird', description: 'Take a quiz in the morning', icon: '🌅', condition: (score, topic) => new Date().getHours() < 12 },
    { id: 'night_owl', title: 'Night Owl', description: 'Take a quiz at night', icon: '🦉', condition: (score, topic) => new Date().getHours() >= 20 },
    { id: 'weekend_warrior', title: 'Weekend Warrior', description: 'Take a quiz on the weekend', icon: '🎉', condition: (score, topic) => [0, 6].includes(new Date().getDay()) },
    { id: 'daily_streak', title: 'Daily Streak', description: 'Take a quiz 3 days in a row', icon: '🔥', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'weekly_streak', title: 'Weekly Streak', description: 'Take a quiz every day for a week', icon: '📅', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'monthly_master', title: 'Monthly Master', description: 'Take a quiz every day for a month', icon: '🗓️', condition: (score, topic) => true }, // Logic to be implemented
    
    // Topic Specific (Expanded)
    { id: 'prayer_pro', title: 'Prayer Pro', description: 'Answer questions about Salah correctly', icon: '🕌', condition: (score, topic) => topic === 'basics' && score > 7 },
    { id: 'fasting_fan', title: 'Fasting Fan', description: 'Answer questions about Sawm correctly', icon: '🌙', condition: (score, topic) => topic === 'basics' && score > 7 },
    { id: 'charity_champion', title: 'Charity Champion', description: 'Answer questions about Zakat correctly', icon: '💰', condition: (score, topic) => topic === 'basics' && score > 7 },
    { id: 'hajj_hero', title: 'Hajj Hero', description: 'Answer questions about Hajj correctly', icon: '🕋', condition: (score, topic) => topic === 'basics' && score > 7 },
    { id: 'prophet_pal', title: 'Prophet Pal', description: 'Answer questions about Prophets correctly', icon: '📜', condition: (score, topic) => topic === 'beliefs' && score > 7 },
    { id: 'book_worm', title: 'Book Worm', description: 'Answer questions about Holy Books correctly', icon: '📖', condition: (score, topic) => topic === 'beliefs' && score > 7 },
    { id: 'angel_ally', title: 'Angel Ally', description: 'Answer questions about Angels correctly', icon: '👼', condition: (score, topic) => topic === 'beliefs' && score > 7 },
    { id: 'nature_lover', title: 'Nature Lover', description: 'Answer questions about Nature correctly', icon: '🌿', condition: (score, topic) => topic === 'science' && score > 7 },
    { id: 'space_cadet', title: 'Space Cadet', description: 'Answer questions about Space correctly', icon: '👨‍🚀', condition: (score, topic) => topic === 'science' && score > 7 },
    { id: 'body_builder', title: 'Body Builder', description: 'Answer questions about Human Body correctly', icon: '💪', condition: (score, topic) => topic === 'science' && score > 7 },
    { id: 'earth_explorer', title: 'Earth Explorer', description: 'Answer questions about Earth correctly', icon: '🌍', condition: (score, topic) => topic === 'science' && score > 7 },
    
    // Fun & Engagement
    { id: 'quiz_master', title: 'Quiz Master', description: 'Complete 50 quizzes', icon: '👑', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'trivia_titan', title: 'Trivia Titan', description: 'Answer 100 questions correctly', icon: '🏛️', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'brainiac', title: 'Brainiac', description: 'Answer 500 questions correctly', icon: '🧠', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'genius', title: 'Genius', description: 'Answer 1000 questions correctly', icon: '🎓', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'legend', title: 'Legend', description: 'Unlock all achievements', icon: '🏆', condition: (score, topic) => true }, // Logic to be implemented
    
    // Social (Placeholder)
    { id: 'sharer', title: 'Sharer', description: 'Share your score', icon: '📢', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'inviter', title: 'Inviter', description: 'Invite a friend', icon: '💌', condition: (score, topic) => true }, // Logic to be implemented
    
    // Time based
    { id: 'speedster', title: 'Speedster', description: 'Answer a question in under 5 seconds', icon: '⚡', condition: (score, topic) => true }, // Logic to be implemented
    { id: 'thinker', title: 'Thinker', description: 'Take your time (over 1 minute per question)', icon: '🤔', condition: (score, topic) => true }, // Logic to be implemented
    
    // Quran Reader Achievements
    { id: 'first_step', title: 'First Step', description: 'Read your first Ayah', icon: '🦶', condition: (score, topic) => true },
    { id: 'quran_explorer', title: 'Quran Explorer', description: 'Read 10 Ayahs', icon: '📖', condition: (score, topic) => true },
    { id: 'scholar_junior', title: 'Junior Scholar', description: 'Read a Tafseer', icon: '🎓', condition: (score, topic) => true },
    
    // Hadith & Chat Achievements
    { id: 'hadith_hero', title: 'Hadith Hero', description: 'Learn a Hadith', icon: '🌟', condition: (score, topic) => true },
    { id: 'ai_friend', title: 'AI Friend', description: 'Ask the AI a question', icon: '🤖', condition: (score, topic) => true },
];
