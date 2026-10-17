export interface DhikrItem {
    id: string;
    arabic: string;
    transliteration: string;
    englishMeaning: string;
    urduMeaning: string;
    virtue: string;
    reference: string;
    recommendedGoal: number;
    category: string;
    badgeColor: string;
}

export const dhikrList: DhikrItem[] = [
    {
        id: 'subhanallahi-wa-bihamdihi-azeem',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ',
        transliteration: 'Subḥānallāhi wa bi-ḥamdihi, Subḥānallāhil-‘Aẓīm',
        englishMeaning: 'Glory be to Allah and all praise is His; Glory be to Allah the Magnificent.',
        urduMeaning: 'اللہ پاک ہے اپنی تعریف کے ساتھ، اللہ پاک ہے جو بہت عظمت والا ہے۔',
        virtue: 'Two words that are light on the tongue, heavy on the Scale of good deeds, and beloved to Ar-Rahman (the Most Merciful).',
        reference: 'Sahih al-Bukhari (6406) & Sahih Muslim',
        recommendedGoal: 100,
        category: 'Beloved to Ar-Rahman',
        badgeColor: 'from-amber-500 to-orange-500'
    },
    {
        id: 'la-hawla-wa-la-quwwata',
        arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ',
        transliteration: 'Lā ḥawla wa lā quwwata illā billāhil-‘Aliyyil-‘Aẓīm',
        englishMeaning: 'There is no power and no strength except with Allah, the Most High, the Supreme.',
        urduMeaning: 'گناہ سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف اللہ ہی کی توفیق سے ہے۔',
        virtue: 'The Prophet (PBUH) said: "Shall I not tell you of a treasure from the treasures of Paradise (Kanzun min kunooz al-Jannah)?"',
        reference: 'Sahih al-Bukhari (4205)',
        recommendedGoal: 100,
        category: 'Treasure of Jannah',
        badgeColor: 'from-emerald-500 to-teal-600'
    },
    {
        id: 'subhanallahi-wa-bihamdihi-100',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
        transliteration: 'Subḥānallāhi wa bi-ḥamdih',
        englishMeaning: 'Glory be to Allah and all praise is due to Him.',
        urduMeaning: 'اللہ پاک ہے اور تمام تعریفیں اسی کے لیے ہیں۔',
        virtue: 'Whoever recites this 100 times in the morning and evening, their sins will be forgiven even if they were like the foam of the sea.',
        reference: 'Sahih Muslim (2691)',
        recommendedGoal: 100,
        category: 'Forgiveness of Sins',
        badgeColor: 'from-sky-500 to-blue-600'
    },
    {
        id: 'astaghfirullah-wa-atoobu-ilayh',
        arabic: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ',
        transliteration: 'Astaghfirullāhal-‘Aẓīma wa atūbu ilayh',
        englishMeaning: 'I seek the forgiveness of Allah the Magnificent and I repent unto Him.',
        urduMeaning: 'میں عظمت والے اللہ سے بخشش مانگتا ہوں اور اسی کے حضور توبہ کرتا ہوں۔',
        virtue: 'Relieves stress, opens the doors of provision (Rizq), eases hardships, and brings continuous peace into the heart.',
        reference: 'Sahih al-Bukhari (6307)',
        recommendedGoal: 100,
        category: 'Peace & Forgiveness',
        badgeColor: 'from-indigo-500 to-violet-600'
    },
    {
        id: 'dua-yunus-ayat-kareema',
        arabic: 'لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
        transliteration: 'Lā ilāha illā Anta, Subḥānaka, innī kuntu minaẓ-ẓālimīn',
        englishMeaning: 'There is no deity worthy of worship except You; Exalted are You. Indeed, I have been of the wrongdoers.',
        urduMeaning: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصوروار تھا۔',
        virtue: 'The supplication of Yunus (AS) in the belly of the whale. No Muslim ever calls upon Allah with it in distress except that Allah relieves him.',
        reference: 'Jami` at-Tirmidhi (3505) - Hasan Sahih',
        recommendedGoal: 33,
        category: 'Relief in Distress',
        badgeColor: 'from-cyan-600 to-blue-700'
    },
    {
        id: 'four-beloved-words',
        arabic: 'سُبْحَانَ اللهِ، وَالْحَمْدُ لِلهِ، وَلَا إِلٰهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ',
        transliteration: 'Subḥānallāh, wal-ḥamdu lillāh, wa lā ilāha illallāh, wallāhu akbar',
        englishMeaning: 'Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the Greatest.',
        urduMeaning: 'اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔',
        virtue: 'The four words most beloved to Allah. They cause sins to drop like leaves from autumn trees and plant trees in Jannah.',
        reference: 'Sahih Muslim (2137)',
        recommendedGoal: 33,
        category: 'Most Beloved Words',
        badgeColor: 'from-rose-500 to-pink-600'
    },
    {
        id: 'hasbunallahu-wa-nimal-wakeel',
        arabic: 'حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ',
        transliteration: 'Ḥasbunallāhu wa ni‘mal-wakīl',
        englishMeaning: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
        urduMeaning: 'ہمیں اللہ کافی ہے اور وہ کیا ہی اچھا کارساز ہے۔',
        virtue: 'Recited by Ibrahim (AS) when thrown into fire, and by the Prophet (PBUH) in trials. A supreme shield of reliance on Allah.',
        reference: 'Surah Ali ‘Imran (3:173) & Sahih al-Bukhari',
        recommendedGoal: 33,
        category: 'Unshakable Trust',
        badgeColor: 'from-amber-600 to-yellow-600'
    },
    {
        id: 'durood-sharif',
        arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
        transliteration: 'Allāhumma ṣalli ‘alā Muḥammadin wa ‘alā āli Muḥammad',
        englishMeaning: 'O Allah, send peace and blessings upon Muhammad and upon the family of Muhammad.',
        urduMeaning: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور آلِ محمد ﷺ پر۔',
        virtue: 'Whoever sends blessings upon the Prophet (PBUH) once, Allah sends 10 blessings upon him, erases 10 sins, and raises him 10 ranks.',
        reference: 'Sunan an-Nasa\'i (1297) - Sahih',
        recommendedGoal: 100,
        category: 'Immense Blessings',
        badgeColor: 'from-emerald-600 to-green-700'
    },
    {
        id: 'tahlil-ten-times',
        arabic: 'لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamdu, wa Huwa ‘alā kulli shay’in qadīr',
        englishMeaning: 'There is no god but Allah alone with no partner; to Him belongs dominion and praise, and He has power over all things.',
        urduMeaning: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کی تعریف، اور وہ ہر چیز پر قادر ہے۔',
        virtue: 'Equal to freeing 10 captives, 100 good deeds written, 100 sins erased, and serves as an impenetrable shield against Shaytan.',
        reference: 'Sahih al-Bukhari (3293)',
        recommendedGoal: 100,
        category: 'Shield from Shaytan',
        badgeColor: 'from-purple-600 to-indigo-700'
    },
    {
        id: 'sayyidul-istighfar',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عهدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
        transliteration: 'Allāhumma Anta Rabbī lā ilāha illā Anta, khalaqtanī wa anā ‘abduka, wa anā ‘alā ‘ahdika wa wa‘dika mastata‘tu',
        englishMeaning: 'O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your slave...',
        urduMeaning: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں اور تیرے عہد پر قائم ہوں۔',
        virtue: 'Sayyid al-Istighfar (The Master Supplication for Forgiveness). Recited with faith in the morning/evening promises Jannah.',
        reference: 'Sahih al-Bukhari (6306)',
        recommendedGoal: 7,
        category: 'Master of Forgiveness',
        badgeColor: 'from-rose-600 to-red-700'
    }
];

export const getDhikrOfTheDay = (date = new Date()): DhikrItem => {
    // Calculate deterministic day index based on calendar day
    const year = date.getFullYear();
    const start = new Date(year, 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = Math.abs(dayOfYear) % dhikrList.length;
    return dhikrList[index];
};

export const getTodayKey = (date = new Date()): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};
