export interface GalleryBadge {
    id: string;
    title: string;
    description: string;
    category: 'streaks' | 'quran' | 'dhikr' | 'duas' | 'knowledge' | 'milestones';
    icon: string;
    xpReward: number;
    quote?: string;
    progressCurrent?: number;
    progressTarget?: number;
    unlocked?: boolean;
}

export const generate100PlusBadges = (
    streak: number,
    level: number,
    points: number
): GalleryBadge[] => {
    return [
        // ==========================================
        // 1. DAILY STREAKS (18 Challenging Badges)
        // ==========================================
        {
            id: 'streak_1',
            title: 'First Step Spark',
            description: 'Begin your spiritual devotion by opening the app today.',
            category: 'streaks',
            icon: '🌱',
            xpReward: 25,
            quote: 'The most beloved deeds to Allah are those done regularly, even if small. (Bukhari)',
            progressCurrent: Math.min(streak, 1),
            progressTarget: 1
        },
        {
            id: 'streak_3',
            title: '3-Day Steadfast',
            description: 'Maintain an unbroken streak for 3 consecutive days.',
            category: 'streaks',
            icon: '🔥',
            xpReward: 50,
            quote: 'Consistency turns good intentions into living worship.',
            progressCurrent: Math.min(streak, 3),
            progressTarget: 3
        },
        {
            id: 'streak_7',
            title: '7-Day Warrior',
            description: 'Complete 1 full unbroken week of daily remembrance.',
            category: 'streaks',
            icon: '⚡',
            xpReward: 100,
            quote: 'A week of continuous vigilance anchors the heart.',
            progressCurrent: Math.min(streak, 7),
            progressTarget: 7
        },
        {
            id: 'streak_14',
            title: '14-Day Fortitude',
            description: 'Two continuous weeks without missing a single day.',
            category: 'streaks',
            icon: '🛡️',
            xpReward: 200,
            quote: 'Steadfastness in faith breaks worldly distractions.',
            progressCurrent: Math.min(streak, 14),
            progressTarget: 14
        },
        {
            id: 'streak_21',
            title: '21-Day Habit Master',
            description: 'Reach 21 days: the scientific threshold of ingrained habit.',
            category: 'streaks',
            icon: '🎯',
            xpReward: 300,
            quote: 'Virtue has now become your natural routine.',
            progressCurrent: Math.min(streak, 21),
            progressTarget: 21
        },
        {
            id: 'streak_30',
            title: '30-Day Pillar',
            description: 'Achieve one full continuous month of unwavering devotion.',
            category: 'streaks',
            icon: '👑',
            xpReward: 500,
            quote: 'A month of dedication purifies soul and mind.',
            progressCurrent: Math.min(streak, 30),
            progressTarget: 30
        },
        {
            id: 'streak_40',
            title: '40 Days of Moses',
            description: 'Endure 40 consecutive days of pure daily connection.',
            category: 'streaks',
            icon: '⛰️',
            xpReward: 700,
            quote: 'And We appointed for Moses thirty nights and perfected them with ten. (7:142)',
            progressCurrent: Math.min(streak, 40),
            progressTarget: 40
        },
        {
            id: 'streak_50',
            title: 'Golden Jubilee Streak',
            description: '50 unbroken days of learning, Quran, and remembrance.',
            category: 'streaks',
            icon: '✨',
            xpReward: 850,
            quote: 'Half a hundred days of illuminated spiritual habit.',
            progressCurrent: Math.min(streak, 50),
            progressTarget: 50
        },
        {
            id: 'streak_60',
            title: 'Two Months Resolute',
            description: '60 days uninterrupted journey in the sacred light.',
            category: 'streaks',
            icon: '🌊',
            xpReward: 1000,
            quote: 'Water wears away stone not through strength, but persistence.',
            progressCurrent: Math.min(streak, 60),
            progressTarget: 60
        },
        {
            id: 'streak_75',
            title: 'Diamond Resolve',
            description: 'Maintain your sacred streak for 75 consecutive days.',
            category: 'streaks',
            icon: '💎',
            xpReward: 1250,
            quote: 'A heart tempered in regular prayer shines like a gem.',
            progressCurrent: Math.min(streak, 75),
            progressTarget: 75
        },
        {
            id: 'streak_90',
            title: 'Season of Faith',
            description: 'Three full unbroken months (90 days) of daily worship.',
            category: 'streaks',
            icon: '🌸',
            xpReward: 1500,
            quote: 'Seasons change, but the believer remains upright.',
            progressCurrent: Math.min(streak, 90),
            progressTarget: 90
        },
        {
            id: 'streak_100',
            title: 'Century of Light',
            description: 'A monument of devotion: 100 consecutive days of daily engagement.',
            category: 'streaks',
            icon: '🏛️',
            xpReward: 2000,
            quote: 'An elite milestone attained by the truly devoted.',
            progressCurrent: Math.min(streak, 100),
            progressTarget: 100
        },
        {
            id: 'streak_120',
            title: 'Four Months Steadfast',
            description: '120 days of continuous spiritual practice.',
            category: 'streaks',
            icon: '🌟',
            xpReward: 2400,
            quote: 'Patience and prayer are the hallmarks of the faithful.',
            progressCurrent: Math.min(streak, 120),
            progressTarget: 120
        },
        {
            id: 'streak_150',
            title: 'Iron Conviction',
            description: '150 unbroken days across summer, winter, and every dawn.',
            category: 'streaks',
            icon: '⚔️',
            xpReward: 3000,
            quote: 'He who perseveres will find Allah with him.',
            progressCurrent: Math.min(streak, 150),
            progressTarget: 150
        },
        {
            id: 'streak_180',
            title: 'Half-Year Ascendant',
            description: 'Six whole continuous months (180 days) of unyielding habit.',
            category: 'streaks',
            icon: '🏆',
            xpReward: 4000,
            quote: 'Six months of daily remembrance remakes a destiny.',
            progressCurrent: Math.min(streak, 180),
            progressTarget: 180
        },
        {
            id: 'streak_200',
            title: 'Bicentennial Devotee',
            description: '200 uninterrupted days of spiritual growth.',
            category: 'streaks',
            icon: '🦅',
            xpReward: 5000,
            quote: 'Soaring high above the distractions of the transient world.',
            progressCurrent: Math.min(streak, 200),
            progressTarget: 200
        },
        {
            id: 'streak_250',
            title: 'Unshakable Mountain',
            description: '250 consecutive days of firm, uncompromising devotion.',
            category: 'streaks',
            icon: '🏔️',
            xpReward: 6500,
            quote: 'Like a mountain grounded deep into the earth.',
            progressCurrent: Math.min(streak, 250),
            progressTarget: 250
        },
        {
            id: 'streak_365',
            title: 'Year of Devotion (365 Days)',
            description: 'The pinnacle of persistence: 365 days of unbroken worship.',
            category: 'streaks',
            icon: '👑',
            xpReward: 10000,
            quote: 'A complete orbit around the Sun in continuous remembrance of Allah.',
            progressCurrent: Math.min(streak, 365),
            progressTarget: 365
        },

        // ==========================================
        // 2. QURAN QUEST (20 Challenging Badges)
        // ==========================================
        {
            id: 'quran_first_ayah',
            title: 'Divine Revelation',
            description: 'Begin reciting verses of the Holy Quran.',
            category: 'quran',
            icon: '📖',
            xpReward: 30,
            quote: 'Recite in the name of your Lord who created. (Al-Alaq 96:1)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_fatiha',
            title: 'The Mother of the Book',
            description: 'Listen to and master the meaning of Surah Al-Fatiha.',
            category: 'quran',
            icon: '🗝️',
            xpReward: 50,
            quote: 'Al-Fatiha is the cure for every spiritual ailment.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_ayatul_kursi',
            title: 'Throne of Glory',
            description: 'Reflect upon and memorize Ayatul Kursi (2:255).',
            category: 'quran',
            icon: '👑',
            xpReward: 100,
            quote: 'The greatest verse in the Book of Allah. (Muslim)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_surah_yasin',
            title: 'The Heart of Quran',
            description: 'Study Surah Yasin with complete Arabic, Urdu, and English reflections.',
            category: 'quran',
            icon: '❤️',
            xpReward: 150,
            quote: 'Everything has a heart, and the heart of the Quran is Yasin.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_surah_mulk',
            title: 'Shield of the Grave',
            description: 'Listen to and reflect upon Surah Al-Mulk (The Sovereignty).',
            category: 'quran',
            icon: '🛡️',
            xpReward: 150,
            quote: 'It prevents and protects against the punishment of the grave. (Tirmidhi)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_kahf_friday',
            title: 'Light of the Cave',
            description: 'Reflect upon Surah Al-Kahf to illuminate your path from one Friday to the next.',
            category: 'quran',
            icon: '🕯️',
            xpReward: 200,
            quote: 'Whoever reads Surah Al-Kahf on Friday will have a light shining from him.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_surah_ar_rahman',
            title: 'The Lord of Mercy',
            description: 'Ponder the endless blessings recounted in Surah Ar-Rahman.',
            category: 'quran',
            icon: '🌿',
            xpReward: 180,
            quote: 'Which of the favors of your Lord will you deny? (55:13)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_last_10_surahs',
            title: 'Juz Amma Short Surahs',
            description: 'Master the recitations and meanings of the final 10 Surahs.',
            category: 'quran',
            icon: '📜',
            xpReward: 250,
            quote: 'Surah Al-Ikhlas is equivalent to a third of the Quran.',
            progressCurrent: 10,
            progressTarget: 10
        },
        {
            id: 'quran_50_ayahs',
            title: 'Ayah Seeker (50 Verses)',
            description: 'Study and read 50 verses with full tafseer explanations.',
            category: 'quran',
            icon: '📚',
            xpReward: 300,
            quote: 'Do they not ponder the Quran? (4:82)',
            progressCurrent: Math.min(points, 50),
            progressTarget: 50
        },
        {
            id: 'quran_100_ayahs',
            title: 'Centurion of Recitation',
            description: 'Read and reflect on 100 verses of the noble Quran.',
            category: 'quran',
            icon: '💡',
            xpReward: 500,
            quote: 'Whoever recites 100 verses in a night will not be recorded among the heedless.',
            progressCurrent: Math.min(points, 100),
            progressTarget: 100
        },
        {
            id: 'quran_500_ayahs',
            title: 'Illuminated Student',
            description: 'Complete 500 verses in your Quran journey.',
            category: 'quran',
            icon: '🌌',
            xpReward: 1200,
            quote: 'The Quran will be an advocate for its companion on Judgment Day.',
            progressCurrent: Math.min(points, 500),
            progressTarget: 500
        },
        {
            id: 'quran_1000_ayahs',
            title: 'Thousand Lights',
            description: 'Milestone of 1,000 verses read and contemplated.',
            category: 'quran',
            icon: '🕯️',
            xpReward: 2500,
            quote: 'Whoever recites 1,000 verses will be written among those who earn treasures.',
            progressCurrent: Math.min(points, 1000),
            progressTarget: 1000
        },
        {
            id: 'quran_level_10_reader',
            title: 'Skilled Reciter',
            description: 'Attain Level 10 in your Quran Quest progression.',
            category: 'quran',
            icon: '🎓',
            xpReward: 600,
            quote: 'The one who recites the Quran skillfully is with the noble scribes.',
            progressCurrent: Math.min(level, 10),
            progressTarget: 10
        },
        {
            id: 'quran_level_25_scholar',
            title: 'Master of Tajweed',
            description: 'Attain Level 25 in your Quran Quest progression.',
            category: 'quran',
            icon: '🏛️',
            xpReward: 1500,
            quote: 'Recite the Quran in slow, measured tones. (73:4)',
            progressCurrent: Math.min(level, 25),
            progressTarget: 25
        },
        {
            id: 'quran_level_50_hafiz',
            title: 'Guardian of the Verses',
            description: 'Attain Level 50 in Quran knowledge and understanding.',
            category: 'quran',
            icon: '🏆',
            xpReward: 3500,
            quote: 'The best of you are those who learn the Quran and teach it. (Bukhari)',
            progressCurrent: Math.min(level, 50),
            progressTarget: 50
        },
        {
            id: 'quran_10_surahs_complete',
            title: 'Decade of Surahs',
            description: 'Complete listening and reflection across 10 distinct Surahs.',
            category: 'quran',
            icon: '📑',
            xpReward: 400,
            quote: 'Building foundational knowledge chapter by chapter.',
            progressCurrent: 10,
            progressTarget: 10
        },
        {
            id: 'quran_30_surahs_complete',
            title: 'Thirty Illuminations',
            description: 'Explore 30 complete chapters with translation and commentary.',
            category: 'quran',
            icon: '💎',
            xpReward: 1200,
            quote: 'Entering deep into the ocean of revelation.',
            progressCurrent: 30,
            progressTarget: 30
        },
        {
            id: 'quran_juz_amma_complete',
            title: 'Master of Juz Amma',
            description: 'Complete the entire 30th Juz from Surah An-Naba to An-Nas.',
            category: 'quran',
            icon: '🌟',
            xpReward: 2000,
            quote: 'The foundational Juz of universal human awakening.',
            progressCurrent: 37,
            progressTarget: 37
        },
        {
            id: 'quran_tahajjud_verses',
            title: 'Night Vigil Companion',
            description: 'Recite verses during late hours of stillness and devotion.',
            category: 'quran',
            icon: '🌙',
            xpReward: 800,
            quote: 'And during the night, wake up for prayer as an extra devotion. (17:79)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'quran_khatm_master',
            title: 'Khatm al-Quran Virtuoso',
            description: 'A lifetime milestone: complete all 114 Surahs and 6,236 Ayahs.',
            category: 'quran',
            icon: '🕋',
            xpReward: 15000,
            quote: 'At the completion of the Quran, 60,000 angels pray for you.',
            progressCurrent: Math.min(level, 100),
            progressTarget: 100
        },

        // ==========================================
        // 3. DHIKR & TASBEEH (20 Challenging Badges)
        // ==========================================
        {
            id: 'dhikr_first_bead',
            title: 'First Bead Turned',
            description: 'Begin turning the beads of digital Tasbeeh.',
            category: 'dhikr',
            icon: '📿',
            xpReward: 20,
            quote: 'Unquestionably, by the remembrance of Allah hearts are assured. (13:28)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'dhikr_33_tasbeeh',
            title: 'Sunnah 33 Beads',
            description: 'Complete a full cycle of 33 SubhanAllah praises.',
            category: 'dhikr',
            icon: '🌱',
            xpReward: 40,
            quote: 'Taught by the Prophet ﷺ following every obligatory prayer.',
            progressCurrent: 33,
            progressTarget: 33
        },
        {
            id: 'dhikr_100_tasbeeh',
            title: 'Century of Praises',
            description: 'Complete 100 counts on the Tasbeeh counter.',
            category: 'dhikr',
            icon: '✨',
            xpReward: 80,
            quote: 'Whoever says SubhanAllahi wa bihamdihi 100 times, his sins are forgiven.',
            progressCurrent: 100,
            progressTarget: 100
        },
        {
            id: 'dhikr_300_tasbeeh',
            title: 'Devoted Remembrancer',
            description: 'Accumulate 300 total counts across sacred phrases.',
            category: 'dhikr',
            icon: '🔥',
            xpReward: 150,
            quote: 'Keep your tongue moist with the remembrance of Allah.',
            progressCurrent: 300,
            progressTarget: 300
        },
        {
            id: 'dhikr_500_tasbeeh',
            title: 'Garden of Remembrance',
            description: 'Reach 500 counts of praise and glorification.',
            category: 'dhikr',
            icon: '🌸',
            xpReward: 250,
            quote: 'Praising Allah plants trees for you in Paradise.',
            progressCurrent: 500,
            progressTarget: 500
        },
        {
            id: 'dhikr_1000_tasbeeh',
            title: 'Thousand Beads of Light',
            description: 'Reach 1,000 counts of glorification and praise.',
            category: 'dhikr',
            icon: '💎',
            xpReward: 500,
            quote: 'A thousand praises illuminate the scales of Judgment.',
            progressCurrent: 1000,
            progressTarget: 1000
        },
        {
            id: 'dhikr_2500_tasbeeh',
            title: 'River of Glorification',
            description: 'Accumulate 2,500 total counts on the Tasbeeh counter.',
            category: 'dhikr',
            icon: '🌊',
            xpReward: 900,
            quote: 'Flowing continuous remembrance that clears the soul.',
            progressCurrent: Math.min(points * 2, 2500),
            progressTarget: 2500
        },
        {
            id: 'dhikr_5000_tasbeeh',
            title: 'Spiritual Fortress (5,000)',
            description: 'Accumulate 5,000 counts of deep meditative zikr.',
            category: 'dhikr',
            icon: '🏰',
            xpReward: 1600,
            quote: 'Dhikr is a protective fortress against spiritual weakness.',
            progressCurrent: Math.min(points * 3, 5000),
            progressTarget: 5000
        },
        {
            id: 'dhikr_10000_tasbeeh',
            title: 'Mountain of Dhikr (10,000)',
            description: 'Reach 10,000 counts on the sacred Tasbeeh counter.',
            category: 'dhikr',
            icon: '🏔️',
            xpReward: 3000,
            quote: 'Ten thousand praises standing tall like a mountain of light.',
            progressCurrent: Math.min(points * 5, 10000),
            progressTarget: 10000
        },
        {
            id: 'dhikr_25000_tasbeeh',
            title: 'Guardian of the Breath',
            description: 'Accumulate 25,000 counts of perpetual remembrance.',
            category: 'dhikr',
            icon: '🦅',
            xpReward: 6000,
            quote: 'Breathing every breath in mindful reverence of the Divine.',
            progressCurrent: Math.min(points * 10, 25000),
            progressTarget: 25000
        },
        {
            id: 'dhikr_50000_tasbeeh',
            title: 'Heart of Serenity',
            description: 'Attain 50,000 cumulative counts of glorification.',
            category: 'dhikr',
            icon: '💖',
            xpReward: 10000,
            quote: 'A heart so refined that remembrance becomes automatic.',
            progressCurrent: Math.min(points * 20, 50000),
            progressTarget: 50000
        },
        {
            id: 'dhikr_100000_tasbeeh',
            title: 'Saint of Remembrance (100,000)',
            description: 'The monumental pinnacle: 100,000 counts of praise.',
            category: 'dhikr',
            icon: '👑',
            xpReward: 25000,
            quote: 'Numbered among the foremost who remember Allah abundantly.',
            progressCurrent: Math.min(points * 25, 100000),
            progressTarget: 100000
        },
        {
            id: 'dhikr_morning_adhkar',
            title: 'Morning Sun Sentinel',
            description: 'Recite complete Morning Adhkar before sunrise.',
            category: 'dhikr',
            icon: '🌅',
            xpReward: 100,
            quote: 'And glorify Him morning and afternoon. (33:42)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'dhikr_evening_adhkar',
            title: 'Evening Sunset Guardian',
            description: 'Recite complete Evening Adhkar at twilight.',
            category: 'dhikr',
            icon: '🌇',
            xpReward: 100,
            quote: 'Protection for your night until the dawn returns.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'dhikr_astaghfirullah_100',
            title: 'Pure Slate (100 Istighfar)',
            description: 'Turn the beads for 100 sincere repetitions of Astaghfirullah.',
            category: 'dhikr',
            icon: '💧',
            xpReward: 120,
            quote: 'I seek the forgiveness of Allah more than seventy times a day. (Bukhari)',
            progressCurrent: 100,
            progressTarget: 100
        },
        {
            id: 'dhikr_astaghfirullah_1000',
            title: 'Washed in Repentance',
            description: 'Accumulate 1,000 repetitions of Istighfar.',
            category: 'dhikr',
            icon: '🌧️',
            xpReward: 800,
            quote: 'Whoever increases in seeking forgiveness, Allah relieves him of every sorrow.',
            progressCurrent: 1000,
            progressTarget: 1000
        },
        {
            id: 'dhikr_durood_100',
            title: '100 Blessings Upon the Prophet',
            description: 'Send 100 Salawat upon Prophet Muhammad ﷺ.',
            category: 'dhikr',
            icon: '🌹',
            xpReward: 150,
            quote: 'Whoever sends blessings upon me once, Allah sends blessings upon him ten times.',
            progressCurrent: 100,
            progressTarget: 100
        },
        {
            id: 'dhikr_durood_1000',
            title: 'Thousand Fragrant Salawat',
            description: 'Send 1,000 Salawat upon the beloved Messenger ﷺ.',
            category: 'dhikr',
            icon: '🕊️',
            xpReward: 1200,
            quote: 'The closest people to me on the Day of Resurrection will be those who sent the most blessings.',
            progressCurrent: 1000,
            progressTarget: 1000
        },
        {
            id: 'dhikr_la_hawla_fortress',
            title: 'Treasure of Paradise',
            description: 'Recite "La hawla wa la quwwata illa billah" 100 times.',
            category: 'dhikr',
            icon: '🗝️',
            xpReward: 180,
            quote: 'It is a treasure from beneath the Throne of Allah. (Bukhari)',
            progressCurrent: 100,
            progressTarget: 100
        },
        {
            id: 'dhikr_subhanallah_bihamdihi',
            title: 'Heavy on the Scales',
            description: 'Recite "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem" 100 times.',
            category: 'dhikr',
            icon: '⚖️',
            xpReward: 200,
            quote: 'Two phrases light on the tongue, heavy on the scales, beloved to the Most Merciful.',
            progressCurrent: 100,
            progressTarget: 100
        },

        // ==========================================
        // 4. DAILY DUAS (20 Challenging Badges)
        // ==========================================
        {
            id: 'duas_first_recited',
            title: 'Suppliant Seeker',
            description: 'Listen to and recite your first Masnoon supplication.',
            category: 'duas',
            icon: '🤲',
            xpReward: 25,
            quote: 'Dua is the essence of worship. (Tirmidhi)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_5_learned',
            title: 'Five Gateways of Dua',
            description: 'Learn and listen to 5 authentic Masnoon duas.',
            category: 'duas',
            icon: '🌿',
            xpReward: 75,
            quote: 'Call upon Me; I will respond to you. (Ghafir 40:60)',
            progressCurrent: 5,
            progressTarget: 5
        },
        {
            id: 'duas_10_learned',
            title: 'Ten Shields of Dua',
            description: 'Complete recitation of 10 essential everyday duas.',
            category: 'duas',
            icon: '🛡️',
            xpReward: 150,
            quote: 'Nothing turns away destiny except supplication. (Tirmidhi)',
            progressCurrent: 10,
            progressTarget: 10
        },
        {
            id: 'duas_20_learned',
            title: 'Twenty Daily Invocations',
            description: 'Master 20 distinct supplications for daily living.',
            category: 'duas',
            icon: '📜',
            xpReward: 300,
            quote: 'A believer is armed with supplication at every hour.',
            progressCurrent: 20,
            progressTarget: 20
        },
        {
            id: 'duas_30_learned',
            title: 'Month of Duas (30)',
            description: 'Master 30 powerful prayers for forgiveness, healing, and guidance.',
            category: 'duas',
            icon: '🌟',
            xpReward: 500,
            quote: 'Allah is shy to return the hands of His servant empty.',
            progressCurrent: 30,
            progressTarget: 30
        },
        {
            id: 'duas_40_learned',
            title: 'Forty Masnoon Keys',
            description: 'Recite and understand 40 authentic prophetic supplications.',
            category: 'duas',
            icon: '🗝️',
            xpReward: 750,
            quote: 'The Prophet was given the most comprehensive words of prayer.',
            progressCurrent: 40,
            progressTarget: 40
        },
        {
            id: 'duas_50_learned',
            title: 'Half-Century of Supplications',
            description: 'Master 50 authentic duas across all life occasions.',
            category: 'duas',
            icon: '🏆',
            xpReward: 1000,
            quote: 'Walking in the footsteps of the Prophet throughout every moment.',
            progressCurrent: 50,
            progressTarget: 50
        },
        {
            id: 'duas_65_learned',
            title: 'Ocean of Invocations',
            description: 'Master 65 authentic Masnoon duas with Arabic, Urdu, and English audio.',
            category: 'duas',
            icon: '🌊',
            xpReward: 1500,
            quote: 'Every condition in life has a corresponding prophetic prayer.',
            progressCurrent: 65,
            progressTarget: 65
        },
        {
            id: 'duas_80_master',
            title: 'Virtuoso of 80 Duas',
            description: 'Learn and recite the full library of 80+ authentic prayers.',
            category: 'duas',
            icon: '👑',
            xpReward: 2500,
            quote: 'Your heart is constantly speaking to the Creator of the Universe.',
            progressCurrent: 80,
            progressTarget: 80
        },
        {
            id: 'duas_parents_devotion',
            title: 'Dua for Parents',
            description: 'Recite Rabbi-rhamhuma kama rabbayani sagheera daily.',
            category: 'duas',
            icon: '❤️',
            xpReward: 100,
            quote: 'My Lord, have mercy upon them as they brought me up when I was small. (17:24)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_distress_relief',
            title: 'Relief in Hardship',
            description: 'Recite the Dua of Distress (La ilaha illa Anta subhanaka inni kuntu minaz-zalimeen).',
            category: 'duas',
            icon: '🕯️',
            xpReward: 120,
            quote: 'No Muslim suppliant calls with this except Allah answers him. (Tirmidhi)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_morning_waking',
            title: 'Dawn Gratitude',
            description: 'Recite the morning waking dua upon opening your eyes.',
            category: 'duas',
            icon: '🌅',
            xpReward: 80,
            quote: 'Praise be to Allah Who brought us to life after He caused us to die.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_sleeping_peace',
            title: 'Night Protection',
            description: 'Recite the evening sleeping dua before resting.',
            category: 'duas',
            icon: '🌙',
            xpReward: 80,
            quote: 'In Your name, O Allah, I live and I die.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_istikhara_guidance',
            title: 'Divine Decision (Istikhara)',
            description: 'Study and pray the Dua of Istikhara for important life decisions.',
            category: 'duas',
            icon: '🧭',
            xpReward: 200,
            quote: 'Taught by the Prophet ﷺ just as he would teach a Surah of the Quran.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_healing_shifa',
            title: 'Spiritual Remedy (Shifa)',
            description: 'Recite the prophetic prayers for healing the sick and afflicted.',
            category: 'duas',
            icon: '🌿',
            xpReward: 150,
            quote: 'Remove the harm, O Lord of humanity, and cure; You are the Healer.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_rain_gratitude',
            title: 'Rain & Mercy',
            description: 'Recite the dua for beneficial rainfall (Allahumma sayyiban nafi\'a).',
            category: 'duas',
            icon: '🌧️',
            xpReward: 90,
            quote: 'O Allah, make it a beneficial downpour.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_travel_safety',
            title: 'Journey Guardian',
            description: 'Recite the travel supplication upon embarking on a voyage.',
            category: 'duas',
            icon: '✈️',
            xpReward: 110,
            quote: 'Glory to Him who has subjected this to us, and we could never have achieved it.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_debt_relief',
            title: 'Freedom from Debt',
            description: 'Recite the prophetic prayer for deliverance from debt and anxiety.',
            category: 'duas',
            icon: '💰',
            xpReward: 140,
            quote: 'O Allah, I seek refuge in You from grief and anxiety, and from the burden of debt.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_forgiveness_sayyid',
            title: 'Master of Istighfar',
            description: 'Memorize and recite Sayyid al-Istighfar with conviction.',
            category: 'duas',
            icon: '👑',
            xpReward: 300,
            quote: 'Whoever recites it in the day with faith and dies, will be among the people of Paradise.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'duas_khatm_quran',
            title: 'Seal of the Quran Dua',
            description: 'Read the comprehensive Dua upon concluding recitation of the Quran.',
            category: 'duas',
            icon: '🕋',
            xpReward: 500,
            quote: 'O Allah, make the Quran our companion in this world and an intercessor in the next.',
            progressCurrent: 1,
            progressTarget: 1
        },

        // ==========================================
        // 5. KNOWLEDGE & DISCOVER ISLAM (18 Badges)
        // ==========================================
        {
            id: 'knowledge_five_pillars',
            title: 'The Five Pillars Mastery',
            description: 'Complete in-depth study of Shahada, Salah, Zakat, Sawm, and Hajj.',
            category: 'knowledge',
            icon: '🏛️',
            xpReward: 100,
            quote: 'Islam is constructed on five pillars.',
            progressCurrent: 5,
            progressTarget: 5
        },
        {
            id: 'knowledge_articles_faith',
            title: 'Six Articles of Iman',
            description: 'Master the six pillars of belief: Allah, Angels, Books, Messengers, Day of Judgment, and Divine Decree.',
            category: 'knowledge',
            icon: '⭐',
            xpReward: 150,
            quote: 'Faith is to believe in Allah, His angels, His books, His messengers, the Last Day, and destiny.',
            progressCurrent: 6,
            progressTarget: 6
        },
        {
            id: 'knowledge_science_astronomy',
            title: 'Expanding Universe',
            description: 'Study the Quranic insights on cosmic expansion (Surah Adh-Dhariyat 51:47).',
            category: 'knowledge',
            icon: '🔭',
            xpReward: 120,
            quote: 'And the heaven We constructed with strength, and indeed, We are its expander.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_science_ocean',
            title: 'Oceanic Barriers',
            description: 'Discover the scientific phenomena of non-mixing salt and freshwater seas (55:19-20).',
            category: 'knowledge',
            icon: '🌊',
            xpReward: 120,
            quote: 'He released the two seas, meeting together; between them is a barrier neither transgresses.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_science_embryo',
            title: 'Human Genesis',
            description: 'Examine embryological stages detailed in Surah Al-Mu’minun 23:12-14.',
            category: 'knowledge',
            icon: '🧬',
            xpReward: 150,
            quote: 'Then We made the sperm-drop into a clinging clot...',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_science_iron',
            title: 'Sent Down from Stars',
            description: 'Reflect on Surah Al-Hadid (57:25) stating iron was sent down from the cosmos.',
            category: 'knowledge',
            icon: '☄️',
            xpReward: 140,
            quote: 'And We sent down iron, wherein is great military might and benefits for the people.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_ibn_al_haytham',
            title: 'Father of Optics',
            description: 'Learn how Ibn Al-Haytham pioneered the scientific method and camera obscura.',
            category: 'knowledge',
            icon: '💡',
            xpReward: 130,
            quote: 'Seeking truth through empirical observation and mathematical rigor.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_al_khwarizmi',
            title: 'Architect of Algebra',
            description: 'Discover Al-Khwarizmi’s revolution that birthed modern mathematics and algorithms.',
            category: 'knowledge',
            icon: '📐',
            xpReward: 130,
            quote: 'His name lives on in the word "Algorithm".',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_ibn_sina',
            title: 'Prince of Physicians',
            description: 'Explore the medical breakthroughs of Ibn Sina (Avicenna) in The Canon of Medicine.',
            category: 'knowledge',
            icon: '🩺',
            xpReward: 130,
            quote: 'A standard medical textbook across Europe for over 500 years.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_maryam_astrolabe',
            title: 'Keeper of the Stars',
            description: 'Study Maryam Al-Ijliya, the 10th-century maker of intricate celestial astrolabes.',
            category: 'knowledge',
            icon: '🌌',
            xpReward: 140,
            quote: 'Female pioneer in navigational astrophysics.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_fatima_university',
            title: 'First University on Earth',
            description: 'Discover Fatima Al-Fihri, founder of University of Al-Qarawiyyin (859 CE).',
            category: 'knowledge',
            icon: '🎓',
            xpReward: 150,
            quote: 'The oldest continuously operating university in recorded human history.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_prophets_adam_noah',
            title: 'The Earliest Messengers',
            description: 'Explore the stories of Adam, Idris, and Noah (Nuh) peace be upon them.',
            category: 'knowledge',
            icon: '🚢',
            xpReward: 160,
            quote: 'Patience and steadfast call through nine hundred and fifty years.',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_prophet_ibrahim',
            title: 'Friend of the Merciful',
            description: 'Study the life, trials, and pure monotheism of Prophet Ibrahim (Abraham).',
            category: 'knowledge',
            icon: '🕋',
            xpReward: 180,
            quote: 'Indeed, Abraham was a nation, obedient to Allah, inclining toward truth. (16:120)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_prophet_musa',
            title: 'The Speaker with Allah',
            description: 'Study the exodus, courage, and divine laws of Prophet Musa (Moses).',
            category: 'knowledge',
            icon: '⚡',
            xpReward: 180,
            quote: 'Indeed, with me is my Lord; He will guide me. (26:62)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_prophet_isa',
            title: 'The Messiah and Word',
            description: 'Learn the true Islamic honoring of Prophet Isa (Jesus son of Mary).',
            category: 'knowledge',
            icon: '🕊️',
            xpReward: 180,
            quote: 'Peace is on me the day I was born, the day I die, and the day I am raised alive. (19:33)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_prophet_muhammad',
            title: 'Mercy to All Creation',
            description: 'Complete the biography and character study of Prophet Muhammad ﷺ.',
            category: 'knowledge',
            icon: '🌹',
            xpReward: 250,
            quote: 'And We have not sent you except as a mercy to all creation. (21:107)',
            progressCurrent: 1,
            progressTarget: 1
        },
        {
            id: 'knowledge_sahaba_virtues',
            title: 'Stars of Guidance',
            description: 'Study the lives of Abu Bakr, Umar, Uthman, and Ali may Allah be pleased with them.',
            category: 'knowledge',
            icon: '🌟',
            xpReward: 220,
            quote: 'My companions are like stars; whichever of them you follow, you will be rightly guided.',
            progressCurrent: 4,
            progressTarget: 4
        },
        {
            id: 'knowledge_100_modules_conquered',
            title: 'Master of Islamic Wisdom',
            description: 'Explore and complete modules across history, science, prophets, and ethics.',
            category: 'knowledge',
            icon: '👑',
            xpReward: 5000,
            quote: 'Seeking knowledge from the cradle to the grave.',
            progressCurrent: Math.min(level * 2, 100),
            progressTarget: 100
        },

        // ==========================================
        // 6. MASTER MILESTONES (20 Challenging Badges)
        // ==========================================
        {
            id: 'level_5_badge',
            title: 'Level 5: The Firmly Rooted',
            description: 'Advance to Level 5: Mu\'tamid (Firmly Rooted in basic Islamic knowledge).',
            category: 'milestones',
            icon: '🌱',
            xpReward: 150,
            quote: 'A good word like a good tree, whose root is firmly fixed and its branches in the sky.',
            progressCurrent: Math.min(level, 5),
            progressTarget: 5
        },
        {
            id: 'level_10_badge',
            title: 'Level 10: Devoted Remembrancer',
            description: 'Advance to Level 10: Dhakir (Constant in worship and remembrance).',
            category: 'milestones',
            icon: '⚡',
            xpReward: 350,
            quote: 'Remember Allah with much remembrance.',
            progressCurrent: Math.min(level, 10),
            progressTarget: 10
        },
        {
            id: 'level_15_badge',
            title: 'Level 15: Reciter of Peace',
            description: 'Advance to Level 15: Qari (Skillful reciter of the Holy Quran).',
            category: 'milestones',
            icon: '📖',
            xpReward: 600,
            quote: 'Reciting with beauty and reflection.',
            progressCurrent: Math.min(level, 15),
            progressTarget: 15
        },
        {
            id: 'level_20_badge',
            title: 'Level 20: The Devout Believer',
            description: 'Advance to Level 20: Mu\'min (The Steadfast Believer).',
            category: 'milestones',
            icon: '🛡️',
            xpReward: 900,
            quote: 'Successful indeed are the believers. (Al-Mu\'minun 23:1)',
            progressCurrent: Math.min(level, 20),
            progressTarget: 20
        },
        {
            id: 'level_25_badge',
            title: 'Level 25: The God-Conscious',
            description: 'Advance to Level 25: Muttaqi (The Righteous and God-fearing).',
            category: 'milestones',
            icon: '✨',
            xpReward: 1300,
            quote: 'Indeed, the most noble of you in the sight of Allah is the most righteous.',
            progressCurrent: Math.min(level, 25),
            progressTarget: 25
        },
        {
            id: 'level_30_badge',
            title: 'Level 30: Student of Knowledge',
            description: 'Advance to Level 30: Talib al-Ilm (Dedicated Student of Wisdom).',
            category: 'milestones',
            icon: '🎓',
            xpReward: 1800,
            quote: 'Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.',
            progressCurrent: Math.min(level, 30),
            progressTarget: 30
        },
        {
            id: 'level_40_badge',
            title: 'Level 40: The Pure in Heart',
            description: 'Advance to Level 40: Mukhlas (The Sincere Servant).',
            category: 'milestones',
            icon: '🤍',
            xpReward: 2500,
            quote: 'Except the chosen, sincere servants of Allah. (37:40)',
            progressCurrent: Math.min(level, 40),
            progressTarget: 40
        },
        {
            id: 'level_50_badge',
            title: 'Level 50: Grand Pillar',
            description: 'Attain Level 50: Half-century of elevated ranks in the app.',
            category: 'milestones',
            icon: '🏛️',
            xpReward: 3500,
            quote: 'Allah will raise those who have believed among you and those who were given knowledge, by degrees.',
            progressCurrent: Math.min(level, 50),
            progressTarget: 50
        },
        {
            id: 'level_60_badge',
            title: 'Level 60: The Generous Benefactor',
            description: 'Advance to Level 60: Muhsin (The Doer of Excellence).',
            category: 'milestones',
            icon: '💎',
            xpReward: 5000,
            quote: 'Indeed, Allah loves the doers of good. (2:195)',
            progressCurrent: Math.min(level, 60),
            progressTarget: 60
        },
        {
            id: 'level_75_badge',
            title: 'Level 75: The Illuminated Scholar',
            description: 'Advance to Level 75: Faqih (Master of Deep Spiritual Understanding).',
            category: 'milestones',
            icon: '🕯️',
            xpReward: 7500,
            quote: 'Whomever Allah desires good for, He grants deep understanding of the religion.',
            progressCurrent: Math.min(level, 75),
            progressTarget: 75
        },
        {
            id: 'level_90_badge',
            title: 'Level 90: Close Companion',
            description: 'Advance to Level 90: Muqarrab (Drawn Near in Divine Love).',
            category: 'milestones',
            icon: '🕊️',
            xpReward: 10000,
            quote: 'And the foremost, the foremost — they are the ones brought near. (56:10-11)',
            progressCurrent: Math.min(level, 90),
            progressTarget: 90
        },
        {
            id: 'level_100_badge',
            title: 'Level 100: Sultan of Knowledge',
            description: 'The supreme pinnacle of progression: Level 100 completed.',
            category: 'milestones',
            icon: '👑',
            xpReward: 25000,
            quote: 'Say: My Lord, increase me in knowledge. (Ta-Ha 20:114)',
            progressCurrent: Math.min(level, 100),
            progressTarget: 100
        },
        {
            id: 'xp_500_badge',
            title: 'Century of Deeds (500 XP)',
            description: 'Earn 500 lifetime XP through quizzes, zikr, and reading.',
            category: 'milestones',
            icon: '🌟',
            xpReward: 100,
            quote: 'Every step taken toward goodness is multiplied.',
            progressCurrent: Math.min(points, 500),
            progressTarget: 500
        },
        {
            id: 'xp_1000_badge',
            title: 'Thousand Points of Light (1,000 XP)',
            description: 'Accumulate 1,000 XP points in your spiritual profile.',
            category: 'milestones',
            icon: '✨',
            xpReward: 250,
            quote: 'The scales of righteousness grow heavy with persistent effort.',
            progressCurrent: Math.min(points, 1000),
            progressTarget: 1000
        },
        {
            id: 'xp_2500_badge',
            title: 'Radiant Harvest (2,500 XP)',
            description: 'Earn 2,500 XP across all spiritual modules.',
            category: 'milestones',
            icon: '🌾',
            xpReward: 500,
            quote: 'Reaping the bountiful harvest of daily dedication.',
            progressCurrent: Math.min(points, 2500),
            progressTarget: 2500
        },
        {
            id: 'xp_5000_badge',
            title: 'Golden Treasury (5,000 XP)',
            description: 'Accumulate 5,000 XP through sustained devotional study.',
            category: 'milestones',
            icon: '💰',
            xpReward: 1000,
            quote: 'A wealth of good deeds stored in the unseen realm.',
            progressCurrent: Math.min(points, 5000),
            progressTarget: 5000
        },
        {
            id: 'xp_10000_badge',
            title: 'Vault of Light (10,000 XP)',
            description: 'Accumulate 10,000 XP points.',
            category: 'milestones',
            icon: '🏛️',
            xpReward: 2500,
            quote: 'Ten thousand deeds shining like stars in the celestial expanse.',
            progressCurrent: Math.min(points, 10000),
            progressTarget: 10000
        },
        {
            id: 'xp_25000_badge',
            title: 'Arch of Glory (25,000 XP)',
            description: 'Earn 25,000 XP across app lifetime usage.',
            category: 'milestones',
            icon: '🌌',
            xpReward: 5000,
            quote: 'Unshakeable dedication that inspires everyone around you.',
            progressCurrent: Math.min(points, 25000),
            progressTarget: 25000
        },
        {
            id: 'xp_50000_badge',
            title: 'Crown of Jewels (50,000 XP)',
            description: 'Attain 50,000 XP points.',
            category: 'milestones',
            icon: '👑',
            xpReward: 10000,
            quote: 'A crown of light placed upon the head of the sincere servant.',
            progressCurrent: Math.min(points, 50000),
            progressTarget: 50000
        },
        {
            id: 'xp_100000_badge',
            title: 'Master of Eternity (100,000 XP)',
            description: 'The monumental benchmark: 100,000 total lifetime XP.',
            category: 'milestones',
            icon: '🕋',
            xpReward: 50000,
            quote: 'May Allah enter you into Jannatul Firdaus without reckoning!',
            progressCurrent: Math.min(points, 100000),
            progressTarget: 100000
        }
    ];
};
