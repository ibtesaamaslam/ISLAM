export interface LevelInfo {
    level: number;
    title: string;
    arabicTitle: string;
    perk: string;
    icon: string;
    tier: number;
    tierName: string;
    tierColor: string;
    requiredXp: number;
    funFact: string;
}

export interface LevelTier {
    id: number;
    name: string;
    arabicName: string;
    range: string;
    startLevel: number;
    endLevel: number;
    color: string;
    bgGradient: string;
    icon: string;
    description: string;
}

export const LEVEL_TIERS: LevelTier[] = [
    {
        id: 1,
        name: "Sprout of Iman",
        arabicName: "شجرہ ایمان",
        range: "Levels 1 - 10",
        startLevel: 1,
        endLevel: 10,
        color: "text-emerald-700 bg-emerald-100 border-emerald-300",
        bgGradient: "from-emerald-500 to-teal-600",
        icon: "🌱",
        description: "Planting the pure seeds of Bismillah, prayer, and good deeds in your heart!"
    },
    {
        id: 2,
        name: "Desert Caravan of Medina",
        arabicName: "قافلہ مدینہ",
        range: "Levels 11 - 20",
        startLevel: 11,
        endLevel: 20,
        color: "text-amber-800 bg-amber-100 border-amber-300",
        bgGradient: "from-amber-500 to-orange-600",
        icon: "🐪",
        description: "Traveling the historic trade routes with Sahaba, camels, and glowing desert lanterns!"
    },
    {
        id: 3,
        name: "Ocean of Pearls & Noor",
        arabicName: "بحر النور",
        range: "Levels 21 - 30",
        startLevel: 21,
        endLevel: 30,
        color: "text-sky-800 bg-sky-100 border-sky-300",
        bgGradient: "from-sky-500 to-blue-600",
        icon: "🦪",
        description: "Diving deep into crystal ocean waters to gather sparkling gems of truth and patience!"
    },
    {
        id: 4,
        name: "Jabal al-Noor Climbers",
        arabicName: "جبل النور",
        range: "Levels 31 - 40",
        startLevel: 31,
        endLevel: 40,
        color: "text-purple-800 bg-purple-100 border-purple-300",
        bgGradient: "from-purple-500 to-indigo-600",
        icon: "🏔️",
        description: "Ascending the steep Mountain of Light where the first word 'Iqra' echoed!"
    },
    {
        id: 5,
        name: "House of Wisdom Scribes",
        arabicName: "اهل القلم والفرقان",
        range: "Levels 41 - 50",
        startLevel: 41,
        endLevel: 50,
        color: "text-indigo-800 bg-indigo-100 border-indigo-300",
        bgGradient: "from-indigo-500 to-violet-600",
        icon: "📜",
        description: "Wielding the noble golden quill of science, astronomy, hadith chains, and calligraphy!"
    },
    {
        id: 6,
        name: "Guardians of the Sanctuary",
        arabicName: "حراس الحرم المكي",
        range: "Levels 51 - 60",
        startLevel: 51,
        endLevel: 60,
        color: "text-teal-800 bg-teal-100 border-teal-300",
        bgGradient: "from-teal-600 to-emerald-700",
        icon: "🕋",
        description: "Circling the blessed Kaaba, drinking Zamzam, and walking in the footsteps of Ibrahim!"
    },
    {
        id: 7,
        name: "Rivers of Paradise",
        arabicName: "انهار الجنة والكوثر",
        range: "Levels 61 - 70",
        startLevel: 61,
        endLevel: 70,
        color: "text-cyan-800 bg-cyan-100 border-cyan-300",
        bgGradient: "from-cyan-500 to-blue-600",
        icon: "🌊",
        description: "Resting beside River Kawthar with silver goblets and sweet fragrant musk breezes!"
    },
    {
        id: 8,
        name: "Celestial Wings of Light",
        arabicName: "اجنحة الملائكة والنور",
        range: "Levels 71 - 80",
        startLevel: 71,
        endLevel: 80,
        color: "text-rose-800 bg-rose-100 border-rose-300",
        bgGradient: "from-rose-500 to-pink-600",
        icon: "🪽",
        description: "Surrounded by noble angels who spread their radiant wings over students of knowledge!"
    },
    {
        id: 9,
        name: "Golden Mihrab of the Foremost",
        arabicName: "السابقون المقربون",
        range: "Levels 81 - 90",
        startLevel: 81,
        endLevel: 90,
        color: "text-amber-900 bg-amber-200 border-amber-400",
        bgGradient: "from-amber-400 to-yellow-500",
        icon: "🕌",
        description: "Standing in the sacred sanctuary under the shade of the Divine Throne on the Last Day!"
    },
    {
        id: 10,
        name: "Supreme Sultans of Jannah",
        arabicName: "سلاطين الفردوس الاعلى",
        range: "Levels 91 - 100",
        startLevel: 91,
        endLevel: 100,
        color: "text-yellow-950 bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 border-yellow-400",
        bgGradient: "from-yellow-400 via-amber-500 to-orange-500",
        icon: "👑",
        description: "The absolute pinnacle of spiritual greatness! 100 levels conquered for the pleasure of Allah!"
    }
];

export const LEVELS_100: LevelInfo[] = [
    // TIER 1: Levels 1-10 (Sprout of Iman)
    {
        level: 1,
        title: "Bismillah Sprout",
        arabicTitle: "برعم البسملة",
        perk: "Unlocked your personal digital Tasbeeh counter",
        icon: "🌱",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 0,
        funFact: "Saying 'Bismillah' invites angels to place special Barakah (divine blessing) in everything you do!"
    },
    {
        level: 2,
        title: "Curious Explorer",
        arabicTitle: "مستكشف الإيمان",
        perk: "Unlocked Sunnah Smile badge & quiz hints",
        icon: "🌟",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 100,
        funFact: "Smiling at your brother, parents, or friends is counted as an instant charity (Sadaqah) in Islam!"
    },
    {
        level: 3,
        title: "Ayah Collector",
        arabicTitle: "جامع الآيات",
        perk: "Unlocked dual Quran translation view (Urdu & English)",
        icon: "📖",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 200,
        funFact: "For every single Arabic letter of the Holy Quran you read, you receive 10 good deeds recorded!"
    },
    {
        level: 4,
        title: "Tasbeeh Clicker",
        arabicTitle: "المسبح الذاكر",
        perk: "Custom click audio pitched up for rhythm",
        icon: "📿",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 300,
        funFact: "SubhanAllah and Alhamdulillah are so heavy that they fill up the vast space between Earth and Heaven!"
    },
    {
        level: 5,
        title: "Kind Heart Hero",
        arabicTitle: "صاحب القلب الطيب",
        perk: "Earned special Golden Heart avatar frame",
        icon: "❤️",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 400,
        funFact: "The Prophet (ﷺ) said: 'Allah is Gentle and loves gentleness in all matters.'"
    },
    {
        level: 6,
        title: "Wudu Wonder",
        arabicTitle: "طاهر الوضوء",
        perk: "Unlocked Sparkling Water purity aura",
        icon: "💧",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 500,
        funFact: "When you perform Wudu, minor sins wash away with the very last drop of water from your fingertips!"
    },
    {
        level: 7,
        title: "Dawn Rising Bird",
        arabicTitle: "طائر الفجر الصاعد",
        perk: "Special Fajr prayer streak multiplier (+5 XP)",
        icon: "🌅",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 600,
        funFact: "Whoever prays the two Sunnah raka'at before Fajr receives a reward greater than the entire world and everything in it!"
    },
    {
        level: 8,
        title: "Deed Scribe Helper",
        arabicTitle: "كاتب الحسنات",
        perk: "Angelic quill animation on quiz submit",
        icon: "📝",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 700,
        funFact: "The angel on your right shoulder writes down good deeds immediately, while the left angel waits patiently before recording mistakes!"
    },
    {
        level: 9,
        title: "Salam Spreader",
        arabicTitle: "ناشر السلام",
        perk: "Unlocks the 'Salam to the World' celebration sound",
        icon: "🕊️",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 800,
        funFact: "Saying 'As-Salamu Alaykum wa Rahmatullah' spreads safety, love, and earns 30 rewards instantly!"
    },
    {
        level: 10,
        title: "Garden of Iman Apprentice",
        arabicTitle: "حارس روضة الإيمان",
        perk: "Unlocked Tier 1 Emerald Trophy & 1st Milestone Chest",
        icon: "🌿",
        tier: 1,
        tierName: "Sprout of Iman",
        tierColor: "from-emerald-500 to-teal-500",
        requiredXp: 900,
        funFact: "Every time you say 'SubhanAllah wa bi-Hamdihi', a date-palm tree is planted for you in the gardens of Jannah!"
    },

    // TIER 2: Levels 11-20 (Desert Caravan of Medina)
    {
        level: 11,
        title: "Desert Caravan Pioneer",
        arabicTitle: "رائد قافلة الصحراء",
        perk: "Unlocked Desert Sand theme for Tasbeeh",
        icon: "🐪",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1000,
        funFact: "The Prophet's camel was named Al-Qaswa, and she chose the exact blessed spot where Masjid an-Nabawi was built!"
    },
    {
        level: 12,
        title: "Oasis Water Bearer",
        arabicTitle: "ساقي واحة الإحسان",
        perk: "Drinking water reminder & Sunnah manners",
        icon: "🌴",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1100,
        funFact: "Sunnah of drinking: Sit down, hold with your right hand, say Bismillah, and drink in three peaceful sips!"
    },
    {
        level: 13,
        title: "Medina Date Harvester",
        arabicTitle: "جاني تمور المدينة",
        perk: "Earned sweet Ajwa date avatar badge",
        icon: "🥥",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1200,
        funFact: "Eating 7 Ajwa dates in the morning protects from harmful poisons and distress for that entire day!"
    },
    {
        level: 14,
        title: "Bedouin Storyteller",
        arabicTitle: "راوي سيرة الصحابة",
        perk: "Unlocked Sahaba audio stories in chat",
        icon: "⛺",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1300,
        funFact: "Abu Bakr (RA) was called 'As-Siddiq' because he believed the Prophet (ﷺ) without a single second of hesitation!"
    },
    {
        level: 15,
        title: "Lantern of Quba",
        arabicTitle: "سراج مسجد قباء",
        perk: "Warm amber glow on active Quran verses",
        icon: "🏮",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1400,
        funFact: "Purifying oneself at home and praying two units in Masjid Quba earns the entire reward of an Umrah pilgrimage!"
    },
    {
        level: 16,
        title: "Ansar Brotherhood Keeper",
        arabicTitle: "أخو الأنصار الصادق",
        perk: "Bonus +15 XP when sharing knowledge with a friend",
        icon: "🤝",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1500,
        funFact: "The Ansar of Medina welcomed the Muhajirun from Mecca and offered them half of everything they owned!"
    },
    {
        level: 17,
        title: "Night Star Navigator",
        arabicTitle: "دليل نجوم الصحراء",
        perk: "Cosmic night sky backdrop mode",
        icon: "🌌",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1600,
        funFact: "Allah created stars for three purposes: beauty for the sky, missiles against devils, and guidance for desert travelers!"
    },
    {
        level: 18,
        title: "Falcon of Honesty",
        arabicTitle: "صقر الصدق والأمانة",
        perk: "Silver feather badge on profile",
        icon: "🦅",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1700,
        funFact: "The Prophet (ﷺ) was known throughout Arabia as 'Al-Amin' (The Trustworthy) even before Prophethood began!"
    },
    {
        level: 19,
        title: "Medina Treasure Finder",
        arabicTitle: "مكتشف كنوز الهدى",
        perk: "Reveals secret trivia button on all Hadiths",
        icon: "🗝️",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1800,
        funFact: "The area between the Prophet's house and his pulpit is literally a Garden from the Gardens of Paradise!"
    },
    {
        level: 20,
        title: "Caravan Commander",
        arabicTitle: "قائد القوافل المباركة",
        perk: "Unlocked Tier 2 Bronze Shield & Golden Camel Pin",
        icon: "🛡️",
        tier: 2,
        tierName: "Desert Caravan of Medina",
        tierColor: "from-amber-500 to-orange-500",
        requiredXp: 1900,
        funFact: "Generosity in trade: Allah will shade on the Day of Judgment whoever gives more time to someone struggling with debt!"
    },

    // TIER 3: Levels 21-30 (Ocean of Pearls & Noor)
    {
        level: 21,
        title: "Pearl Diver of Truth",
        arabicTitle: "غواص لآلئ الحق",
        perk: "Unlocked Ocean Blue Tasbeeh Skin",
        icon: "🦪",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2000,
        funFact: "Just as an oyster patiently builds a pearl out of grit, your patience through tough times turns into shining light in Jannah!"
    },
    {
        level: 22,
        title: "Wave of Gratitude",
        arabicTitle: "موجة الحمد والشكر",
        perk: "Alhamdulillah pulse animation",
        icon: "🌊",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2100,
        funFact: "Allah says in the Quran: 'If you are grateful, I will surely increase you in favor!' (Surah Ibrahim: 7)"
    },
    {
        level: 23,
        title: "Corals of Patience",
        arabicTitle: "مرجان الصبر الجميل",
        perk: "Reduces quiz timer stress with soothing breeze",
        icon: "🪸",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2200,
        funFact: "Sabr (patience) is of three kinds: patience in doing good, patience in staying away from evil, and patience during hard moments!"
    },
    {
        level: 24,
        title: "Captain of the Safe Ark",
        arabicTitle: "ربان سفينة النجاة",
        perk: "Navigation wheel badge & fast Surah jumps",
        icon: "⛵",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2300,
        funFact: "Prophet Nuh's (AS) Ark carried pairs of every animal, sailing atop waves high as mountains with Allah's protection!"
    },
    {
        level: 25,
        title: "Compass of Qibla",
        arabicTitle: "بوصلة القبلة الذهبية",
        perk: "Instant Qibla compass alignment indicator",
        icon: "🧭",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2400,
        funFact: "Over two billion Muslims around the globe turn towards the single sacred Kaaba in Mecca five times every day!"
    },
    {
        level: 26,
        title: "Sea of Mercy",
        arabicTitle: "بحر الرحمة المهداة",
        perk: "Heart confetti bursts on achieving daily Dhikr goals",
        icon: "🐬",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2500,
        funFact: "A woman was forgiven of all sins simply because she gave water to a thirsty panting dog in the desert heat!"
    },
    {
        level: 27,
        title: "Lighthouse of Guidance",
        arabicTitle: "منارة الهدى والرشاد",
        perk: "Night reading mode with high-contrast text",
        icon: "🚨",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2600,
        funFact: "The Quran describes itself as 'Nur' (Light) and 'Shifa' (Healing) for everything hidden inside human chests!"
    },
    {
        level: 28,
        title: "Deep Sea Gem Finder",
        arabicTitle: "صائد يواقيت المعرفة",
        perk: "Special gem sparkle sparkles on Ayah tap",
        icon: "💎",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2700,
        funFact: "Seeking knowledge is an obligatory duty upon every single Muslim boy and girl throughout their entire lives!"
    },
    {
        level: 29,
        title: "Tide of Generosity",
        arabicTitle: "مد الجود والعطاء",
        perk: "Unlocks Sadaqah jar tracking helper",
        icon: "🪙",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2800,
        funFact: "Wealth never decreases because of charity; in fact, Allah blesses and multiplies what remains many times over!"
    },
    {
        level: 30,
        title: "Ocean Master of Light",
        arabicTitle: "سيد بحار النور",
        perk: "Unlocked Tier 3 Sapphire Ocean Crest & Crown",
        icon: "🔱",
        tier: 3,
        tierName: "Ocean of Pearls & Noor",
        tierColor: "from-sky-500 to-blue-600",
        requiredXp: 2900,
        funFact: "The Prophet (ﷺ) said: 'The upper hand (that gives) is far better than the lower hand (that only receives).'"
    },

    // TIER 4: Levels 31-40 (Jabal al-Noor Climbers)
    {
        level: 31,
        title: "Mountain Pathfinder",
        arabicTitle: "سائر درب حراء",
        perk: "Unlocked Amethyst Mountain Theme",
        icon: "🧗",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3000,
        funFact: "Jabal al-Noor is about 640 meters high and overlooks the entire valley of holy Mecca!"
    },
    {
        level: 32,
        title: "Cave of Reflection",
        arabicTitle: "معتكف غار حراء",
        perk: "Deep focus meditation audio chime",
        icon: "🕯️",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3100,
        funFact: "Before Prophethood, Muhammad (ﷺ) would spend days in quiet worship inside Cave Hira looking up at the stars!"
    },
    {
        level: 33,
        title: "Voice of Iqra",
        arabicTitle: "صدى اقرأ باسم ربك",
        perk: "Audio pronunciation tutor for first 5 verses of Al-Alaq",
        icon: "📜",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3200,
        funFact: "The very first word of the Quran ever revealed in history was: 'Iqra!' (Read / Recite)!"
    },
    {
        level: 34,
        title: "Cloud Walker",
        arabicTitle: "السائر فوق السحاب",
        perk: "Floating cloud animations on level-ups",
        icon: "☁️",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3300,
        funFact: "Clouds carry hundreds of thousands of tons of sweet water, moved across countries by Allah's divine wind!"
    },
    {
        level: 35,
        title: "Summit Star Gazer",
        arabicTitle: "راصد نجوم القمة",
        perk: "Unlocked astronomy quiz challenges",
        icon: "🔭",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3400,
        funFact: "The Quran mentioned that the universe is constantly expanding over 1,400 years before modern telescopes discovered it!"
    },
    {
        level: 36,
        title: "Echo of Peace",
        arabicTitle: "منادي السلام في الآفاق",
        perk: "Unlocks soft Urdu & English recitation audio echo",
        icon: "📢",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3500,
        funFact: "When the Prophet entered Medina, his first advice was: 'Spread peace, feed the hungry, and pray while people sleep!'"
    },
    {
        level: 37,
        title: "Cedar of Steadfastness",
        arabicTitle: "شجرة الإيمان الراسخة",
        perk: "Prevents daily streak loss for 1 missed day",
        icon: "🌲",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3600,
        funFact: "A true believer is like a resilient palm tree whose leaves never fall and whose fruit brings nourishment all year!"
    },
    {
        level: 38,
        title: "Golden Sunbeam Seeker",
        arabicTitle: "ملتمس شعاع الضحى",
        perk: "Duha prayer reminder & +20 XP quest",
        icon: "☀️",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3700,
        funFact: "Praying 2 raka'at of Salat al-Duha in the morning fulfills the charity due for every single one of your 360 bodily joints!"
    },
    {
        level: 39,
        title: "Eagle of High Resolve",
        arabicTitle: "نسر الهمة العالية",
        perk: "Double XP on completing all 3 daily challenges",
        icon: "🦅",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3800,
        funFact: "The Prophet (ﷺ) taught us: 'When you ask Allah for Paradise, ask Him for Al-Firdaws, for it is the highest peak of Jannah!'"
    },
    {
        level: 40,
        title: "Champion of Jabal al-Noor",
        arabicTitle: "فارس جبل النور",
        perk: "Unlocked Tier 4 Royal Amethyst Crown & Aura",
        icon: "🏔️",
        tier: 4,
        tierName: "Jabal al-Noor Climbers",
        tierColor: "from-purple-500 to-indigo-600",
        requiredXp: 3900,
        funFact: "Surah Al-Qadr reveals that on Laylatul Qadr (Night of Power), worship is better than a thousand full months (over 83 years)!"
    },

    // TIER 5: Levels 41-50 (House of Wisdom Scribes)
    {
        level: 41,
        title: "Parchment Scribe",
        arabicTitle: "خطاط الرقوق والفرقان",
        perk: "Unlocked Calligraphy font toggle in Quran view",
        icon: "✒️",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4000,
        funFact: "The first thing Allah created was the Pen (Al-Qalam) and commanded it to write everything that will happen until Judgment Day!"
    },
    {
        level: 42,
        title: "Keeper of Ancient Scrolls",
        arabicTitle: "أمين المخطوطات النبوية",
        perk: "Access to deep historical Hadith footnotes",
        icon: "📜",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4100,
        funFact: "Imam al-Bukhari traveled across mountains and deserts for 16 years, examining over 600,000 narrations to verify his Sahih book!"
    },
    {
        level: 43,
        title: "Master of Thuluth Script",
        arabicTitle: "فنان الخط العربي",
        perk: "Gold-embossed text effects on top cards",
        icon: "🖋️",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4200,
        funFact: "Islamic calligraphy flourished with styles like Thuluth, Naskh, and Diwani to honor the beauty of the Quranic words!"
    },
    {
        level: 44,
        title: "House of Wisdom Scholar",
        arabicTitle: "عالم بيت الحكمة",
        perk: "Unlocked Science & Islam module bonuses",
        icon: "🏛️",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4300,
        funFact: "The Bayt al-Hikmah in Baghdad was the greatest library on Earth, translating medicine, philosophy, and mathematics!"
    },
    {
        level: 45,
        title: "Hadith Chain Verifier",
        arabicTitle: "محقق أسانيد الحديث",
        perk: "Isnad verification badge on every Hadith",
        icon: "🔗",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4400,
        funFact: "The science of Hadith verification (Isnad) is the most rigorous historical truth-checking system ever created by humans!"
    },
    {
        level: 46,
        title: "Crescent Moon Astronomer",
        arabicTitle: "راصد الأهلة والشهور",
        perk: "Live Islamic Hijri moon phase display",
        icon: "🌙",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4500,
        funFact: "Muslim astronomers mapped over 200 stars that still retain Arabic names in modern science, like Aldebaran and Betelgeuse!"
    },
    {
        level: 47,
        title: "Prophetic Botanist",
        arabicTitle: "حكيم الطب النبوي",
        perk: "Unlocked Sunnah health & wellness cards",
        icon: "🌿",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4600,
        funFact: "Black seed (Kalonji), pure olive oil, and raw honey were recommended by the Prophet (ﷺ) for health and healing!"
    },
    {
        level: 48,
        title: "Al-Khwarizmi Mathematician",
        arabicTitle: "عالم الجبر والخوارزميات",
        perk: "Smart XP algorithm unlocks streak multipliers",
        icon: "📐",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4700,
        funFact: "The word 'Algorithm' comes from Al-Khwarizmi, the Muslim genius who invented Algebra (Al-Jabr) to solve inheritance laws!"
    },
    {
        level: 49,
        title: "Gilder of the Mushaf",
        arabicTitle: "مذهب المصاحف الشريفة",
        perk: "24K Gold border accents on ayah reader",
        icon: "🎨",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4800,
        funFact: "Master artisans would spend up to five full years using pure liquid gold leaf to illuminate a single royal Mushaf copy!"
    },
    {
        level: 50,
        title: "Grand Sage of Wisdom",
        arabicTitle: "الحكيم الأعظم",
        perk: "Unlocked Tier 5 Golden Quill & Milestone Trophy",
        icon: "🎓",
        tier: 5,
        tierName: "House of Wisdom Scribes",
        tierColor: "from-indigo-500 to-violet-600",
        requiredXp: 4900,
        funFact: "The Prophet (ﷺ) said: 'The superiority of the learned scholar over the devout worshipper is like that of the full moon over stars!'"
    },

    // TIER 6: Levels 51-60 (Guardians of the Sanctuary)
    {
        level: 51,
        title: "Pilgrim of Pure White",
        arabicTitle: "المحرم بلباس النقاء",
        perk: "Talbiyah chant audio button in discover mode",
        icon: "🕊️",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5000,
        funFact: "In Ihram, kings, scholars, and ordinary people all wear two identical unstitched white towels to show absolute equality before Allah!"
    },
    {
        level: 52,
        title: "Tawaf Guardian",
        arabicTitle: "طائف البيت العتيق",
        perk: "Smooth continuous circular audio autoplay",
        icon: "🕋",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5100,
        funFact: "Tawaf moves in a counter-clockwise direction, the exact same way electrons spin around atoms and planets orbit the sun!"
    },
    {
        level: 53,
        title: "Runner of Safa & Marwa",
        arabicTitle: "ساعي الصفا والمروة",
        perk: "Speed challenge bonus in Islamic trivia",
        icon: "🏃",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5200,
        funFact: "The Sai commemorates Lady Hajar running between the two hills seven times searching for water for baby Ismail (AS)!"
    },
    {
        level: 54,
        title: "Drinker of Pure Zamzam",
        arabicTitle: "شارب ماء زمزم المبارك",
        perk: "Unlocks Zamzam blessing sound effect",
        icon: "🏺",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5300,
        funFact: "Zamzam water has gushed continuously from the desert earth for over 4,000 years without ever running dry or stagnating!"
    },
    {
        level: 55,
        title: "Camper of Mina Valleys",
        arabicTitle: "نازل وادي منى المبارك",
        perk: "Campfire night mode UI styling",
        icon: "⛺",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5400,
        funFact: "Mina is known as the 'City of White Tents' and temporarily hosts over 2.5 million guests of Allah during the days of Hajj!"
    },
    {
        level: 56,
        title: "Supplicant of Mount Arafat",
        arabicTitle: "واقف جبل الرحمة بعرفات",
        perk: "Special Dua generator with 50+ authentic prayers",
        icon: "🤲",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5500,
        funFact: "The best supplication made anywhere on Earth is the supplication on the Day of Arafat!"
    },
    {
        level: 57,
        title: "Pebble Cast of Muzdalifah",
        arabicTitle: "جامع حصى المزدلفة",
        perk: "Shield against waswas (whispers) badge",
        icon: "🪨",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5600,
        funFact: "Stoning the Jamarat symbolizes Prophet Ibrahim casting stones at Shaytan to reject his temptations three times!"
    },
    {
        level: 58,
        title: "Keeper of the Golden Gate",
        arabicTitle: "سادن باب الكعبة المشرفة",
        perk: "Golden Door icon unlocks exclusive trivia",
        icon: "🚪",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5700,
        funFact: "The key of the Kaaba has been entrusted to the family of Bani Shaybah since the conquest of Mecca by the Prophet's command!"
    },
    {
        level: 59,
        title: "Touch of the Black Stone",
        arabicTitle: "مستلم الحجر الأسود",
        perk: "Velvet black card theme with gold embroidery",
        icon: "🖤",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5800,
        funFact: "The Black Stone (Al-Hajar al-Aswad) descended from Paradise whiter than milk, but turned dark due to the sins of mankind!"
    },
    {
        level: 60,
        title: "Knight of the Kaaba",
        arabicTitle: "فارس الحرمين الشريفين",
        perk: "Unlocked Tier 6 Emerald Kaaba Emblem & Banner",
        icon: "⚔️",
        tier: 6,
        tierName: "Guardians of the Sanctuary",
        tierColor: "from-teal-600 to-emerald-700",
        requiredXp: 5900,
        funFact: "One single prayer in the Sacred Mosque of Mecca is rewarded as equal to 100,000 prayers elsewhere!"
    },

    // TIER 7: Levels 61-70 (Rivers of Paradise)
    {
        level: 61,
        title: "River Kawthar Wanderer",
        arabicTitle: "وارد حوض الكوثر",
        perk: "Unlocked River Kawthar crystal blue theme",
        icon: "🌊",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6000,
        funFact: "Surah Al-Kawthar is the shortest Surah in the Quran (only 3 verses), promising the Prophet a river of abundance!"
    },
    {
        level: 62,
        title: "Goblet of Silver Light",
        arabicTitle: "شارب كؤوس الفضة",
        perk: "Sparkling silver cup badge on profile",
        icon: "🥤",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6100,
        funFact: "The cups at the Prophet's Basin are as numerous as the stars in the night sky; whoever drinks from it will never thirst again!"
    },
    {
        level: 63,
        title: "Stream of Pure Honey",
        arabicTitle: "ساقي أنهار العسل المصفى",
        perk: "Golden amber wave ripple on tasbeeh tap",
        icon: "🍯",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6200,
        funFact: "In Jannah, there are four grand rivers: a river of crystal water, a river of milk, a river of pure honey, and a river of delights!"
    },
    {
        level: 64,
        title: "Spring of Tasneem",
        arabicTitle: "المقرب من عين تسنيم",
        perk: "High-tier audio chime with gentle mountain stream",
        icon: "💧",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6300,
        funFact: "Tasneem is the highest and purest spring in Paradise, reserved specially for the foremost believers (Al-Muqarrabun)!"
    },
    {
        level: 65,
        title: "Fountain of Salsabeel",
        arabicTitle: "شارب سلسبيل الجنان",
        perk: "Fragrant lotus flower badge",
        icon: "🪷",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6400,
        funFact: "Salsabeel flows effortlessly and is delicately infused with celestial ginger for the honored dwellers of Jannah!"
    },
    {
        level: 66,
        title: "Thornless Pomegranate Tender",
        arabicTitle: "جاني ثمار الرمان النضيد",
        perk: "Sweet fruit celebration graphic on level-up",
        icon: "🍇",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6500,
        funFact: "The trees of Jannah have branches weighted low with sweet fruit within arm's reach, with zero thorns!"
    },
    {
        level: 67,
        title: "Pavilion of Hollow Pearls",
        arabicTitle: "ساكن خيام اللؤلؤ المجوف",
        perk: "Shimmering mother-of-pearl UI card backgrounds",
        icon: "🐚",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6600,
        funFact: "In Jannah, a believer will have a tent made of a single hollowed pearl sixty miles high in the sky!"
    },
    {
        level: 68,
        title: "Robes of Emerald Brocade",
        arabicTitle: "المكتسي سندساً وإستبرقاً",
        perk: "Emerald green robe avatar unlock",
        icon: "👘",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6700,
        funFact: "The clothes of the people of Paradise never wear out, never get dirty, and are spun from divine green silk!"
    },
    {
        level: 69,
        title: "Breeze of Camphor & Musk",
        arabicTitle: "متنسم ريح المسك والكافور",
        perk: "Calming wind sound effects on widget load",
        icon: "💨",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6800,
        funFact: "The soil of Paradise is made of pure fragrant musk, and its pebbles are radiant rubies and genuine pearls!"
    },
    {
        level: 70,
        title: "Master of Heavenly Springs",
        arabicTitle: "سيد ينابيع الفردوس",
        perk: "Unlocked Tier 7 Crystal Kawthar Goblet & Crest",
        icon: "⛲",
        tier: 7,
        tierName: "Rivers of Paradise",
        tierColor: "from-cyan-500 to-blue-600",
        requiredXp: 6900,
        funFact: "In Paradise there is what no eye has ever seen, no ear has ever heard, and no human mind could ever imagine!"
    },

    // TIER 8: Levels 71-80 (Celestial Wings of Light)
    {
        level: 71,
        title: "Wing of Light Soarer",
        arabicTitle: "طائر بأجنحة النور",
        perk: "Unlocked Radiant Angelic Wing avatar effect",
        icon: "🪽",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7000,
        funFact: "Angels were created from pure light, do not eat or sleep, and never disobey any command of Allah!"
    },
    {
        level: 72,
        title: "Honorable Scribes' Companion",
        arabicTitle: "جليس الكرام الكاتبين",
        perk: "Secret fast-scroll button in reading mode",
        icon: "✍️",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7100,
        funFact: "The Kiraman Katibin record every word and whisper: 'Not a word does he utter but there is by him an alert watcher!'"
    },
    {
        level: 73,
        title: "Gatherer of Dhikr Circles",
        arabicTitle: "حاضر مجالس الذكر والملائكة",
        perk: "Circle glow animation on all Dhikr widgets",
        icon: "⭕",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7200,
        funFact: "Special roaming angels seek out gatherings where Allah is remembered, surrounding them with wings reaching the sky!"
    },
    {
        level: 74,
        title: "Bearer of Sakinah",
        arabicTitle: "متنزل السكينة والطمأنينة",
        perk: "Gentle breathing circle guide for stress relief",
        icon: "🕊️",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7300,
        funFact: "When Usayd ibn Hudayr recited Surah Al-Kahf at night, a cloud like a canopy with hanging lamps of angels descended over his home!"
    },
    {
        level: 75,
        title: "Guardian of the Pure Heart",
        arabicTitle: "صاحب القلب السليم",
        perk: "Heartbeat pulse audio sync on Tasbeeh",
        icon: "💖",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7400,
        funFact: "On Judgment Day, nothing will benefit a human being except coming to Allah with a pure, peaceful, sound heart!"
    },
    {
        level: 76,
        title: "Champion of the Mizan Scales",
        arabicTitle: "راجح كفة الميزان",
        perk: "Mizan golden scale animation on earning points",
        icon: "⚖️",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7500,
        funFact: "Good manners and saying 'Alhamdulillah' are the two heaviest things placed on the Scale of good deeds!"
    },
    {
        level: 77,
        title: "Gatekeeper of Rayyan",
        arabicTitle: "داخل من باب الريان",
        perk: "Fasting & Sawm tracker with lunar reminders",
        icon: "🚪",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7600,
        funFact: "Bab ar-Rayyan is a special gate in Jannah reserved exclusively for those who fasted; after they enter, it will be sealed!"
    },
    {
        level: 78,
        title: "Chamberlain of Jannah Gates",
        arabicTitle: "مستقبل الملائكة بالسلام",
        perk: "Welcoming Salam trumpet sound",
        icon: "🗝️",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7700,
        funFact: "Angels will enter upon the believers from every single gate saying: 'Peace be upon you for what you patiently endured!'"
    },
    {
        level: 79,
        title: "Crown of Ruby Stars",
        arabicTitle: "متوج بياقوت السماء",
        perk: "Ruby red crown badge over user initials",
        icon: "👑",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7800,
        funFact: "Whoever memorizes the Quran and acts upon it, his parents will be crowned with a crown radiant as the midday sun!"
    },
    {
        level: 80,
        title: "Winged Commander of Noor",
        arabicTitle: "قائد أجنحة النور والسكينة",
        perk: "Unlocked Tier 8 Angelic Winged Shield & Trophy",
        icon: "🛡️",
        tier: 8,
        tierName: "Celestial Wings of Light",
        tierColor: "from-rose-500 to-pink-600",
        requiredXp: 7900,
        funFact: "Angel Jibril (Gabriel) has 600 wings, each wing so vast that it covers the entire horizon between East and West!"
    },

    // TIER 9: Levels 81-90 (Golden Mihrab of the Foremost)
    {
        level: 81,
        title: "Beacon of Tahajjud",
        arabicTitle: "قائم صلاة الليل والتهجد",
        perk: "Unlocked Night Owl golden prayer badge",
        icon: "🌙",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8000,
        funFact: "In the last third of every single night, Allah descends to the lowest heaven asking: 'Who is calling upon Me, that I may answer him?'"
    },
    {
        level: 82,
        title: "Tears of Khushu",
        arabicTitle: "باكي من خشية الله",
        perk: "Peaceful raindrops audio background",
        icon: "🥹",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8100,
        funFact: "Two eyes will never be touched by the fire of Hell: an eye that weeps out of awe of Allah, and an eye that guards in Allah's cause!"
    },
    {
        level: 83,
        title: "Sidrat al-Muntaha Traveler",
        arabicTitle: "سائر سدرة المنتهى",
        perk: "Celestial Lote Tree golden leaves animation",
        icon: "🌳",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8200,
        funFact: "Sidrat al-Muntaha is the boundary beyond which no creation can pass; its leaves are like elephant ears and colors beyond description!"
    },
    {
        level: 84,
        title: "Canopy of the Divine Throne",
        arabicTitle: "المستظل بظل عرش الرحمن",
        perk: "Shaded canopy aura indicator",
        icon: "⛅",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8300,
        funFact: "Seven types of people will be shaded by Allah on the Day when there is no shade: including a youth who grew up worshipping Allah!"
    },
    {
        level: 85,
        title: "Chariot of Golden Light",
        arabicTitle: "فارس مراكب النور",
        perk: "Swift navigation speed boosts across chapters",
        icon: "🌟",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8400,
        funFact: "The speed of the Buraq (the celestial mount of Isra and Mi'raj) reached as far as its eye could see in one single stride!"
    },
    {
        level: 86,
        title: "Companion of the Prophets",
        arabicTitle: "رفيق النبيين والصديقين",
        perk: "Access to complete Prophetic timelines & maps",
        icon: "📜",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8500,
        funFact: "Whoever sponsors an orphan will be as close to the Prophet (ﷺ) in Jannah as two fingers held together!"
    },
    {
        level: 87,
        title: "Dwellers of the High Chambers",
        arabicTitle: "أهل الغرفات العالية",
        perk: "Crystal glass palace theme in app reader",
        icon: "🏛️",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8600,
        funFact: "In Jannah there are transparent chambers whose outside can be seen from inside and inside seen from outside, for those who feed others!"
    },
    {
        level: 88,
        title: "Sincere Supplicant",
        arabicTitle: "مستجاب الدعاء باليقين",
        perk: "Dua acceptance times reminder notifications",
        icon: "🪞",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8700,
        funFact: "No Muslim makes a supplication without sin in it except Allah gives him one of three: grants it now, saves it for Jannah, or averts evil!"
    },
    {
        level: 89,
        title: "Jewel of Firdaws",
        arabicTitle: "ياقوتة جنات الفردوس",
        perk: "Shimmering diamond badge next to username",
        icon: "💎",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8800,
        funFact: "The ceiling of Jannat al-Firdaws is the very Throne of Ar-Rahman (the Most Merciful Allah)!"
    },
    {
        level: 90,
        title: "Knight of the Golden Mihrab",
        arabicTitle: "فارس المحراب الذهبي",
        perk: "Unlocked Tier 9 Imperial Mihrab Scepter & Crown",
        icon: "🕌",
        tier: 9,
        tierName: "Golden Mihrab of the Foremost",
        tierColor: "from-amber-400 to-yellow-500",
        requiredXp: 8900,
        funFact: "The foremost in faith in this world (Al-Sabiqun) will be the foremost to enter Paradise and receive Allah's eternal pleasure!"
    },

    // TIER 10: Levels 91-100 (Supreme Sultans of Jannah)
    {
        level: 91,
        title: "Sultan of Constant Remembrance",
        arabicTitle: "سلطان الذاكرين الدائمين",
        perk: "Permanent +50 XP bonus on daily login",
        icon: "📿",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9000,
        funFact: "A companion asked: 'O Messenger of Allah, Islamic laws are many, tell me something to hold tightly onto!' He replied: 'Keep your tongue moist with the remembrance of Allah!'"
    },
    {
        level: 92,
        title: "Sun of Divine Knowledge",
        arabicTitle: "شمس المعارف الإلهية",
        perk: "Brilliant solar crown aura on user card",
        icon: "☀️",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9100,
        funFact: "When a person dies, all their deeds cease except three: ongoing charity, beneficial knowledge, and a righteous child who prays for them!"
    },
    {
        level: 93,
        title: "Flowing Spring of Sadaqah",
        arabicTitle: "ينبوع الصدقات الجارية",
        perk: "Community helper & mentor badge unlocked",
        icon: "⛲",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9200,
        funFact: "Planting a single tree from which any human, bird, or animal eats is recorded as continuous charity for you until the Day of Resurrection!"
    },
    {
        level: 94,
        title: "Hafiz of the Grand Book",
        arabicTitle: "حافظ كتاب الله المعظم",
        perk: "Gold-illuminated Ayah markers across all 114 Surahs",
        icon: "📖",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9300,
        funFact: "It will be said to the companion of the Quran in Jannah: 'Recite and ascend! Recite rhythmically as you recited in the world, for your home will be at the very last verse you recite!'"
    },
    {
        level: 95,
        title: "Radiant Face of the Full Moon",
        arabicTitle: "صاحب الوجه المضيء كالبدر",
        perk: "Full moon halo effect on profile",
        icon: "🌕",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9400,
        funFact: "The first group of believers to enter Paradise will shine as brilliant as the full moon on a cloudless night!"
    },
    {
        level: 96,
        title: "Beloved of Ar-Rahman",
        arabicTitle: "حبيب الرحمن المقرب",
        perk: "Heart of Light permanent theme unlock",
        icon: "❤️",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9500,
        funFact: "When Allah loves a servant, He calls Angel Jibril: 'I love so-and-so, so love him!' Then Jibril loves him and calls out across all heavens, and acceptance is placed for him on Earth!"
    },
    {
        level: 97,
        title: "Master of the 100 Paths",
        arabicTitle: "قاهر المائة منزلة",
        perk: "Unlocked All-100-Levels Gold Master Certificate",
        icon: "🗺️",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9600,
        funFact: "Islam is built on five pillars, but has more than seventy branches of faith—the highest is 'La ilaha illallah' and the modest is removing harm from people's pathways!"
    },
    {
        level: 98,
        title: "Crown of 1,000 Pearls",
        arabicTitle: "صاحب تاج الألف لؤلؤة",
        perk: "Golden pearl rain celebration when opening app",
        icon: "👑",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9700,
        funFact: "The Prophet (ﷺ) said: 'Behold, the merchandise of Allah is dear and precious; behold, the merchandise of Allah is Paradise!'"
    },
    {
        level: 99,
        title: "Legendary Supreme Scholar",
        arabicTitle: "العالم الأكبر المجاهد",
        perk: "One step away from ultimate Level 100 summit",
        icon: "🌟",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9800,
        funFact: "Angels lower their wings in genuine joy and reverence for the student who travels seeking Islamic knowledge!"
    },
    {
        level: 100,
        title: "Celestial Sultan of Jannah",
        arabicTitle: "سلطان الفردوس الأعلى الأعظم",
        perk: "ALL 100 LEVELS CONQUERED! Unlocks Ultimate Sultan Jannah Crown & Eternal Badge",
        icon: "🏆",
        tier: 10,
        tierName: "Supreme Sultans of Jannah",
        tierColor: "from-yellow-400 via-amber-500 to-orange-500",
        requiredXp: 9900,
        funFact: "Jannah has 100 distinct degrees and levels! The distance between each level is like the distance between the sky and the Earth, prepared by Allah for those who strive for His pleasure!"
    }
];

export const getLevelInfo = (levelNumber: number): LevelInfo => {
    const clamped = Math.max(1, Math.min(100, levelNumber));
    return LEVELS_100[clamped - 1] || LEVELS_100[0];
};

export const getTierForLevel = (levelNumber: number): LevelTier => {
    const clamped = Math.max(1, Math.min(100, levelNumber));
    const tier = LEVEL_TIERS.find(t => clamped >= t.startLevel && clamped <= t.endLevel);
    return tier || LEVEL_TIERS[0];
};
