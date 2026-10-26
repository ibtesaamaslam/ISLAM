export interface DiscoverTopic {
  id: string;
  category: string;
  categoryId: string;
  title: string;
  subtitle: string;
  tag: string;
  readingTime: string;
  badge?: string;
  arabicPhrase?: string;
  arabicTranslation?: string;
  content: string;
  keyTakeaways: string[];
  evidenceOrCitation?: string;
  iconName: string;
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface DiscoverCategory {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  iconName: string;
  count?: number;
}

export const discoverCategories: DiscoverCategory[] = [
  { 
    id: 'five_pillars', 
    name: 'The 5 Pillars', 
    subtitle: 'Just like a house needs strong pillars to stand, Islam is built on 5 beautiful actions! 🏠', 
    description: 'The five mandatory acts of worship that form the bedrock of a Muslim\'s life and connection with Allah', 
    iconName: 'Star' 
  },
  { 
    id: 'articles_faith', 
    name: 'Articles of Faith', 
    subtitle: 'The 6 foundational pillars of pure belief residing within the heart of every believer! ❤️', 
    description: 'Belief in Allah, His Angels, Revealed Books, Messengers, the Last Day, and Divine Destiny', 
    iconName: 'Heart' 
  },
  { 
    id: 'foundations', 
    name: 'Foundations of Faith', 
    subtitle: 'Essential theological pillars, Tawheed, divine oneness, and sacred purpose.', 
    description: 'Essential theological pillars, Tawheed, angels, divine books, and destiny', 
    iconName: 'Heart' 
  },
  { 
    id: 'pillars_action', 
    name: 'Pillars of Action', 
    subtitle: 'Transforming spiritual devotion into living daily deeds and righteous practices! ☀️', 
    description: 'Dhikr, ethical livelihood, supplication, Friday assembly, and community charity', 
    iconName: 'Sun' 
  },
  { 
    id: 'living_islam', 
    name: 'Living Islam', 
    subtitle: 'Walking in the footsteps of the Prophet ﷺ with compassion, gratitude, and good character. 🌿', 
    description: 'Kindness to parents, honoring neighbors, environmental stewardship, and mindfulness', 
    iconName: 'Leaf' 
  },
  { 
    id: 'personal_growth', 
    name: 'Personal Growth', 
    subtitle: 'Purifying the inner soul, emotional resilience, overcoming anxiety, and moral elevation. ✨', 
    description: 'Patience, gratitude, emotional mastery, humility, and spiritual purification (Tazkiyah)', 
    iconName: 'Sparkles' 
  },
  { 
    id: 'community_society', 
    name: 'Community & Society', 
    subtitle: 'Human equality, anti-racism, justice without bias, and uplifting the vulnerable. 🌍', 
    description: 'Human dignity, knowledge, environmental care, mental tranquility, and community compassion', 
    iconName: 'Globe' 
  },
  { 
    id: 'science', 
    name: 'Islam & Science', 
    subtitle: 'Cosmology, embryology, oceanography, geology, and atmospheric harmony in divine revelation. 🔬', 
    description: 'Cosmology, embryology, oceanography, geology, and atmospheric harmony in revelation', 
    iconName: 'Atom' 
  },
  { 
    id: 'pioneers', 
    name: 'Golden Age Pioneers', 
    subtitle: 'Muslim scientists, doctors, mathematicians, and scholars who transformed human civilization. 🚀', 
    description: 'Muslim scientists, doctors, mathematicians, and scholars who transformed human civilization', 
    iconName: 'GraduationCap' 
  },
  { 
    id: 'prophets', 
    name: 'Prophets of Allah', 
    subtitle: 'The blessed chain of divine guidance from Adam to Muhammad (peace be upon them). 📜', 
    description: 'The blessed chain of divine guidance from Adam to Muhammad (peace be upon them)', 
    iconName: 'Users' 
  },
  { 
    id: 'companions', 
    name: 'Noble Companions', 
    subtitle: 'The righteous generation who preserved the faith, their leadership, virtues, and sacrifices. 🛡️', 
    description: 'The righteous generation who preserved the faith, their leadership, virtues, and sacrifices', 
    iconName: 'Shield' 
  },
  { 
    id: 'ethics', 
    name: 'Moral Ethics', 
    subtitle: 'Spiritual excellence (Ihsan), patience, humility, family kinship, and good character. 🤝', 
    description: 'Spiritual excellence (Ihsan), patience, humility, family kinship, and good character', 
    iconName: 'HeartHandshake' 
  },
];

export const discoverTopics: DiscoverTopic[] = [
  // ==========================================
  // THE 5 PILLARS (Matching Screenshot Exact Text)
  // ==========================================
  {
    id: 'pillar-shahada',
    category: 'The 5 Pillars',
    categoryId: 'five_pillars',
    title: 'Shahada',
    subtitle: "The declaration of faith: 'There is no god but Allah, and Muhammad is the Messenger of Allah.' It is the key to entering Islam.",
    tag: 'FAITH',
    readingTime: '2 min',
    badge: 'Pillar 1',
    arabicPhrase: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    arabicTranslation: 'There is no deity worthy of worship except Allah, and Muhammad is the Messenger of Allah.',
    content: 'This simple statement is the foundation of all Islamic beliefs. It affirms Monotheism (Tawhid) and the Prophethood of Muhammad (PBUH).',
    keyTakeaways: [
      'The sacred key to entering the peaceful fold of Islam',
      'Affirms pure monotheism: God has no partners or equals',
      'Accepts Prophet Muhammad (PBUH) as the final moral guide'
    ],
    evidenceOrCitation: 'Quran 47:19: "Know therefore that there is no god but Allah."',
    iconName: 'Heart',
    quiz: {
      question: 'What does the Shahada affirm?',
      options: ['Fasting and prayer', 'The Oneness of God and Prophethood of Muhammad (PBUH)', 'Charity and pilgrimage', 'Reading scriptures only'],
      correct: 1,
      explanation: 'The Shahada affirms pure Tawheed and the final messengership of Prophet Muhammad (PBUH).'
    }
  },
  {
    id: 'pillar-salah',
    category: 'The 5 Pillars',
    categoryId: 'five_pillars',
    title: 'Salah',
    subtitle: 'Performing the five daily prayers to maintain a spiritual connection with God.',
    tag: 'PRAYER',
    readingTime: '3 min',
    badge: 'Pillar 2',
    arabicPhrase: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ',
    arabicTranslation: 'Maintain with care the prayers and especially the middle prayer.',
    content: 'Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), and Isha (Night). Prayer keeps us grounded and grateful.',
    keyTakeaways: [
      'Five daily appointments with your Creator to renew inner peace',
      'Purifies sins like a flowing river outside one’s door',
      'Unifies the community in straight, equal ranks of worship'
    ],
    evidenceOrCitation: 'Quran 29:45: "Indeed, prayer prohibits immorality and wrongdoing."',
    iconName: 'Sun',
    quiz: {
      question: 'How many obligatory daily prayers are performed in Islam?',
      options: ['3', '5', '7', '10'],
      correct: 1,
      explanation: 'Muslims perform 5 daily obligatory prayers from dawn to night.'
    }
  },
  {
    id: 'pillar-zakat',
    category: 'The 5 Pillars',
    categoryId: 'five_pillars',
    title: 'Zakat',
    subtitle: "Giving a portion of one's wealth to help those in need and purify one's soul.",
    tag: 'CHARITY',
    readingTime: '2 min',
    badge: 'Pillar 3',
    arabicPhrase: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
    arabicTranslation: 'And establish prayer and give Zakat.',
    content: 'Muslims who have enough savings give 2.5% each year to support the poor, orphans, and community. It teaches generosity and fairness.',
    keyTakeaways: [
      'Purifies wealth and shields against greed and selfishness',
      'Eliminates poverty and protects the rights of vulnerable people',
      'Given voluntarily from surplus wealth accumulated over one full year'
    ],
    evidenceOrCitation: 'Quran 9:103: "Take from their wealth a charity by which you purify them."',
    iconName: 'Coins',
    quiz: {
      question: 'What standard percentage of qualifying wealth is given for annual Zakat?',
      options: ['1%', '2.5%', '5%', '10%'],
      correct: 1,
      explanation: 'The annual Zakat rate on eligible accumulated surplus wealth is 2.5%.'
    }
  },
  {
    id: 'pillar-sawm',
    category: 'The 5 Pillars',
    categoryId: 'five_pillars',
    title: 'Sawm',
    subtitle: 'Fasting from dawn to sunset during the blessed holy month of Ramadan.',
    tag: 'FASTING',
    readingTime: '3 min',
    badge: 'Pillar 4',
    arabicPhrase: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ',
    arabicTranslation: 'O you who have believed, decreed upon you is fasting.',
    content: 'Fasting teaches self-discipline, patience, empathy for the hungry, and deep gratitude for the blessings we take for granted.',
    keyTakeaways: [
      'Cultivates self-control over bodily desires and impulses',
      'Awakens deep compassion for those experiencing poverty and hunger',
      'Brings immense spiritual reward and forgiveness of past sins'
    ],
    evidenceOrCitation: 'Quran 2:183: "Fasting is prescribed for you so that you may become mindful of God."',
    iconName: 'Moon',
    quiz: {
      question: 'During which Islamic month do Muslims observe the daily fast?',
      options: ['Shawwal', 'Ramadan', 'Dhul Hijjah', 'Muharram'],
      correct: 1,
      explanation: 'Sawm is observed throughout the blessed holy month of Ramadan.'
    }
  },
  {
    id: 'pillar-hajj',
    category: 'The 5 Pillars',
    categoryId: 'five_pillars',
    title: 'Hajj',
    subtitle: 'The pilgrimage to Makkah once in a lifetime for those who are physically and financially able.',
    tag: 'PILGRIMAGE',
    readingTime: '3 min',
    badge: 'Pillar 5',
    arabicPhrase: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
    arabicTranslation: 'And pilgrimage to the House is a duty unto Allah for all who can make their way there.',
    content: 'Over 2 million Muslims from all races and countries gather in unity, wearing simple white garments showing that all humans are equal before God.',
    keyTakeaways: [
      'The largest annual peaceful human gathering on earth',
      'Universal brotherhood with zero discrimination by race or status',
      'Commemorates the sacrifices of Prophet Ibrahim, Hajar, and Ismail'
    ],
    evidenceOrCitation: 'Quran 22:27: "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel."',
    iconName: 'Compass',
    quiz: {
      question: 'Where is the annual pilgrimage of Hajj performed?',
      options: ['Madinah', 'Makkah', 'Jerusalem', 'Cairo'],
      correct: 1,
      explanation: 'Hajj is performed in the holy city of Makkah and surrounding plains like Arafat.'
    }
  },

  // ==========================================
  // ARTICLES OF FAITH (6 Pillars of Iman)
  // ==========================================
  {
    id: 'article-allah',
    category: 'Articles of Faith',
    categoryId: 'articles_faith',
    title: 'Belief in Allah',
    subtitle: 'Believing in the One and Only Creator of the Universe.',
    tag: 'ONENESS',
    readingTime: '2 min',
    badge: 'Article 1',
    arabicPhrase: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    arabicTranslation: 'Say, He is Allah, the One.',
    content: 'Allah is the Creator and Sustainer of everything. He has no partners, parents, or children, and nothing compares to Him.',
    keyTakeaways: ['Strict absolute monotheism', 'The Sole Sustainer of all existence', 'Infinite in Mercy and Wisdom'],
    evidenceOrCitation: 'Surah Al-Ikhlas (112:1-4)',
    iconName: 'Target',
    quiz: {
      question: 'What is the core meaning of Tawheed?',
      options: ['Worshiping multiple beings', 'The absolute Oneness of God', 'Fasting twice a week', 'Building mosques'],
      correct: 1,
      explanation: 'Tawheed represents the pure Oneness of Allah.'
    }
  },
  {
    id: 'article-angels',
    category: 'Articles of Faith',
    categoryId: 'articles_faith',
    title: 'Belief in the Angels',
    subtitle: 'Believing in God’s honorable messengers of light.',
    tag: 'LIGHT',
    readingTime: '2 min',
    badge: 'Article 2',
    content: 'Angels are noble spiritual beings created from light who carry out God\'s commands, including Angel Jibril (Gabriel) who brought revelation.',
    keyTakeaways: ['Created from light', 'Flawless obedience to divine commands', 'Record human deeds and protect souls'],
    evidenceOrCitation: 'Quran 2:285: "All of them have believed in Allah and His angels."',
    iconName: 'Sparkles',
    quiz: {
      question: 'Which angel brought divine revelation to the prophets?',
      options: ['Mika\'il', 'Jibril (Gabriel)', 'Israfil', 'Malik'],
      correct: 1,
      explanation: 'Angel Jibril (Gabriel) conveyed revelation to the prophets.'
    }
  },
  {
    id: 'article-books',
    category: 'Articles of Faith',
    categoryId: 'articles_faith',
    title: 'Belief in Divine Revelations',
    subtitle: 'Believing in the divine scriptures revealed to the prophets.',
    tag: 'REVELATION',
    readingTime: '2 min',
    badge: 'Article 3',
    content: 'Muslims believe in the original scriptures including the Torah, Psalms, Gospel, and the final preserved Quran.',
    keyTakeaways: ['Guidance through inspired scripture', 'Quran as the preserved final testament', 'Reverence for all divine messages'],
    evidenceOrCitation: 'Quran 2:136: "We believe in Allah and what has been revealed to us."',
    iconName: 'BookOpen',
    quiz: {
      question: 'What is the final revelation sent to mankind?',
      options: ['Torah', 'Gospel', 'The Holy Quran', 'Psalms'],
      correct: 2,
      explanation: 'The Holy Quran is the final, fully preserved scripture sent to mankind.'
    }
  },
  {
    id: 'article-prophets',
    category: 'Articles of Faith',
    categoryId: 'articles_faith',
    title: 'Belief in the Prophets',
    subtitle: 'Believing in all messengers sent to guide humanity.',
    tag: 'MESSENGERS',
    readingTime: '2 min',
    badge: 'Article 4',
    content: 'From Adam, Noah, Abraham, Moses, and Jesus to the final Messenger Muhammad (peace be upon them all).',
    keyTakeaways: ['One chain of moral exemplars', 'Universal divine message of monotheism', 'Prophet Muhammad ﷺ as the final seal'],
    evidenceOrCitation: 'Quran 33:40: "He is the Messenger of Allah and Seal of the prophets."',
    iconName: 'Users',
    quiz: {
      question: 'Who is considered the first prophet in human history according to Islam?',
      options: ['Ibrahim', 'Adam', 'Musa', 'Nuh'],
      correct: 1,
      explanation: 'Prophet Adam (peace be upon him) was the first human and first prophet.'
    }
  },
  {
    id: 'article-judgment',
    category: 'Articles of Faith',
    categoryId: 'articles_faith',
    title: 'Belief in the Day of Judgment',
    subtitle: 'Believing in the day when all souls are held accountable with perfect justice.',
    tag: 'JUSTICE',
    readingTime: '2 min',
    badge: 'Article 5',
    content: 'A day where every deed, large or small, will be weighed, and righteous deeds will be eternally rewarded.',
    keyTakeaways: ['Ultimate moral accountability', 'Resurrection and eternal life', 'Every atom\'s weight of good is recognized'],
    evidenceOrCitation: 'Quran 99:7-8: "So whoever does an atom\'s weight of good will see it."',
    iconName: 'Scale',
    quiz: {
      question: 'What provides comfort regarding the Day of Judgment for the oppressed?',
      options: ['Material wealth', 'Absolute divine justice where no wrong goes unaddressed', 'Forgetfulness', 'Worldly fame'],
      correct: 1,
      explanation: 'The Day of Judgment guarantees complete, impartial divine justice for every soul.'
    }
  },
  {
    id: 'article-qadar',
    category: 'Articles of Faith',
    categoryId: 'articles_faith',
    title: 'Belief in Divine Destiny (Al-Qadr)',
    subtitle: 'Believing in God’s supreme wisdom, knowledge, and sovereign plan.',
    tag: 'DESTINY',
    readingTime: '2 min',
    badge: 'Article 6',
    content: 'Everything happens within Allah\'s wisdom, giving the believer tranquility in adversity and grateful humility in joy.',
    keyTakeaways: ['Supreme divine knowledge and decree', 'Humans possess free will and moral responsibility', 'Provides unshakable resilience during hardship'],
    evidenceOrCitation: 'Quran 54:49: "Indeed, all things We created with predestination."',
    iconName: 'Compass',
    quiz: {
      question: 'How does belief in Qadr empower a believer?',
      options: ['Causes laziness', 'Grants peace of mind and resilience during tests', 'Allows blaming others', 'Guarantees immediate wealth'],
      correct: 1,
      explanation: 'Belief in Qadr brings deep emotional peace knowing Allah\'s wisdom encompasses all outcomes.'
    }
  },

  // ==========================================
  // PILLARS OF ACTION (Action in Daily Life)
  // ==========================================
  {
    id: 'action-dhikr',
    category: 'Pillars of Action',
    categoryId: 'pillars_action',
    title: 'Daily Dhikr (Remembrance)',
    subtitle: 'Keeping the heart perpetually connected with the Creator.',
    tag: 'DEVOTION',
    readingTime: '2 min',
    content: 'Repeating words of praise like SubhanAllah, Alhamdulillah, and Allahu Akbar brings serenity to restless hearts.',
    keyTakeaways: ['Protects against anxiety and stress', 'Light on the tongue, heavy in divine scales', 'Can be performed anywhere and anytime'],
    evidenceOrCitation: 'Quran 13:28: "Unquestionably, by the remembrance of Allah hearts are assured."',
    iconName: 'Heart',
    quiz: {
      question: 'What does the Quran state about hearts that remember Allah?',
      options: ['They become tired', 'They find rest and peace', 'They lose memory', 'They turn cold'],
      correct: 1,
      explanation: 'The Quran affirms that remembrance of Allah brings true inner peace to the heart.'
    }
  },
  {
    id: 'action-halal-earning',
    category: 'Pillars of Action',
    categoryId: 'pillars_action',
    title: 'Honest Livelihood & Halal Earning',
    subtitle: 'Transforming work into worship through ethics.',
    tag: 'INTEGRITY',
    readingTime: '2 min',
    content: 'Earning an honest income without cheating, interest, or deceit elevates daily work into an act of worship.',
    keyTakeaways: ['Pure sustenance brings blessings to the home', 'Work done with excellence (Itqan) is beloved to God', 'Fair treatment of employees and clients'],
    evidenceOrCitation: 'Hadith: "The truthful, trustworthy merchant is with the prophets and martyrs."',
    iconName: 'Coins',
    quiz: {
      question: 'What status is promised to the honest merchant in Hadith?',
      options: ['Ranked with kings', 'Ranked with prophets and martyrs', 'Exempted from prayer', 'Never tested'],
      correct: 1,
      explanation: 'The truthful, honest trader is granted noble status alongside prophets and the righteous.'
    }
  },
  {
    id: 'action-sadaqah',
    category: 'Pillars of Action',
    categoryId: 'pillars_action',
    title: 'Sadaqah (Voluntary Charity)',
    subtitle: 'Spreading warmth through unconditional generosity.',
    tag: 'KINDNESS',
    readingTime: '2 min',
    content: 'Charity in Islam is not limited to money: even a warm smile, removing a harmful object from a pathway, or comforting someone is Sadaqah.',
    keyTakeaways: ['Accessible to every person regardless of wealth', 'Extinguishes mistakes like water extinguishes fire', 'Continuous charity (Sadaqah Jariyah) rewards even after passing'],
    evidenceOrCitation: 'Hadith: "Every act of kindness is charity (Sadaqah)." (Bukhari)',
    iconName: 'Heart',
    quiz: {
      question: 'According to the Prophet ﷺ, is smiling at your brother considered charity?',
      options: ['No, only money counts', 'Yes, it is Sadaqah', 'Only if accompanied by gifts', 'Only on Fridays'],
      correct: 1,
      explanation: 'The Prophet ﷺ taught that smiling at your fellow human being is an act of charity (Sadaqah).'
    }
  },

  // ==========================================
  // LIVING ISLAM (Everyday Ethics)
  // ==========================================
  {
    id: 'living-parents',
    category: 'Living Islam',
    categoryId: 'living_islam',
    title: 'Honoring Parents (Birr al-Walidayn)',
    subtitle: 'The second highest duty after worshiping Allah.',
    tag: 'FAMILY',
    readingTime: '2 min',
    content: 'Serving parents with gentle speech, humility, and unconditional kindness opens the highest gates of Paradise.',
    keyTakeaways: ['Mother is honored three times before the father in companions’ advice', 'Never say even a word of disrespect (uff)', 'Pray for their mercy throughout life and after'],
    evidenceOrCitation: 'Quran 17:23: "And lower to them the wing of humility out of mercy."',
    iconName: 'Heart',
    quiz: {
      question: 'How many times did the Prophet ﷺ emphasize honoring the mother when asked who deserves best companionship?',
      options: ['Once', 'Twice', 'Three times', 'Four times'],
      correct: 2,
      explanation: 'The Prophet ﷺ said "Your mother" three times before mentioning "Your father".'
    }
  },
  {
    id: 'living-neighbors',
    category: 'Living Islam',
    categoryId: 'living_islam',
    title: 'Caring for Neighbors',
    subtitle: 'The universal golden rule of neighborhood empathy.',
    tag: 'SOCIETY',
    readingTime: '2 min',
    content: 'A believer cannot sleep with a full stomach while their neighbor goes hungry. Neighbors of all backgrounds hold sacred rights to safety and care.',
    keyTakeaways: ['Angel Jibril advised kindness to neighbors so often the Prophet thought they would inherit', 'Includes non-Muslim neighbors and strangers', 'Sharing food, greeting warmly, and preserving privacy'],
    evidenceOrCitation: 'Hadith: "He is not a believer whose neighbor is not safe from his harm." (Bukhari)',
    iconName: 'Globe',
    quiz: {
      question: 'What is a core condition of genuine faith regarding neighbors in Islam?',
      options: ['Only helping relatives', 'Ensuring the neighbor is safe from harm and not sleeping hungry', 'Never talking to neighbors', 'Trading only with them'],
      correct: 1,
      explanation: 'Prophet Muhammad ﷺ emphasized that a believer must never allow their neighbor to feel unsafe or hungry.'
    }
  },
  {
    id: 'living-environment',
    category: 'Living Islam',
    categoryId: 'living_islam',
    title: 'Stewardship of Nature (Khilafah)',
    subtitle: 'Protecting the earth, water, and animals as a sacred trust.',
    tag: 'NATURE',
    readingTime: '2 min',
    content: 'Humans are appointed caretakers of the earth. Wasting water even at a flowing stream is forbidden, and planting a tree brings reward until the end of time.',
    keyTakeaways: ['Planting trees is an enduring charity (Sadaqah Jariyah)', 'Animals possess rights to gentle care and nourishment', 'Wastefulness (Israf) is explicitly censured in the Quran'],
    evidenceOrCitation: 'Hadith: "If the Final Hour arrives while one of you holds a sapling, let him plant it." (Ahmad)',
    iconName: 'Leaf',
    quiz: {
      question: 'What did the Prophet ﷺ command even if the Final Hour (Doomsday) were occurring?',
      options: ['Run away', 'Plant a sapling if it is in your hand', 'Hide wealth', 'Stop all actions'],
      correct: 1,
      explanation: 'The Prophet ﷺ commanded planting a sapling even at the dawn of the Final Hour, proving life-affirming environmental devotion.'
    }
  },

  // ==========================================
  // PERSONAL GROWTH (Inner Peace & Character)
  // ==========================================
  {
    id: 'growth-sabr',
    category: 'Personal Growth',
    categoryId: 'personal_growth',
    title: 'Patience & Resilience (Sabr)',
    subtitle: 'Navigating tests with quiet strength and hope.',
    tag: 'RESILIENCE',
    readingTime: '2 min',
    content: 'Sabr is not passive suffering; it is active emotional fortitude, keeping composure during trials and trusting that relief always follows hardship.',
    keyTakeaways: ['True patience is demonstrated at the first stroke of calamity', 'Allah is with the patient (Ma\'a as-Sabireen)', 'No hardship strikes a believer without sins being erased'],
    evidenceOrCitation: 'Quran 94:5-6: "Indeed, with hardship comes ease."',
    iconName: 'Shield',
    quiz: {
      question: 'What does the Quran promise alongside every difficulty?',
      options: ['Despair', 'Ease and relief', 'Prolonged suffering', 'Isolation'],
      correct: 1,
      explanation: 'Surah Ash-Sharh explicitly promises: "Indeed, with hardship comes ease."'
    }
  },
  {
    id: 'growth-shukr',
    category: 'Personal Growth',
    categoryId: 'personal_growth',
    title: 'Gratitude & Abundance (Shukr)',
    subtitle: 'Multiplying joy through conscious appreciation.',
    tag: 'GRATITUDE',
    readingTime: '2 min',
    content: 'Recognizing blessings—from clean air to good health—transforms psychology from lack into abundance. Allah promises to increase those who are grateful.',
    keyTakeaways: ['Looking at those with less in worldly matters to preserve gratitude', 'Thanking people is part of thanking God', 'Gratitude preserves current blessings and invites more'],
    evidenceOrCitation: 'Quran 14:7: "If you are grateful, I will surely increase you in favor."',
    iconName: 'Sun',
    quiz: {
      question: 'What does Allah promise to those who practice gratitude (Shukr)?',
      options: ['He will test them harder', 'He will surely increase them in blessings', 'Nothing changes', 'Only wealth in the hereafter'],
      correct: 1,
      explanation: 'Surah Ibrahim 14:7 states: "If you are grateful, I will surely increase you."'
    }
  },
  {
    id: 'growth-anger-mastery',
    category: 'Personal Growth',
    categoryId: 'personal_growth',
    title: 'Emotional Mastery & Forgiveness',
    subtitle: 'True strength is mastering the self in anger.',
    tag: 'MINDFULNESS',
    readingTime: '2 min',
    content: 'The strong person is not the one who can wrestle another down; the strong person is the one who controls themselves when angry and responds with forgiveness.',
    keyTakeaways: ['Changing physical posture or performing ablution when angry', 'Forgiveness elevates the status and dignity of the believer', 'Replacing retaliation with dignified patience'],
    evidenceOrCitation: 'Hadith: "The strong is not the one who overcomes people; the strong is the one who controls himself in anger." (Bukhari)',
    iconName: 'Heart',
    quiz: {
      question: 'Who is defined as truly strong according to Prophet Muhammad ﷺ?',
      options: ['The physically heaviest person', 'The one who controls himself when angry', 'The one who speaks loudest', 'The undefeated wrestler'],
      correct: 1,
      explanation: 'The Prophet ﷺ taught that true courage is emotional self-control when provoked.'
    }
  },
  // ==========================================
  // CATEGORY 1: FOUNDATIONS OF FAITH (12)
  // ==========================================
  {
    id: 'shahada',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'The Shahada (Declaration of Faith)',
    subtitle: 'The Gateway to Islamic Monotheism',
    tag: 'Core Creed',
    readingTime: '2 min',
    badge: 'Essential Pillar',
    arabicPhrase: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَّسُولُ ٱللَّٰهِ',
    arabicTranslation: 'There is no god worthy of worship except Allah, and Muhammad is the Messenger of Allah.',
    content: 'The Shahada is the foundational declaration of Islam. Sincere belief in these words brings an individual into the fold of Islam. It encapsulates two indivisible realities: pure monotheism (negating any partners, idols, or intermediaries before the Creator) and the acceptance of Prophet Muhammad ﷺ as the final moral and spiritual guide for humanity.',
    keyTakeaways: [
      'Negates all false deities, superstitious worship, and intermediaries',
      'Affirms complete devotion to Allah alone as Creator and Sovereign',
      'Acknowledges Prophet Muhammad ﷺ as the exemplar and final messenger'
    ],
    evidenceOrCitation: 'Quran 47:19: "Know therefore that there is no god but Allah."',
    iconName: 'Fingerprint',
    quiz: {
      question: 'What are the two core parts affirmed in the Shahada?',
      options: ['Belief in angels and fasting', 'Oneness of God and Prophethood of Muhammad', 'Prayer and Charity', 'Pilgrimage and Scripture'],
      correct: 1,
      explanation: 'The Shahada affirms Tawheed (the absolute oneness of Allah) and Risalah (the prophethood of Muhammad ﷺ).'
    }
  },
  {
    id: 'tawheed-essence',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'Tawheed: The Absolute Oneness of God',
    subtitle: 'The Central Axis of Islamic Theology',
    tag: 'Monotheism',
    readingTime: '3 min',
    badge: 'Fundamental',
    arabicPhrase: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    arabicTranslation: 'Say, "He is Allah, [who is] One."',
    content: 'Tawheed is the conceptual core of Islam. It states that God is singularly unique, eternal, self-sufficient, and entirely unbegotten. He has no parents, no offspring, and no equals. Tawheed frees the human conscience from subservience to worldly masters, wealth, tyranny, and ego, anchoring the soul in reverent connection with the singular Creator.',
    keyTakeaways: [
      'Purest form of strict monotheism in human religious history',
      'Surah Al-Ikhlas is celebrated as equal to one-third of the Quran in meaning',
      'Frees humanity from all forms of superstition and polytheism'
    ],
    evidenceOrCitation: 'Surah Al-Ikhlas (112:1-4): "Say: He is Allah, the One; Allah the Eternal; He begets not nor was He begotten; and there is none equal to Him."',
    iconName: 'Target',
    quiz: {
      question: 'Which chapter of the Quran is considered equivalent to one-third of the Quran due to its pure focus on Tawheed?',
      options: ['Surah Al-Baqarah', 'Surah Al-Fatiha', 'Surah Al-Ikhlas', 'Surah Ya-Sin'],
      correct: 2,
      explanation: 'Surah Al-Ikhlas (Chapter 112) summarizes the absolute oneness and transcendence of God.'
    }
  },
  {
    id: 'tawheed-ruboobiyyah',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'Tawheed ar-Ruboobiyyah',
    subtitle: 'Oneness in Lordship & Creation',
    tag: 'Theology',
    readingTime: '2 min',
    content: 'Tawheed ar-Ruboobiyyah is the belief that Allah alone is the Lord, the Creator, the Sustainer, and the Sovereign Ruler of the entire universe. Not a single atom moves, not a raindrop falls, and not a star ignites without His divine decree and active will.',
    keyTakeaways: [
      'God alone created everything out of nothingness',
      'He continuously sustains and nurtures every living organism',
      'All provisions, life, and death are entirely in His hands'
    ],
    evidenceOrCitation: 'Surah Az-Zumar (39:62): "Allah is the Creator of all things, and He is, over all things, Disposer of affairs."',
    iconName: 'Sun',
    quiz: {
      question: 'What does Tawheed ar-Ruboobiyyah specifically denote?',
      options: ['Oneness in worship', 'Oneness in Lordship, Creation, and Sustenance', 'Oneness of human communities', 'Singularity of prayer times'],
      correct: 1,
      explanation: 'Ruboobiyyah refers to Allah being the sole Rabb (Lord, Creator, Master, and Sustainer) of existence.'
    }
  },
  {
    id: 'tawheed-uloohiyyah',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'Tawheed al-Uloohiyyah',
    subtitle: 'Exclusivity of Worship',
    tag: 'Devotion',
    readingTime: '2 min',
    content: 'While Ruboobiyyah recognizes God as Creator, Tawheed al-Uloohiyyah directs all acts of devotion—prayer, supplication (Dua), sacrifice, trust (Tawakkul), and hope—exclusively to Him. Seeking spiritual salvation or dedicating sacred rites to saints, idols, or graves contradicts this foundation.',
    keyTakeaways: [
      'Direct spiritual relationship with the Creator without priesthood or middle-men',
      'All supplications (Dua) are addressed straight to Allah',
      'The purpose for which all prophets were sent across human history'
    ],
    evidenceOrCitation: 'Surah Al-Fatiha (1:5): "You alone we worship, and You alone we ask for help."',
    iconName: 'Compass',
    quiz: {
      question: 'To whom should supplications (Dua) and prayers be exclusively directed in Islam?',
      options: ['Only to Allah directly', 'Through ancestral spirits', 'Through specialized clergy', 'To planetary constellations'],
      correct: 0,
      explanation: 'Islam mandates direct worship of Allah without any intermediaries, saints, or clergy.'
    }
  },
  {
    id: 'divine-names-attributes',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'Asma al-Husna (The 99 Beautiful Names)',
    subtitle: 'Knowing the Divine Attributes',
    tag: 'Divine Names',
    readingTime: '3 min',
    arabicPhrase: 'وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا',
    arabicTranslation: 'And to Allah belong the best names, so invoke Him by them.',
    content: 'Allah possesses supreme and beautiful attributes that reveal His mercy, wisdom, justice, and majesty. From Ar-Rahman (The Infinitely Merciful) to Al-Adl (The Perfectly Just) and Al-Hakim (The All-Wise), knowing these names inspires love, awe, and emulation of noble qualities like mercy and generosity in human life.',
    keyTakeaways: [
      'Prophet Muhammad ﷺ mentioned 99 distinct names of transcendent perfection',
      'Understanding them deepens inner tranquility and closeness in prayer',
      'Believers invoke specific names according to their daily circumstances'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: "Allah has ninety-nine names; whoever memorizes and acts upon them will enter Paradise."',
    iconName: 'Sparkles',
    quiz: {
      question: 'What is the primary meaning of the divine name "Ar-Rahman"?',
      options: ['The All-Mighty', 'The Infinitely Merciful', 'The Reckoner', 'The Ever-Watching'],
      correct: 1,
      explanation: 'Ar-Rahman signifies the Boundless, All-Encompassing Mercy of Allah upon all creation.'
    }
  },
  {
    id: 'belief-in-angels',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'Belief in the Angels (Mala’ikah)',
    subtitle: 'Celestial Servants of Divine Will',
    tag: 'Unseen World',
    readingTime: '2 min',
    content: 'Angels are noble, sinless beings created by Allah from pure light. Unlike humans and jinn, they do not possess free will to disobey God; they execute His commands flawlessly. Key angels include Jibril (Gabriel, the angel of divine revelation), Mika’il (Michael, responsible for rain and nourishment), and Israfil (who will blow the Horn to herald the Day of Resurrection).',
    keyTakeaways: [
      'Created from light with immense power and purity',
      'Every human has guardian and recording angels (Kiram Katibin) documenting deeds',
      'Instills a conscious awareness of moral accountability and divine order'
    ],
    evidenceOrCitation: 'Surah At-Tahrim (66:6): "They do not disobey Allah in what He commands them but do what they are commanded."',
    iconName: 'Cloud',
    quiz: {
      question: 'Which archangel was tasked with delivering the divine revelations to the prophets?',
      options: ['Mika’il (Michael)', 'Jibril (Gabriel)', 'Israfil (Raphael)', 'Azra’il (Malak al-Mawt)'],
      correct: 1,
      explanation: 'Archangel Jibril (Gabriel) brought the revelations of God to all prophets, including the Quran to Muhammad ﷺ.'
    }
  },
  {
    id: 'divine-scriptures',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'The Divine Scriptures',
    subtitle: 'From the Scrolls of Abraham to the Quran',
    tag: 'Revelation',
    readingTime: '3 min',
    content: 'Muslims believe that Allah sent guidance through scriptures to various messengers, including the Suhuf (Scrolls) to Ibrahim, the Tawrat (Torah) to Musa, the Zabur (Psalms) to Dawud, and the Injeel (Gospel) to Isa. The Holy Quran was revealed to Prophet Muhammad ﷺ as the final, universally preserved, and uncorrupted testament for all mankind.',
    keyTakeaways: [
      'Affirms the divine origin of earlier Abrahamic revelations in their pristine form',
      'The Quran remains verbatim identical to its original 7th-century revelation',
      'Memorized cover-to-cover by millions of Muslims (Huffadh) globally'
    ],
    evidenceOrCitation: 'Surah Al-Hijr (15:9): "Indeed, it is We who sent down the Quran and indeed, We will be its guardian."',
    iconName: 'BookOpen',
    quiz: {
      question: 'Which scripture was given to Prophet Dawud (David)?',
      options: ['The Torah', 'The Psalms (Zabur)', 'The Gospel', 'The Scrolls of Abraham'],
      correct: 1,
      explanation: 'Prophet Dawud was gifted the Zabur (Psalms), noted for its beautiful devotional hymns to God.'
    }
  },
  {
    id: 'prophets-messengers',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'The Universal Chain of Prophethood',
    subtitle: 'One Brotherhood of Teachers',
    tag: 'Prophethood',
    readingTime: '3 min',
    content: 'God never left any nation or civilization without guidance. Over human history, approximately 124,000 prophets were sent across every land to call people to moral integrity and monotheism. Twenty-five are explicitly mentioned by name in the Quran. Prophet Muhammad ﷺ is the final brick in this majestic prophetic edifice.',
    keyTakeaways: [
      'Prophets were mortal men chosen for their immaculate character and truthfulness',
      'All prophets preached the identical core message: worship God alone and do good',
      'Muslims honor and love every prophet equally without discrimination'
    ],
    evidenceOrCitation: 'Surah Fatir (35:24): "And there was no nation but that there had passed within it a warner."',
    iconName: 'Users',
    quiz: {
      question: 'How many prophets are explicitly named in the Quran?',
      options: ['12', '25', '70', '99'],
      correct: 1,
      explanation: '25 distinct prophets are specifically mentioned by name within the text of the Holy Quran.'
    }
  },
  {
    id: 'day-of-judgment',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'The Day of Judgment (Yawm al-Qiyamah)',
    subtitle: 'Ultimate Justice & Eternal Accountability',
    tag: 'Afterlife',
    readingTime: '3 min',
    content: 'Earthly life is not the final chapter of existence; it is an ephemeral moral examination. On the Day of Judgment, every soul will be resurrected, and divine justice will be flawlessly executed. Even an atom’s weight of good or ill will be weighed. The righteous will inherit eternal bliss in Paradise (Jannah), while those who chose tyranny and disbelief will face justice.',
    keyTakeaways: [
      'Gives ultimate purpose and moral accountability to human conscience',
      'Assures the oppressed that no tyrant escapes justice in the grand scheme',
      'Paradise (Jannah) offers peace, joy, and spiritual fulfillment beyond human imagination'
    ],
    evidenceOrCitation: 'Surah Al-Zalzalah (99:7-8): "So whoever does an atom\'s weight of good will see it, and whoever does an atom\'s weight of evil will see it."',
    iconName: 'Scale',
    quiz: {
      question: 'What is the significance of the "Meezan" on the Day of Judgment?',
      options: ['A celestial ship', 'The divine scales that weigh deeds with perfect accuracy', 'The wall between nations', 'The royal throne of kings'],
      correct: 1,
      explanation: 'The Meezan is the divine balance of absolute justice upon which human deeds and intentions are weighed.'
    }
  },
  {
    id: 'divine-destiny-qadr',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'Al-Qadr (Divine Destiny & Free Will)',
    subtitle: 'God’s Infinite Foreknowledge',
    tag: 'Destiny',
    readingTime: '3 min',
    content: 'Belief in Al-Qadr teaches that Allah knows everything that has happened, is happening, and will happen with supreme omniscience. Humans possess genuine moral free will to choose between right and wrong, but nothing escapes God’s knowledge. This belief grants immense psychological resilience: hardship is viewed as a purposeful trial, while success inspires humble gratitude rather than hubris.',
    keyTakeaways: [
      'Four stages: God’s knowledge, His writing (Al-Lawh al-Mahfuz), His will, and His creation',
      'Empowers humans with moral responsibility while eliminating crippling anxiety',
      'Teaches patient resilience in setbacks and humility in triumphs'
    ],
    evidenceOrCitation: 'Surah Al-Hadid (57:22): "No disaster strikes upon the earth or among yourselves except that it is in a register before We bring it into being."',
    iconName: 'Clock',
    quiz: {
      question: 'How does belief in Al-Qadr psychologically benefit a person in difficult times?',
      options: ['It promotes laziness', 'It brings serenity knowing God\'s wisdom governs all events', 'It eliminates all physical pain', 'It causes fatalistic withdrawal'],
      correct: 1,
      explanation: 'Knowing that trials occur by divine wisdom grants profound peace, patience, and resilience against despair.'
    }
  },
  {
    id: 'fitrah-innate-disposition',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'The Concept of Fitrah',
    subtitle: 'The Innate Human Inclination toward Truth',
    tag: 'Human Nature',
    readingTime: '2 min',
    content: 'In Islam, humans are not born in "original sin." Instead, every child enters the world in a state of pure spiritual innocence termed the Fitrah—an innate, pre-installed orientation to recognize the Creator, love goodness, and abhor cruelty. Education and environment shape outward habits, but the inner compass remains redeemable through sincere reflection.',
    keyTakeaways: [
      'Rejects inherited sin; every soul begins with a clean slate',
      'Humans possess a natural thirst for moral virtue, honesty, and divine connection',
      'Returning to God is a homecoming to one’s original self'
    ],
    evidenceOrCitation: 'Sahih Muslim: "Every child is born upon the natural disposition (Fitrah)..."',
    iconName: 'Heart',
    quiz: {
      question: 'What does the Islamic concept of Fitrah mean?',
      options: ['Original sin passed down from ancestors', 'An innate natural disposition toward goodness and belief in God', 'A legal contract between traders', 'The physical body structure'],
      correct: 1,
      explanation: 'Fitrah is the pure, primordial spiritual state in which every human being is created.'
    }
  },
  {
    id: 'sanctity-human-soul',
    category: 'Foundations of Faith',
    categoryId: 'foundations',
    title: 'The Sanctity of Human Life',
    subtitle: 'Sacred Trust of Creation',
    tag: 'Ethics',
    readingTime: '2 min',
    content: 'Human life is intrinsically sacred in Islam. The Quran establishes that taking a single innocent life unjustly is morally equivalent to slaying all of humanity, while preserving one human life is as if one had preserved all humankind. Every soul is honored with dignity irrespective of race, ethnicity, or lineage.',
    keyTakeaways: [
      'Inviolability of human life, dignity, property, and freedom of conscience',
      'Categorical condemnation of unjust violence and oppression',
      'Universal brotherhood of all descendants of Adam'
    ],
    evidenceOrCitation: 'Surah Al-Ma\'idah (5:32): "Whoever saves one life—it is as if he had saved mankind entirely."',
    iconName: 'Shield',
    quiz: {
      question: 'According to Surah Al-Ma\'idah 5:32, saving a single life is spiritually equivalent to:',
      options: ['Building a thousand mosques', 'Saving all of mankind', 'Fasting for a century', 'Conquering an empire'],
      correct: 1,
      explanation: 'The Quran poetically and morally equates rescuing one human life to saving all of mankind.'
    }
  },

  // ==========================================
  // CATEGORY 2: PILLARS OF WORSHIP (12)
  // ==========================================
  {
    id: 'salah-daily-prayers',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'The Five Daily Prayers (Salah)',
    subtitle: 'Rhythmic Spiritual Ascension',
    tag: 'Daily Pillar',
    readingTime: '3 min',
    badge: 'Pillar of Islam',
    arabicPhrase: 'إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَـٰبًۭا مَّوْقُوتًۭا',
    arabicTranslation: 'Indeed, prayer has been decreed upon the believers a measure of time.',
    content: 'Salah is the direct spiritual lifeline between the servant and the Creator, performed five times a day: Fajr (Dawn), Dhuhr (Midday), Asr (Afternoon), Maghrib (Sunset), and Isha (Night). It involves recitation, standing, bowing, and prostrating toward the Qiblah (Makkah), realigning the heart and pausing worldly hustle to commune with Allah.',
    keyTakeaways: [
      'Five daily spiritual recalibrations that protect against moral degradation',
      'Unifies millions of believers facing the same direction around the globe',
      'The first deed about which a person will be questioned on Judgment Day'
    ],
    evidenceOrCitation: 'Surah Al-Ankabut (29:45): "Indeed, prayer prohibits immorality and wrongdoing."',
    iconName: 'Clock',
    quiz: {
      question: 'How many daily obligatory prayers are prescribed for Muslims?',
      options: ['3', '5', '7', '10'],
      correct: 1,
      explanation: 'The five obligatory daily prayers are Fajr, Dhuhr, Asr, Maghrib, and Isha.'
    }
  },
  {
    id: 'wudu-spiritual-purity',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Taharah & Wudu (Purification)',
    subtitle: 'Physical Cleanliness & Soul Cleansing',
    tag: 'Purity',
    readingTime: '2 min',
    content: 'Islam is founded upon cleanliness: "Purity is half of faith." Before standing in prayer, a Muslim performs Wudu (ablution), washing the hands, mouth, nostrils, face, forearms, wiping the head, and washing the feet. This ritual physical wash washes away heedlessness and spiritual weariness, bringing clarity before divine presence.',
    keyTakeaways: [
      'Combines practical physical hygiene with deep spiritual mindfulness',
      'Minor sins are forgiven with the falling of water droplets during ablution',
      'Prepares both body and mind for sacred communion'
    ],
    evidenceOrCitation: 'Sahih Muslim: "Cleanliness is half of faith (Al-Tahuru shatr al-Iman)."',
    iconName: 'Droplets',
    quiz: {
      question: 'Which celebrated Prophetic saying highlights the weight of purification in Islam?',
      options: ['"Cleanliness is half of faith"', '"Water is gold"', '"Wash thrice a day only"', '"Cleanliness is optional"'],
      correct: 0,
      explanation: 'Prophet Muhammad ﷺ declared that "Cleanliness is half of faith," emphasizing bodily and spiritual purity.'
    }
  },
  {
    id: 'adhan-call-to-prayer',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'The Adhan (The Call to Prayer)',
    subtitle: 'A Symphony of Monotheism Across the Earth',
    tag: 'Adhan',
    readingTime: '2 min',
    content: 'The Adhan is the melodious proclamation called from minarets across every time zone on earth. Because of shifting longitudes and prayer windows, the words "Allahu Akbar" (God is the Greatest) and the testimony of faith reverberate across planet Earth 24 hours a day, 365 days a year without a single moment of silence.',
    keyTakeaways: [
      'Instituted in Medina through the righteous companion Bilal ibn Rabah (RA)',
      'Never ceases on planet Earth due to continuous global time zones',
      'Calls believers from worldly stress to eternal success ("Hayya ‘alal-Falah")'
    ],
    evidenceOrCitation: 'Sunan Abi Dawud: The establishment of the Adhan in the early Medina commonwealth.',
    iconName: 'Wind',
    quiz: {
      question: 'Who was appointed by Prophet Muhammad ﷺ as the first official caller to prayer (Mu’adhin)?',
      options: ['Bilal ibn Rabah', 'Abu Hurairah', 'Khalid ibn al-Walid', 'Amr ibn al-Aas'],
      correct: 0,
      explanation: 'Bilal ibn Rabah (RA), the liberated Abyssinian companion renowned for his soulful, resonant voice, was the first Mu’adhin.'
    }
  },
  {
    id: 'khushu-mindfulness-prayer',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Khushu’: Heartfelt Mindfulness in Salah',
    subtitle: 'From Routine Movement to Deep Presence',
    tag: 'Spirituality',
    readingTime: '3 min',
    content: 'Salah is not mere mechanical gym exercises; its lifeblood is Khushu’—deep humility, serene focus, and heart-presence. In Khushu’, a believer forgets deadlines, smartphone notifications, and anxieties, realizing they stand before the King of kings, King of the universe.',
    keyTakeaways: [
      'The difference between a hollow prayer and an uplifting spiritual experience',
      'Cultivated by contemplating the Quranic verses being recited',
      'Produces tranquility (Sakinah) that carries over into all daily interactions'
    ],
    evidenceOrCitation: 'Surah Al-Mu’minun (23:1-2): "Certainly will the believers have succeeded: they who are during their prayer humbly submissive."',
    iconName: 'Heart',
    quiz: {
      question: 'What does the term "Khushu’" specifically refer to during prayer?',
      options: ['Speed of recitation', 'Humility, focus, and heart-presence', 'Loudness of voice', 'The number of prayer cycles'],
      correct: 1,
      explanation: 'Khushu’ is the state of serene humility, mindfulness, and wholehearted focus during worship.'
    }
  },
  {
    id: 'zakat-wealth-purification',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Zakat: The Purifying Wealth Tax',
    subtitle: 'Social Welfare & Wealth Circulation',
    tag: 'Social Justice',
    readingTime: '3 min',
    badge: 'Pillar of Islam',
    arabicPhrase: 'وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ',
    arabicTranslation: 'And establish prayer and give Zakat.',
    content: 'Zakat (literally meaning purification and growth) is an obligatory 2.5% annual contribution levied on wealth that exceeds a threshold (Nisab) held for one lunar year. It is not state revenue for infrastructure; it is distributed directly to eight categories of recipients, primarily the destitute, orphans, the indebted, and the stranded.',
    keyTakeaways: [
      'Prevents wealth from merely circulating among the rich',
      'Teaches that wealth is a temporary loan from God, not an entitlement',
      'Eliminates class resentment and fosters authentic community solidarity'
    ],
    evidenceOrCitation: 'Surah Al-Tawbah (9:60): Specifies the 8 divine categories entitled to receive Zakat.',
    iconName: 'Coins',
    quiz: {
      question: 'What is the standard annual rate of Zakat on qualifying savings and liquid assets?',
      options: ['1%', '2.5%', '5%', '10%'],
      correct: 1,
      explanation: 'The established rate for standard qualifying wealth and currency held over a lunar year is 2.5%.'
    }
  },
  {
    id: 'sadaqah-voluntary-generosity',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Sadaqah: Voluntary Acts of Goodness',
    subtitle: 'Beyond Financial Currency',
    tag: 'Generosity',
    readingTime: '2 min',
    content: 'While Zakat is a mandatory baseline, Sadaqah is voluntary generosity without limits. Prophet Muhammad ﷺ broadened charity beyond money: smiling at a fellow human, removing obstacles from the pathway, speaking kind words, offering counsel, and planting a tree whose fruit birds eat are all recognized as meritorious Sadaqah.',
    keyTakeaways: [
      'Accessible to everyone regardless of financial status',
      'Extends to non-monetary kindness, compassion, and smiles',
      'Sadaqah Jariyah (continuous charity) continues yielding rewards even after death'
    ],
    evidenceOrCitation: 'Jami` at-Tirmidhi: "Your smile for your brother is charity (Sadaqah)."',
    iconName: 'HeartHandshake',
    quiz: {
      question: 'According to Prophetic teachings, which simple non-monetary gesture is counted as Sadaqah?',
      options: ['A warm, sincere smile', 'Ignoring greetings', 'Hoarding knowledge', 'Excessive sleeping'],
      correct: 0,
      explanation: 'Prophet Muhammad ﷺ taught: "Your smile for your brother is an act of charity (Sadaqah)."'
    }
  },
  {
    id: 'ramadan-sawm',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Fasting in Ramadan (Sawm)',
    subtitle: 'The Month of Self-Mastery & Quran',
    tag: 'Ramadan',
    readingTime: '3 min',
    badge: 'Pillar of Islam',
    arabicPhrase: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ',
    arabicTranslation: 'O you who have believed, decreed upon you is fasting.',
    content: 'During the ninth month of the Islamic lunar calendar, Muslims worldwide fast daily from dawn (Fajr) until sunset (Maghrib), abstaining from food, drink, and intimate relations. More importantly, fasting entails abstaining from lying, gossip, anger, and arrogance. It cultivates empathy for the hungry, cleanses the digestive system, and fosters spiritual Taqwa (God-consciousness).',
    keyTakeaways: [
      'Spiritual boot-camp that builds willpower and impulse control',
      'Instills deep gratitude for basic blessings like water and bread',
      'The month in which the Holy Quran was first revealed to humanity'
    ],
    evidenceOrCitation: 'Surah Al-Baqarah (2:183): "Fasting is prescribed for you as it was prescribed for those before you that you may achieve Taqwa."',
    iconName: 'Moon',
    quiz: {
      question: 'What is the primary spiritual objective of fasting in Ramadan as stated in Quran 2:183?',
      options: ['Physical weight loss', 'Gaining Taqwa (God-consciousness and piety)', 'Sleeping during daylight', 'Tasting festive foods'],
      correct: 1,
      explanation: 'The Quran explicitly states that fasting was prescribed "so that you may develop Taqwa (piety and God-consciousness)."'
    }
  },
  {
    id: 'laylat-al-qadr',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Laylat al-Qadr: The Night of Power',
    subtitle: 'A Night Greater than 1,000 Months',
    tag: 'Sacred Night',
    readingTime: '2 min',
    content: 'Hidden within the odd nights of the final ten days of Ramadan is Laylat al-Qadr (The Night of Decree). Worship on this solitary night is equal to over 83 years of continuous worship (a thousand months). Angels descend en masse, spreading divine peace, pardon, and mercy upon worshipers until the break of dawn.',
    keyTakeaways: [
      'Commemorates the inaugural revelation of the Quran upon Mount Hira',
      'Sincere prayer and repentance on this night brings pardon of all prior sins',
      'A nocturnal sanctuary of serenity and spiritual acceleration'
    ],
    evidenceOrCitation: 'Surah Al-Qadr (97:3): "The Night of Decree is better than a thousand months."',
    iconName: 'Sparkles',
    quiz: {
      question: 'According to Surah Al-Qadr, a single night of worship on Laylat al-Qadr is superior to:',
      options: ['10 days', '100 weeks', '1,000 months (over 83 years)', 'A lifetime of traveling'],
      correct: 2,
      explanation: 'Surah Al-Qadr explicitly reveals: "The Night of Decree is better than a thousand months."'
    }
  },
  {
    id: 'hajj-pilgrimage',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'The Hajj Pilgrimage to Makkah',
    subtitle: 'The Universal Gathering of Equality',
    tag: 'Pilgrimage',
    readingTime: '3 min',
    badge: 'Pillar of Islam',
    content: 'Hajj is an obligatory once-in-a-lifetime journey for every Muslim who is physically and financially able. Over two million believers from every nation, race, social class, and language converge upon Makkah, all dressed in identical unstitched white garments (Ihram). Kings stand shoulder-to-shoulder with farmers, stripping away worldly titles to stand equal before their Creator.',
    keyTakeaways: [
      'The largest annual peaceful assembly of human equality on Earth',
      'Traces the sacrifices of Prophet Ibrahim, his wife Hajar, and Prophet Muhammad ﷺ',
      'The climax occurs on the plains of Arafat, in prayer and tears of repentance'
    ],
    evidenceOrCitation: 'Surah Al-Hajj (22:27): "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel..."',
    iconName: 'Compass',
    quiz: {
      question: 'What do the simple white garments (Ihram) worn by male pilgrims during Hajj symbolize?',
      options: ['Military rank', 'Absolute equality of all humans before God', 'Tribal affiliation', 'Winter insulation'],
      correct: 1,
      explanation: 'The Ihram eliminates all markers of wealth, class, and social status, demonstrating that all humans are equal before Allah.'
    }
  },
  {
    id: 'umrah-lesser-pilgrimage',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Umrah: The Spiritual Rejuvenation',
    subtitle: 'Year-Round Journey of Renewal',
    tag: 'Pilgrimage',
    readingTime: '2 min',
    content: 'Unlike Hajj, which occurs on specific days of Dhul-Hijjah, Umrah can be performed at any time of the year. It includes entering the state of Ihram, circumambulating the Kaaba seven times (Tawaf), walking between the hills of Safa and Marwah (Sa\'i), and cutting or trimming the hair. It serves as an immense expiation of sins and renewal of spiritual zeal.',
    keyTakeaways: [
      'Highly recommended (Sunnah Mu’akkadah) voluntary pilgrimage',
      'Can be performed during any month of the Islamic year',
      'Recharges personal faith and connection to the holy sanctuaries'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: "From one Umrah to another is an expiation for whatever occurred between them."',
    iconName: 'Compass',
    quiz: {
      question: 'How is Umrah different from Hajj regarding timing?',
      options: ['Umrah can be performed at any time of year', 'Umrah is only during Ramadan', 'Umrah only happens in winter', 'Umrah requires ten years'],
      correct: 0,
      explanation: 'Unlike Hajj which has designated lunar calendar dates, Umrah can be performed at any time of the year.'
    }
  },
  {
    id: 'dhikr-remembrance',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Dhikr: The Living Remembrance of God',
    subtitle: 'The Polish of the Hearts',
    tag: 'Mindfulness',
    readingTime: '2 min',
    arabicPhrase: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
    arabicTranslation: 'Unquestionably, by the remembrance of Allah hearts are assured.',
    content: 'Dhikr encompasses mindful verbal and internal remembrance of Allah through phrases like SubhanAllah (Glory be to Allah), Alhamdulillah (Praise be to Allah), and Allahu Akbar (Allah is the Greatest). It acts as spiritual sustenance, steadying heart rate, dispelling anxiety, and maintaining constant communion throughout work, commute, and rest.',
    keyTakeaways: [
      'Requires no special equipment, temple, or financial cost',
      'Transforms mundane moments into fruitful spiritual investments',
      'Direct remedy for modern loneliness, anxiety, and existential dread'
    ],
    evidenceOrCitation: 'Surah Ar-Ra’d (13:28): "Unquestionably, by the remembrance of Allah hearts find rest."',
    iconName: 'Heart',
    quiz: {
      question: 'According to Surah Ar-Ra’d verse 28, what brings true assurance and peace to the human heart?',
      options: ['Financial luxury', 'The remembrance of Allah', 'Fame and public approval', 'Continuous entertainment'],
      correct: 1,
      explanation: 'The Quran states: "Unquestionably, by the remembrance of Allah hearts are assured."'
    }
  },
  {
    id: 'sujood-nearest-to-god',
    category: 'Pillars of Worship',
    categoryId: 'pillars',
    title: 'Sujood: Prostration to the Earth',
    subtitle: 'The Highest Elevation through the Lowest Posture',
    tag: 'Spiritual State',
    readingTime: '2 min',
    content: 'In Sujood (prostration), a human places their forehead, nose, palms, knees, and toes upon the ground. By lowering the highest point of physical pride (the human forehead) to the dust before the Creator, one paradoxically attains the highest spiritual elevation. Prophet Muhammad ﷺ noted that a servant is closest to Allah during prostration.',
    keyTakeaways: [
      'The pinnacle of surrender, humility, and intimate vulnerability before God',
      'The prime moment to pour out one\'s deepest personal supplications and tears',
      'Grounds the nervous system and fosters deep humility'
    ],
    evidenceOrCitation: 'Sahih Muslim: "The nearest a servant comes to his Lord is when he is in prostration, so make abundant supplication."',
    iconName: 'Target',
    quiz: {
      question: 'When is a believer spiritually nearest to Allah according to Sahih Muslim?',
      options: ['While eating', 'While in prostration (Sujood)', 'While bargaining in the market', 'While traveling'],
      correct: 1,
      explanation: 'Prophet Muhammad ﷺ said: "The nearest a servant comes to his Lord is when he is in prostration (Sujood)."'
    }
  },

  // ==========================================
  // CATEGORY 3: QURAN & MODERN SCIENCE (12)
  // ==========================================
  {
    id: 'expanding-universe',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Expanding Universe',
    subtitle: 'Cosmology in Surah Adh-Dhariyat',
    tag: 'Astrophysics',
    readingTime: '3 min',
    badge: 'Cosmology',
    arabicPhrase: 'وَٱلسَّمَآءَ بَنَيْنَـٰهَا بِأَيْي۟دٍۢ وَإِنَّا لَمُوسِعُونَ',
    arabicTranslation: 'And the heaven We constructed with strength, and indeed, We are [its] expander.',
    content: 'Until the early 20th century, modern science believed in a static, eternal universe. In 1929, Edwin Hubble observed redshift in distant galaxies, confirming that the universe is actively expanding. 1,400 years prior, the Quran explicitly described the heavens being continuously expanded using the Arabic participle "Mūsi‘ūn" (expanding / expanders).',
    keyTakeaways: [
      'Revealed in 7th century Arabia when no telescope or astronomical spectroscopy existed',
      'Aligns directly with Hubble’s expansion observation and Einstein’s relativistic equations',
      'Signifies an actively stretching cosmic tapestry governed by divine command'
    ],
    evidenceOrCitation: 'Surah Adh-Dhariyat (51:47): "And the heaven We constructed with strength, and indeed, We are its expander."',
    iconName: 'Orbit',
    quiz: {
      question: 'Which modern 20th-century astronomical discovery matches Surah 51:47 ("We are its expander")?',
      options: ['Flat earth hypothesis', 'Static universe model', 'The expanding universe (Hubble\'s Law)', 'Geocentric orbits'],
      correct: 2,
      explanation: 'Edwin Hubble confirmed in 1929 that galaxies are racing away from each other—an expanding universe.'
    }
  },
  {
    id: 'big-bang-cosmic-origin',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'Cosmic Singularity & The Separation',
    subtitle: 'The Common Origin of Space and Matter',
    tag: 'Astrophysics',
    readingTime: '3 min',
    arabicPhrase: 'أَوَلَمْ يَرَ ٱلَّذِينَ كَفَرُوٓا۟ أَنَّ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ كَانَتَا رَتْقًۭا فَفَتَقْنَـٰهُمَا',
    arabicTranslation: 'Have those who disbelieved not considered that the heavens and the earth were a joined entity, and then We separated them?',
    content: 'Modern astrophysics confirms that all matter, energy, and space-time originated from a single primordial singularity (a "joined entity" or "Ratq") that underwent rapid expansion (Big Bang / "Fataq"). Surah Al-Anbiya uses these exact precise linguistic terms: "Ratq" (fused, stitched together) and "Fataq" (unstitched, torn apart).',
    keyTakeaways: [
      'Presents the universe as initially a unified single entity before separation',
      'Matches the Big Bang theory and Cosmic Microwave Background findings',
      'Invites skeptics to reflect on how a desert dweller 14 centuries ago could author this'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:30): "The heavens and the earth were a joined entity, and We separated them."',
    iconName: 'Atom',
    quiz: {
      question: 'What does the Arabic word "Ratq" in Surah Al-Anbiya 21:30 mean?',
      options: ['Scattered across darkness', 'Joined together as a single fused entity', 'Cold ice', 'Empty nothingness'],
      correct: 1,
      explanation: '"Ratq" means a closed, sewn, or fused entity, matching the primordial singularity prior to expansion.'
    }
  },
  {
    id: 'origin-life-water',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Aqueous Origin of All Life',
    subtitle: 'Cellular Biology and Cytoplasm',
    tag: 'Biology',
    readingTime: '2 min',
    arabicPhrase: 'وَجَعَلْنَا مِنَ ٱلْمَآءِ كُلَّ شَىْءٍ حَىٍّ ۖ أَفَلَا يُؤْمِنُونَ',
    arabicTranslation: 'And We made from water every living thing. Then will they not believe?',
    content: 'Cytology and modern biochemistry reveal that protoplasm (the fundamental substance of living cells) is composed of 70% to 85% water. Every living microorganism, plant, animal, and human cell is dependent on an aqueous medium to sustain metabolic reactions. The Quran declared this universal biological law in a water-scarce desert.',
    keyTakeaways: [
      'Universal biological prerequisite: life cannot exist without water',
      'Matches modern molecular biology, cell theory, and planetary astrobiology search criteria',
      'Concludes with an inspiring philosophical challenge: "Then will they not believe?"'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:30): "...and We made from water every living thing."',
    iconName: 'Droplets',
    quiz: {
      question: 'What percentage of cellular cytoplasm consists primarily of water?',
      options: ['5% to 10%', '20% to 30%', '70% to 85%', '99.9%'],
      correct: 2,
      explanation: 'Living cells consist of approximately 70% to 85% water, validating that all physical life is founded upon water.'
    }
  },
  {
    id: 'embryonic-stages-development',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'Stages of Human Embryology',
    subtitle: 'From Nutfah to Alaqa and Mudghah',
    tag: 'Embryology',
    readingTime: '3 min',
    badge: 'Embryology',
    content: 'Surah Al-Mu’minun meticulously documents stages of embryonic development: Nutfah (fertilized drop), \'Alaqah (clinging leech-like clot), Mudghah (chewed lump with teeth marks), followed by bone development (Idham) and clothing the bones with flesh (Lahm). Renowned embryologists like Dr. Keith Moore acknowledged the astounding precision of these descriptions centuries before the microscope.',
    keyTakeaways: [
      'The early embryo physically resembles a leech and clings to the uterine wall like an \'Alaqah',
      'The somite stage gives the precise visual appearance of teeth impressions on chewing gum',
      'Accurate chronological sequence of bone formation followed by muscle tissue wrapping'
    ],
    evidenceOrCitation: 'Surah Al-Mu’minun (23:12-14): The stages of human creation in the mother\'s womb.',
    iconName: 'Baby',
    quiz: {
      question: 'What does the term "\'Alaqah" used in Quranic embryology literally denote?',
      options: ['A stone statue', 'A clinging clot or leech-like entity', 'A fully grown infant', 'A drop of milk'],
      correct: 1,
      explanation: '\'Alaqah means a clinging clot or leech-like form, accurately describing the embryo attaching to the uterine wall.'
    }
  },
  {
    id: 'mountains-as-pegs',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'Mountains as Pegs (Awtad)',
    subtitle: 'Geology & Crustal Isostasy',
    tag: 'Geology',
    readingTime: '3 min',
    arabicPhrase: 'وَٱلْجِبَالَ أَوْتَادًۭا',
    arabicTranslation: 'And the mountains as pegs?',
    content: 'The Quran compares mountains to "Awtad" (tent stakes or pegs). Geophysics now confirms that mountains have deep roots extending down into the lithosphere (crustal roots) up to several times their surface elevation. In the geological theory of Isostasy, these deep roots stabilize the tectonic plates and reduce catastrophic crustal shaking.',
    keyTakeaways: [
      'Just like a tent peg has more depth buried underground, mountains possess deep downward roots',
      'The Quran notes their role in stabilizing the earth crust: "Lest it shake with you" (Surah 16:15)',
      'Revealed millennia before seismic sonar and plate tectonic mapping'
    ],
    evidenceOrCitation: 'Surah An-Naba (78:6-7) and Surah An-Nahl (16:15): Mountains as stabilizing pegs.',
    iconName: 'Mountain',
    quiz: {
      question: 'In modern geology, what is the subterranean extension under mountain ranges called?',
      options: ['Volcanic pipes', 'Mountain roots (Isostatic crustal roots)', 'Oceanic trenches', 'Glacial valleys'],
      correct: 1,
      explanation: 'Mountain roots sink deep into the Earth\'s mantle to achieve isostatic equilibrium, acting like underground pegs.'
    }
  },
  {
    id: 'iron-sent-down',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Cosmic Origin of Iron',
    subtitle: 'Surah Al-Hadid: Sent Down from Space',
    tag: 'Astrophysics',
    readingTime: '3 min',
    arabicPhrase: 'وَأَنزَلْنَا ٱلْحَدِيدَ فِيهِ بَأْسٌۭ شَدِيدٌۭ وَمَنَـٰفِعُ لِلنَّاسِ',
    arabicTranslation: 'And We sent down iron, wherein is great military might and benefits for the people.',
    content: 'Surah 57 is titled Al-Hadid (The Iron). In verse 25, Allah states: "And We sent down (Anzalna) iron." Modern nuclear astrophysics reveals that our Sun and solar system do not possess sufficient temperature to synthesize iron atoms; iron is forged only in massive supernova stars exceeding hundreds of millions of degrees, which then explode and rain iron down into developing planetary systems.',
    keyTakeaways: [
      'The specific Arabic verb "Anzalna" explicitly means "sent down from above"',
      'Iron on Earth is extraterrestrial in ultimate nucleosynthesis origin',
      'Highlighting iron’s dual nature: high tensile structural utility and supreme military defense'
    ],
    evidenceOrCitation: 'Surah Al-Hadid (57:25): "And We sent down iron, wherein is great might and benefits for mankind."',
    iconName: 'Hammer',
    quiz: {
      question: 'Where was the iron found on Earth originally forged according to modern nuclear astrophysics?',
      options: ['In Earth\'s inner core spontaneously', 'In ancient ocean beds', 'In giant supernova stars and exploded into space', 'By prehistoric lightning storms'],
      correct: 2,
      explanation: 'Iron cannot be created by our sun\'s temperature; it requires extreme supernova stellar explosions before raining into planetary dust.'
    }
  },
  {
    id: 'oceanic-barriers-internal-waves',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'Oceanic Barriers & Internal Deep Waves',
    subtitle: 'Physical Oceanography & Pycnocline',
    tag: 'Oceanography',
    readingTime: '3 min',
    content: 'The Quran describes two distinct oceanic phenomena: (1) A barrier between meeting bodies of water where they do not mix indiscriminately (due to differences in salinity, density, and temperature, such as the Strait of Gibraltar), and (2) Deep darkness in the ocean covered by "waves, above which are waves, above which are clouds." Oceanographers only discovered underwater internal waves on density pycnoclines in the 20th century.',
    keyTakeaways: [
      'Surface waves are mirrored by subsurface internal waves occurring at density interfaces',
      'Submarines and deep instrumentation confirmed light disappears entirely beyond ~200-1000m depth',
      'The Prophet ﷺ lived in desert Makkah and never sailed the high oceans'
    ],
    evidenceOrCitation: 'Surah Ar-Rahman (55:19-20) and Surah An-Nur (24:40): Oceanic barriers and deep layered darkness.',
    iconName: 'Waves',
    quiz: {
      question: 'What modern oceanographic discovery matches the Quranic verse: "waves beneath which are waves"?',
      options: ['Tsunamis', 'Internal waves at density gradients deep beneath the surface', 'Whirlpools', 'Polar icebergs'],
      correct: 1,
      explanation: 'Internal waves occur at deep subsurface density boundaries, exactly as described in Surah An-Nur.'
    }
  },
  {
    id: 'protective-atmosphere-canopy',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Protective Sky & Magnetosphere',
    subtitle: 'The Ceiling that Shields the Biosphere',
    tag: 'Atmosphere',
    readingTime: '2 min',
    arabicPhrase: 'وَجَعَلْنَا ٱلسَّمَآءَ سَقْفًۭا مَّحْفُوظًۭا',
    arabicTranslation: 'And We made the sky a protected ceiling, but from its signs they are turning away.',
    content: 'Earth is sheltered by an atmospheric blanket and the Van Allen magnetic radiation belt. The atmosphere burns up millions of lethal meteors each day, filters out deadly ultraviolet solar radiation via the ozone layer, traps necessary thermal energy via greenhouse insulation, and buffers solar flares. The Quran termed this sky a "protected ceiling" (Saqfan Mahfoozan).',
    keyTakeaways: [
      'Shields terrestrial life from cosmic rays, lethal gamma radiation, and meteor bombardments',
      'Maintains stable global thermal equilibrium vital for liquid water',
      'A delicate natural shield uniquely calibrated for biological flourishing'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:32): "And We made the sky a protected ceiling."',
    iconName: 'Shield',
    quiz: {
      question: 'What planetary shield defends Earth from solar wind and cosmic radiation, matching Surah 21:32?',
      options: ['The Van Allen magnetosphere & atmospheric ozone layer', 'The lunar gravity pull', 'Desert mountain winds', 'Volcanic cloud dust'],
      correct: 0,
      explanation: 'The magnetosphere and atmosphere function as a protective ceiling filtering out lethal space radiation.'
    }
  },
  {
    id: 'frontal-lobe-decision',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Frontal Lobe (Nasiyah)',
    subtitle: 'Neuroscience of Decision-Making & Honesty',
    tag: 'Neuroscience',
    readingTime: '3 min',
    badge: 'Neuroscience',
    arabicPhrase: 'كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًۢا بِٱلنَّاصِيَةِ * نَاصِيَةٍۢ كَـٰذِبَةٍ خَاطِئَةٍۢ',
    arabicTranslation: 'No! If he does not desist, We will surely drag him by the forelock—a lying, sinning forelock.',
    content: 'In Surah Al-Alaq, Allah warns an arrogant oppressor who prevented prayer: "A lying, sinning forelock (Nasiyah)!" In modern functional neuroanatomy, the prefrontal cortex—located directly behind the forehead/forelock—is the exact executive brain region responsible for moral judgment, decision planning, deceit, and aggressive impulses.',
    keyTakeaways: [
      'Identifies the front part of the head as the seat of lies and transgressions',
      'fMRI studies confirm the prefrontal cortex lights up during intentional deception and planning',
      'Striking anatomical alignment between classical Quranic terminology and neuroscience'
    ],
    evidenceOrCitation: 'Surah Al-Alaq (96:15-16): "A lying, sinning forelock (Nasiyah)."',
    iconName: 'Brain',
    quiz: {
      question: 'Which brain region behind the forehead governs moral decisions, planning, and intentional lying?',
      options: ['Occipital lobe', 'Prefrontal cortex (frontal lobe)', 'Cerebellum', 'Brainstem'],
      correct: 1,
      explanation: 'The prefrontal cortex behind the forehead governs executive planning, deception, and moral decisions.'
    }
  },
  {
    id: 'cloud-dynamics-rain',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'Cloud Physics & Cumulonimbus Hail',
    subtitle: 'Meteorology of Convective Updrafts',
    tag: 'Meteorology',
    readingTime: '3 min',
    content: 'Surah An-Nur describes cloud dynamics with atmospheric precision: winds drive small cumulus clouds, join them together, stack them into vertical mountains (cumulonimbus clouds), from which heavy rain falls. The verse then states that from these mountain-like clouds Allah sends down hail, and that the flash of its lightning nearly blinds sight. Radar meteorology confirms hail and severe lightning are produced inside these vertical cloud formations.',
    keyTakeaways: [
      'Accurate stages: wind dispersal, combination, vertical stacking, precipitation',
      'Explicitly references vertical cloud "mountains" (cumulonimbus towers up to 40,000 ft)',
      'Direct correlation between intra-cloud hail collisions and electrical lightning discharges'
    ],
    evidenceOrCitation: 'Surah An-Nur (24:43): Detailed meteorological steps of rain and hail generation.',
    iconName: 'CloudRain',
    quiz: {
      question: 'What cloud structure does Surah An-Nur 24:43 compare hail-bearing storm clouds to?',
      options: ['Flat carpets', 'Mountains in the sky', 'Desert dunes', 'Ocean waves'],
      correct: 1,
      explanation: 'The Quran describes them as "mountains" (jibāl), accurately reflecting vertical cumulonimbus towers.'
    }
  },
  {
    id: 'paired-nature-creation',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Duality & Pairs in All Things',
    subtitle: 'Botany, Subatomic Particles & Duality',
    tag: 'Physics',
    readingTime: '2 min',
    arabicPhrase: 'وَمِن كُلِّ شَىْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُونَ',
    arabicTranslation: 'And of all things We created two mates; perhaps you will remember.',
    content: 'Ancient peoples recognized male and female pairs in animals and humans. However, the Quran declared that "all things" are created in pairs (Zawjayn), including plants (male stamen and female pistil) and unseen realms. In modern physics, Paul Dirac won the Nobel Prize for discovering that all elementary matter has an antimatter pair (electrons and positrons, quarks and antiquarks).',
    keyTakeaways: [
      'Affirms botanical gender centuries before modern pollination science',
      'Anticipates subatomic particle-antiparticle symmetry in quantum physics',
      'Reiterates that the Creator alone is unique and completely without a pair'
    ],
    evidenceOrCitation: 'Surah Adh-Dhariyat (51:49) and Surah Ya-Sin (36:36): Creation of pairs in all things.',
    iconName: 'Dna',
    quiz: {
      question: 'Which subatomic physics concept mirrors the Quranic declaration that all matter is created in pairs?',
      options: ['String vibration only', 'Matter and Antimatter pairs (positrons, antiparticles)', 'Static ether theory', 'Absolute vacuum'],
      correct: 1,
      explanation: 'Quantum mechanics demonstrates that every fundamental particle has an antiparticle mate.'
    }
  },
  {
    id: 'honeybee-architecture',
    category: 'Quran & Modern Science',
    categoryId: 'science',
    title: 'The Honeybee & Female Worker Caste',
    subtitle: 'Entomology in Surah An-Nahl',
    tag: 'Zoology',
    readingTime: '3 min',
    arabicPhrase: 'وَأَوْحَىٰ رَبُّكَ إِلَى ٱلنَّحْلِ',
    arabicTranslation: 'And your Lord inspired to the bee...',
    content: 'Surah An-Nahl addresses the bee using Arabic feminine grammatical verbs ("Ittakhidhi", "Kuli", "Usluki"). Classical observers assumed soldier or worker bees were male. Modern entomology discovered that all foraging, hive building, honeycomb hexagonal engineering, and honey production are carried out strictly by female worker bees. The male drones do not build hives or harvest nectar.',
    keyTakeaways: [
      'Uses feminine Arabic verb inflections to designate worker bees',
      'Highlights the architectural optimization of hexagonal honeycombs for maximum volume and minimum wax',
      'Celebrates honey as a natural antimicrobial healing agent for mankind'
    ],
    evidenceOrCitation: 'Surah An-Nahl (16:68-69): The divine inspiration given to the worker bee.',
    iconName: 'Hexagon',
    quiz: {
      question: 'Why does the Quran address the worker bees using feminine grammatical verbs in Arabic?',
      options: ['It was a random grammatical choice', 'All worker and foraging bees are biologically female', 'Bees have no biological sex', 'The queen bee alone flies to every flower'],
      correct: 1,
      explanation: 'Entomology confirms that all worker bees that build combs, gather nectar, and make honey are female.'
    }
  },

  // ==========================================
  // CATEGORY 4: GOLDEN AGE PIONEERS (11)
  // ==========================================
  {
    id: 'ibn-al-haytham',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Ibn al-Haytham (Alhazen)',
    subtitle: 'Father of Modern Optics & Scientific Method',
    tag: 'Optics & Physics',
    readingTime: '3 min',
    badge: 'Polymath',
    content: 'Hasan Ibn al-Haytham (965–1040 CE) revolutionized physics with his seven-volume masterpiece Kitab al-Manazir (Book of Optics). He disproved the Greek emission theory of vision (the idea that eyes emit rays), demonstrating mathematically that light reflects off objects into the eye. He invented the pinhole camera (Camera Obscura / Al-Bayt al-Muthlim) and formulated the empirical scientific method of systematic testing and peer critique.',
    keyTakeaways: [
      'Pioneered the empirical scientific method: hypothesis, experimentation, mathematical proof',
      'Father of modern camera design, lenses, and ophthalmology',
      'Insisted on relentless skepticism toward scientific authority and dogma'
    ],
    evidenceOrCitation: 'Ibn al-Haytham: "The seeker after the truth is not one who studies the writings of the ancients and puts his trust in them, but rather the one who suspects his faith in them and questions what he gathers from them."',
    iconName: 'Sparkles',
    quiz: {
      question: 'What optical instrument did Ibn al-Haytham invent using a darkened room and pinhole?',
      options: ['Radio telescope', 'Camera Obscura', 'Electron microscope', 'Laser beam'],
      correct: 1,
      explanation: 'Ibn al-Haytham invented the Camera Obscura (Al-Bayt al-Muthlim), the ancestor of all modern cameras.'
    }
  },
  {
    id: 'al-khwarizmi',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Muhammad ibn Musa al-Khwarizmi',
    subtitle: 'Father of Algebra & Algorithms',
    tag: 'Mathematics',
    readingTime: '3 min',
    badge: 'Polymath',
    content: 'Al-Khwarizmi (780–850 CE) worked at the House of Wisdom in Baghdad. His book "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala" gave humanity the word "Algebra" (Al-Jabr). He introduced Hindu-Arabic numerals (0 through 9) and the decimal system to the Western world. The very word "Algorithm" is a Latinization of his name, forming the bedrock of all modern computer science and software.',
    keyTakeaways: [
      'Gave humanity the foundational discipline of Algebra (Al-Jabr)',
      'The word "Algorithm" is derived directly from his surname Al-Khwarizmi',
      'Developed algebraic methods to solve real-world Islamic inheritance law distributions'
    ],
    evidenceOrCitation: 'Al-Khwarizmi’s monumental text on calculation by completion and balancing (Al-Jabr wal-Muqabala).',
    iconName: 'Target',
    quiz: {
      question: 'Which fundamental computer science term is derived from the name of Al-Khwarizmi?',
      options: ['Microchip', 'Algorithm', 'Compiler', 'Binary'],
      correct: 1,
      explanation: 'The word "Algorithm" originated as the Latin transcription of his surname "Al-Khwarizmi".'
    }
  },
  {
    id: 'ibn-sina-avicenna',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Ibn Sina (Avicenna)',
    subtitle: 'Master of Medicine & The Canon',
    tag: 'Medicine',
    readingTime: '3 min',
    badge: 'Polymath',
    content: 'Ibn Sina (980–1037 CE) authored "Al-Qanun fi al-Tibb" (The Canon of Medicine), an encyclopedic medical standard that remained the primary university textbook across Europe and the Islamic world for over 600 years. He was the first to recognize the contagious nature of pulmonary tuberculosis, the transmission of diseases through water and soil, quarantine protocol for pandemics, and the psychosomatic link between emotional distress and physical illness.',
    keyTakeaways: [
      'Standardized international medical education for six centuries',
      'Pioneered quarantine methods to halt contagion spread',
      'Advanced clinical pharmacology, neuro-psychiatry, and pulse diagnosis'
    ],
    evidenceOrCitation: 'The Canon of Medicine (Al-Qanun fi al-Tibb), translated into Latin by Gerard of Cremona.',
    iconName: 'Heart',
    quiz: {
      question: 'For approximately how long was Ibn Sina\'s "Canon of Medicine" used as the primary textbook in European universities?',
      options: ['20 years', '100 years', 'Over 500 years', '1,500 years'],
      correct: 2,
      explanation: 'The Canon of Medicine remained the authoritative medical curriculum in European faculties for over five centuries.'
    }
  },
  {
    id: 'al-zahrawi-surgery',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Al-Zahrawi (Albucasis)',
    subtitle: 'Father of Modern Operative Surgery',
    tag: 'Surgery',
    readingTime: '3 min',
    content: 'Abu al-Qasim al-Zahrawi (936–1013 CE) of Cordoba, Andalusia, authored the 30-volume medical compendium "Kitab al-Tasrif". He invented over 200 surgical instruments—including the scalpel, bone saws, forceps, surgical needles, and dissolvable catgut sutures for internal stitching (still in use today). His detailed anatomical illustrations transformed surgical practice from barber-bloodletting into an exacting discipline.',
    keyTakeaways: [
      'Pioneered internal dissolving stitches using animal catgut',
      'Invented over 200 surgical instruments illustrated with blueprint precision',
      'First to describe hemophilia and the surgical treatment of ectopic pregnancy'
    ],
    evidenceOrCitation: 'Al-Tasrif li-man \'ajaza \'an al-ta\'lif, Volume 30: On Surgery and Instruments.',
    iconName: 'Shield',
    quiz: {
      question: 'What surgical suture material invented by Al-Zahrawi dissolves naturally inside the human body?',
      options: ['Silk thread', 'Catgut sutures', 'Copper wire', 'Nylon fibers'],
      correct: 1,
      explanation: 'Al-Zahrawi discovered that catgut dissolves naturally inside internal incisions without needing secondary extraction.'
    }
  },
  {
    id: 'maryam-al-asturlabiya',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Maryam al-Ijliya (Al-Asturlabiya)',
    subtitle: 'Master Astrolabe Maker & Astronomer',
    tag: 'Astronomy',
    readingTime: '2 min',
    badge: 'Female Pioneer',
    content: 'Maryam al-Ijliya was a 10th-century Syrian astronomer and precision engineer in Aleppo. She specialized in the manufacture of complex astrolabes—the astronomical computers of the medieval era used to calculate time, celestial orbits, solar coordinates, and navigation at sea. Her extraordinary precision earned her a prominent post in the court of Sayf al-Dawla.',
    keyTakeaways: [
      'Master instrument-maker who built analogue astronomical computers',
      'Exemplifies women’s scientific leadership in classical Islamic civilizations',
      'The Main Belt asteroid 7060 Al-\'Ijliya was named in her honor by astronomers'
    ],
    evidenceOrCitation: 'Biographical records from Ibn al-Nadim\'s 10th-century index Kitab al-Fihrist.',
    iconName: 'Compass',
    quiz: {
      question: 'What complex astronomical navigation instrument did Maryam al-Ijliya design with supreme mastery?',
      options: ['The Astrolabe', 'The Steam Engine', 'The Magnetic Compass', 'The Sundial'],
      correct: 0,
      explanation: 'Maryam al-Ijliya was renowned across the Middle East for crafting exquisite, high-precision astrolabes.'
    }
  },
  {
    id: 'al-biruni-geodesy',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Abu Rayhan al-Biruni',
    subtitle: 'Father of Geodesy & Comparative Anthropologist',
    tag: 'Geodesy & Earth',
    readingTime: '3 min',
    content: 'Al-Biruni (973–1050 CE) was a towering polymath in astronomy, geology, physics, and anthropology. Using trigonometry and the dip of the horizon from a mountain at Nandana, he calculated the circumference of Earth to within 1% of modern satellite measurements. He also hypothesized the existence of the American landmass 500 years before Columbus, based on global landmass mass distribution.',
    keyTakeaways: [
      'Calculated Earth\'s radius (6,339.6 km) within 1% accuracy of modern geodetic satellites',
      'Pioneered comparative anthropology with his exhaustive study of Indian culture and philosophies',
      'Understood that the speed of light is incomparably faster than the speed of sound'
    ],
    evidenceOrCitation: 'Kitab fi Tahqiq ma li-l-Hind and Al-Qanun al-Mas\'udi.',
    iconName: 'Globe',
    quiz: {
      question: 'Within what margin of modern satellite calculations was Al-Biruni\'s 11th-century measurement of Earth\'s circumference?',
      options: ['Within 1%', 'Within 25%', 'Within 50%', 'Off by double'],
      correct: 0,
      explanation: 'Using trigonometric calculations from a mountaintop, Al-Biruni came within 1% of modern satellite measurements.'
    }
  },
  {
    id: 'fatima-al-fihri-university',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Fatima al-Fihri',
    subtitle: 'Founder of the World\'s First Degree-Granting University',
    tag: 'Education',
    readingTime: '2 min',
    badge: 'Education Icon',
    content: 'In 859 CE, a wealthy Muslim woman named Fatima al-Fihri invested her entire inherited fortune to establish the University of al-Qarawiyyin in Fez, Morocco. Recognized by UNESCO and Guinness World Records as the oldest continually operating, degree-granting higher education institution in the world, it taught astronomy, medicine, mathematics, languages, and theology, welcoming both Muslim and Christian scholars.',
    keyTakeaways: [
      'Founded the world’s oldest continually operating university in 859 CE',
      'Personally supervised the construction while fasting daily until completion',
      'Educated legendary figures such as Pope Sylvester II and Jewish philosopher Maimonides'
    ],
    evidenceOrCitation: 'UNESCO World Heritage Record: University of al-Qarawiyyin, Fez, Morocco.',
    iconName: 'GraduationCap',
    quiz: {
      question: 'Which historic university founded by Fatima al-Fihri is recognized by UNESCO as the oldest continually operating university?',
      options: ['Oxford University', 'University of al-Qarawiyyin', 'Sorbonne University', 'Harvard University'],
      correct: 1,
      explanation: 'University of al-Qarawiyyin in Fez, Morocco, founded in 859 CE, is recognized as the world’s oldest continuously operating university.'
    }
  },
  {
    id: 'al-jazari-robotics',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Ismail al-Jazari',
    subtitle: 'Father of Robotics & Mechanical Engineering',
    tag: 'Engineering',
    readingTime: '3 min',
    content: 'Al-Jazari (1136–1206 CE) penned "The Book of Knowledge of Ingenious Mechanical Devices." He invented the crankshaft, connecting rod mechanism (the foundational mechanism of modern automotive engines), camshafts, segmental gears, automated humanoid water clocks (the Elephant Clock), and programmable automata. His mechanical designs laid the physical foundations for the Industrial Revolution.',
    keyTakeaways: [
      'Invented the crankshaft and camshaft mechanisms essential to modern automobile engines',
      'Constructed the first programmable humanoid automata and musical robot bands',
      'Mastered water-raising pumps with reciprocating double-acting pistons'
    ],
    evidenceOrCitation: 'Kitab fi Ma\'rifat al-Hiyal al-Handasiyya (1206 CE).',
    iconName: 'Zap',
    quiz: {
      question: 'Which mechanical engine component invented by Al-Jazari transforms rotary motion into linear motion?',
      options: ['The crankshaft', 'The lightbulb', 'The vacuum tube', 'The rubber belt'],
      correct: 0,
      explanation: 'The crankshaft, which transforms rotary motion into reciprocating linear motion, was invented and documented by Al-Jazari.'
    }
  },
  {
    id: 'ibn-battuta-traveler',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Ibn Battuta: The Great Explorer',
    subtitle: '73,000 Miles Across the Medieval World',
    tag: 'Geography',
    readingTime: '3 min',
    content: 'Shams al-Din Ibn Battuta (1304–1369 CE) left his hometown of Tangier at age 21 for Hajj and spent the next 30 years exploring 73,000 miles across 44 modern countries—surpassing Marco Polo by more than threefold. Traveling through North Africa, the Middle East, East Africa, Persia, India, the Maldives, Southeast Asia, China, and Andalusia, his chronicle "The Rihla" offers an unparalleled anthropological mirror of 14th-century world civilizations.',
    keyTakeaways: [
      'Traveled three times farther than Marco Polo without steam or railways',
      'Documented social customs, legal systems, economies, and court life across Afro-Eurasia',
      'Demonstrated the vast cosmopolitan safety and trade networks of the Pax Islamica'
    ],
    evidenceOrCitation: 'Tuhfat al-Nuzzar fi Ghara\'ib al-Amsar wa \'Aja\'ib al-Asfar (The Rihla of Ibn Battuta).',
    iconName: 'Compass',
    quiz: {
      question: 'How many miles did Ibn Battuta travel across his 30-year journey across the medieval world?',
      options: ['5,000 miles', '15,000 miles', 'Over 73,000 miles', '100,000 miles'],
      correct: 2,
      explanation: 'Ibn Battuta journeyed over 73,000 miles across 44 modern countries, vastly exceeding any other pre-modern explorer.'
    }
  },
  {
    id: 'jabir-ibn-hayyan-chemistry',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Jabir ibn Hayyan (Geber)',
    subtitle: 'Father of Chemistry & Experimental Method',
    tag: 'Chemistry',
    readingTime: '3 min',
    content: 'Jabir ibn Hayyan (721–815 CE) transformed mystical alchemy into rigorous scientific chemistry. He introduced systematic experimentation, inventing the alembic still for distillation, crystallization, filtration, calcination, and evaporation. He synthesized hydrochloric acid, nitric acid, sulfuric acid, and aqua regia (which dissolves gold), developing rust prevention varnishes and water-resistant coatings.',
    keyTakeaways: [
      'Invented the alembic distillation apparatus and laboratory glassware',
      'First to synthesize essential mineral acids: nitric, hydrochloric, and sulfuric',
      'Coined chemical terms such as alkali (Al-Qaly), antimony, and elixir'
    ],
    evidenceOrCitation: 'The monumental chemical treatises of Jabir ibn Hayyan preserved in Latin as Geber\'s works.',
    iconName: 'Atom',
    quiz: {
      question: 'Which chemical process and apparatus did Jabir ibn Hayyan invent that is still central to modern laboratories?',
      options: ['Alembic distillation', 'Plastic injection molding', 'Nuclear fission', 'Solar photovoltaic cells'],
      correct: 0,
      explanation: 'Jabir invented the alembic still, establishing distillation and scientific laboratory procedures.'
    }
  },
  {
    id: 'ibn-khaldun-sociology',
    category: 'Golden Age Pioneers',
    categoryId: 'pioneers',
    title: 'Ibn Khaldun',
    subtitle: 'Father of Historiography & Modern Sociology',
    tag: 'Sociology & Economics',
    readingTime: '3 min',
    content: 'Abd al-Rahman Ibn Khaldun (1332–1406 CE) revolutionized history with his introduction, "The Muqaddimah" (Prolegomena). British historian Arnold Toynbee described it as "the greatest work of its kind that has ever yet been created by any mind in any time or place." He formulated social cohesion ("Asabiyyah"), cyclical rise and fall of dynasties, division of labor, and the supply-demand tax curve later popularized in modern times as the Laffer Curve.',
    keyTakeaways: [
      'Pioneered sociology, demographic economics, and scientific historiography centuries before Auguste Comte',
      'Formulated the sociological concept of \'Asabiyyah (social solidarity and collective purpose)',
      'Identified how lower tax rates foster trade vitality while excessive taxation destroys empires'
    ],
    evidenceOrCitation: 'The Muqaddimah (An Introduction to History) by Ibn Khaldun.',
    iconName: 'Scale',
    quiz: {
      question: 'What is the title of Ibn Khaldun\'s groundbreaking masterwork that established sociology and economics?',
      options: ['The Republic', 'The Muqaddimah', 'The Prince', 'Das Kapital'],
      correct: 1,
      explanation: 'The Muqaddimah is universally celebrated as the foundational masterpiece of sociological and economic science.'
    }
  },

  // ==========================================
  // CATEGORY 5: PROPHETS & MESSENGERS (12)
  // ==========================================
  {
    id: 'prophet-adam',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Adam (Peace Be Upon Him)',
    subtitle: 'The Father of Humanity & Divine Grace',
    tag: 'First Prophet',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Adam was the first human being and the first prophet of God, created from clay into which Allah breathed the spirit of life. Given intellect and the names of all things, angels prostrated before him in veneration of God\'s creation, except Iblis (Satan) who refused out of racist arrogance. After eating from the forbidden tree, Adam and Hawwa (Eve) turned to God in sincere repentance and were completely forgiven without any hereditary curse.',
    keyTakeaways: [
      'Created with dignity and endowed with intellect and linguistic capacity',
      'Rebuked Iblis\'s pride ("I am better than him; you created me from fire and him from clay")',
      'Teaches that repentance brings immediate forgiveness; no original sin is passed to posterity'
    ],
    evidenceOrCitation: 'Surah Al-Baqarah (2:30-37): The creation, trial, and pardon of Adam.',
    iconName: 'Users',
    quiz: {
      question: 'What was the immediate response of Allah when Adam and Eve repented after slipping in Paradise?',
      options: ['He cursed their descendants', 'He accepted their repentance and forgiven them completely', 'He banished them forever with hatred', 'He turned them into stone'],
      correct: 1,
      explanation: 'The Quran emphasizes that Allah received Adam\'s words of repentance and graciously forgave him.'
    }
  },
  {
    id: 'prophet-nuh-noah',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Nuh / Noah (Peace Be Upon Him)',
    subtitle: '950 Years of Relentless Patience',
    tag: 'Patience',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Prophet Nuh preached monotheism day and night to an idolatrous society for 950 years with boundless patience. Despite being ridiculed and rejected by the haughty elite, he faithfully built the giant Ark far from the sea under divine command. When the Great Deluge came, only the humble believers and animal pairs were saved, emphasizing that spiritual righteousness transcends biological ancestry.',
    keyTakeaways: [
      'Preached for nearly a millennium without ever abandoning faith',
      'The Ark symbolizes divine rescue for those who trust in God',
      'Demonstrated that truth is not measured by the majority crowd'
    ],
    evidenceOrCitation: 'Surah Nuh (71:1-28) and Surah Hud (11:25-49).',
    iconName: 'Waves',
    quiz: {
      question: 'How long did Prophet Nuh call his people to monotheism according to Surah Al-Ankabut 29:14?',
      options: ['50 years', '120 years', '950 years', '2,000 years'],
      correct: 2,
      explanation: 'The Quran states in 29:14 that Prophet Nuh remained among his people for nine hundred and fifty years.'
    }
  },
  {
    id: 'prophet-ibrahim-abraham',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Ibrahim / Abraham (Peace Be Upon Him)',
    subtitle: 'Khalilullah: The Intimate Friend of God',
    tag: 'Father of Monotheism',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    arabicPhrase: 'وَٱتَّخَذَ ٱللَّهُ إِبْرَٰهِيمَ خَلِيلًۭا',
    arabicTranslation: 'And Allah took Abraham as an intimate friend.',
    content: 'Ibrahim (Abraham) is revered as the father of monotheism. Through logical deduction, he rejected the worship of stars, moon, sun, and man-made idols. Cast into a roaring furnace by King Nimrod, Allah commanded the fire: "Be cool and peaceful for Ibrahim." Alongside his son Ismail, he built the Kaaba in Makkah, establishing the timeless rites of Hajj and sacrifice.',
    keyTakeaways: [
      'Used pure rational inquiry to expose the absurdity of idol worship',
      'Tested with the supreme sacrifice of his son, rewarded with everlasting honor',
      'Both the Ishmaelite and Israelite branches of prophets descend from his lineage'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:51-70) and Surah Ibrahim (14:35-41).',
    iconName: 'Sun',
    quiz: {
      question: 'What special spiritual title was given to Prophet Ibrahim by Allah?',
      options: ['Kalimullah (Spoke to God)', 'Khalilullah (Intimate Friend of God)', 'Ruhullah (Spirit of God)', 'Sayyid al-Mursalin'],
      correct: 1,
      explanation: 'Surah An-Nisa 4:125 names Prophet Ibrahim as "Khalilullah"—the intimate friend of Allah.'
    }
  },
  {
    id: 'prophet-ismail-ishmael',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Ismail / Ishmael (Peace Be Upon Him)',
    subtitle: 'Trust, Sacrifice & The Well of Zamzam',
    tag: 'Obedience',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Left as an infant with his mother Hajar in the barren valley of Makkah, their desperate search for water between the hills of Safa and Marwah caused the miraculous Zamzam spring to gush forth. As a youth, Ismail exemplified unmatched trust when his father shared his vision of sacrifice, submitting peacefully to God\'s will. Together, father and son rebuilt the foundations of the sacred Kaaba.',
    keyTakeaways: [
      'The ancestor of Prophet Muhammad ﷺ through the northern Arab tribes',
      'The source of the sacred Zamzam spring that continues to quench millions of pilgrims',
      'The Sa\'i rite in Hajj commemorates his mother Hajar’s courageous resilience'
    ],
    evidenceOrCitation: 'Surah As-Saffat (37:101-107) and Surah Al-Baqarah (2:127).',
    iconName: 'Droplets',
    quiz: {
      question: 'Which miraculous well in Makkah gushed forth beneath infant Ismail’s feet?',
      options: ['The Well of Joseph', 'The Well of Zamzam', 'The Springs of Moses', 'The Siloam Pool'],
      correct: 1,
      explanation: 'The Well of Zamzam sprang forth miraculously in the desert to save infant Ismail and Hajar.'
    }
  },
  {
    id: 'prophet-yusuf-joseph',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Yusuf / Joseph (Peace Be Upon Him)',
    subtitle: 'From the Well to the Throne of Egypt',
    tag: 'Integrity',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Surah Yusuf is hailed as "Ahsan al-Qasas" (The Best of Stories). Betrayed by jealous brothers and thrown into a deep well, sold into slavery, falsely accused by Potiphar’s wife, and imprisoned unjustly for years, Yusuf remained steadfast, honest, and morally pure. Gifted with the interpretation of dreams, he rose to become the Grand Vizier of Egypt, saving millions from famine and generously forgiving his brothers.',
    keyTakeaways: [
      'Mastery over lust, temptation, and the allure of corrupt power',
      'Proof that patience and moral integrity transform tragedy into divine triumph',
      'Exemplified unconditional forgiveness: "No blame will there be upon you today"'
    ],
    evidenceOrCitation: 'Surah Yusuf (Chapter 12): The complete narrative of Joseph.',
    iconName: 'Star',
    quiz: {
      question: 'What did Prophet Yusuf say to his brothers when they finally recognized him in Egypt?',
      options: ['"You shall be executed"', '"No blame will there be upon you today; Allah will forgive you"', '"Pay back all my years in prison"', '"Leave Egypt immediately"'],
      correct: 1,
      explanation: 'Yusuf uttered the timeless words of mercy: "No blame will there be upon you today; Allah will forgive you."'
    }
  },
  {
    id: 'prophet-musa-moses',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Musa / Moses (Peace Be Upon Him)',
    subtitle: 'Confronting Tyranny with Divine Courage',
    tag: 'Courage',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    arabicPhrase: 'وَكَلَّمَ ٱللَّهُ مُوسَىٰ تَكْلِيمًۭا',
    arabicTranslation: 'And Allah spoke to Moses with [direct] speech.',
    content: 'Musa is the most frequently mentioned prophet in the Holy Quran (named 136 times). Saved as a baby floating in a basket on the Nile, raised in Pharaoh’s palace, and called by God at Mount Sinai, Musa spoke directly with Allah. He confronted the tyrant Pharaoh with miracles, demanded the emancipation of the Israelites, and led his people across the parted Red Sea.',
    keyTakeaways: [
      'The archetype of standing speaking truth to ruthless tyranny and systemic oppression',
      'Recipient of the Holy Torah (Tawrat) at Mount Sinai',
      'The Red Sea crossing marks the eternal defeat of arrogance by divine justice'
    ],
    evidenceOrCitation: 'Surah Al-Qasas (28:1-43), Surah Ta-Ha (20:9-98), and Surah Al-A’raf (7:103-162).',
    iconName: 'Shield',
    quiz: {
      question: 'Which prophet is mentioned by name most frequently in the Quran (136 times)?',
      options: ['Prophet Ibrahim', 'Prophet Musa (Moses)', 'Prophet Dawud', 'Prophet Yunus'],
      correct: 1,
      explanation: 'Prophet Musa (Moses) is the most frequently mentioned individual in the Quran, appearing 136 times.'
    }
  },
  {
    id: 'prophet-dawud-david',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Dawud / David (Peace Be Upon Him)',
    subtitle: 'Righteous Ruler, Psalms & Master Craftsman',
    tag: 'Justice',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Dawud was both an anointed prophet and a mighty, just king. He defeated the giant Goliath (Jalut) with humble faith, received the Zabur (Psalms), and was gifted with an enchanting voice that made the birds and mountains join him in glorifying God. God softened iron in his hands, allowing him to forge lightweight chainmail armor, earning his livelihood through honest manual labor.',
    keyTakeaways: [
      'Combined political rulership with deep spiritual humility and tears in worship',
      'Fasted every alternate day (the most beloved voluntary fast to Allah)',
      'Refused to live off treasury taxes, earning his living by making armor'
    ],
    evidenceOrCitation: 'Surah Saba (34:10-11) and Surah Sad (38:17-26).',
    iconName: 'Hammer',
    quiz: {
      question: 'What special property did Allah grant Prophet Dawud with regard to iron?',
      options: ['He turned it into gold', 'He softened iron in his hands to craft chainmail', 'He burned it to ashes', 'He made it float on air'],
      correct: 1,
      explanation: 'Surah Saba reveals that Allah softened iron for Dawud so he could weave pliable protective chainmail armor.'
    }
  },
  {
    id: 'prophet-sulaiman-solomon',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Sulaiman / Solomon (Peace Be Upon Him)',
    subtitle: 'Supreme Wisdom & Boundless Gratitude',
    tag: 'Wisdom',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Sulaiman was granted a kingdom unlike any other: dominion over winds, command of jinn, and the ability to understand the speech of birds and insects. When an ant warned its colony to take cover from his marching army, Sulaiman smiled with profound gratitude, praying that wealth and authority would never distract his heart from humble servitude to Allah.',
    keyTakeaways: [
      'Supreme earthly power never corrupted his personal devotion and humility',
      'Communicated with the animal kingdom and recognized the consciousness of creatures',
      'Convinced the Queen of Sheba (Bilqis) to embrace monotheism through wisdom'
    ],
    evidenceOrCitation: 'Surah An-Naml (27:15-44) and Surah Sad (38:30-40).',
    iconName: 'Crown',
    quiz: {
      question: 'How did Prophet Sulaiman react upon hearing the tiny ant warn its colony in the valley?',
      options: ['He crushed the anthill', 'He smiled and thanked God for His immense blessings', 'He rode away in anger', 'He ignored the sound'],
      correct: 1,
      explanation: 'Surah An-Naml 27:19 records that Sulaiman smiled joyfully and made heartfelt Dua of gratitude to God.'
    }
  },
  {
    id: 'prophet-ayyub-job',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Ayyub / Job (Peace Be Upon Him)',
    subtitle: 'The Paragorn of Unwavering Patience (Sabr)',
    tag: 'Patience',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    content: 'Ayyub was blessed with great wealth, healthy sons, and vast lands. In a test of faith, he lost his health to excruciating disease, his wealth, and his children. Throughout years of agony, he never cursed God or complained bitterly; his tongue remained moist with praise. When he finally prayed, "Adversity has touched me, and You are the Most Merciful of the merciful," Allah healed him completely.',
    keyTakeaways: [
      'The ultimate emblem of "Sabr Jameel" (beautiful, dignifying patience)',
      'Suffering in Islam is not divine hatred; it purifies the soul and elevates spiritual rank',
      'Restored with double his health, family, and prosperity following his patient ordeal'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:83-84) and Surah Sad (38:41-44).',
    iconName: 'Heart',
    quiz: {
      question: 'How did Prophet Ayyub address Allah during his severe physical affliction in Surah 21:83?',
      options: ['"Why have You abandoned me?"', '"Adversity has touched me, and You are the Most Merciful of the merciful"', '"Take my soul right now"', '"Punish my enemies"'],
      correct: 1,
      explanation: 'Ayyub displayed extraordinary etiquette, simply stating: "Adversity has touched me, and You are the Most Merciful."'
    }
  },
  {
    id: 'prophet-yunus-jonah',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Yunus / Jonah (Peace Be Upon Him)',
    subtitle: 'Dhun-Nun & The Prayer in Triple Darkness',
    tag: 'Repentance',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    arabicPhrase: 'لَّآ إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ',
    arabicTranslation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    content: 'Prophet Yunus left his disobedient town of Nineveh before receiving divine permission. Cast overboard from a storm-tossed ship, he was swallowed by a giant whale. In the triple darkness of the night, deep sea, and whale’s belly, Yunus uttered the supreme prayer of repentance: "La ilaha illa Anta, Subhanaka, inni kuntu minaz-zalimin." Allah heard his cry, commanded the whale to cast him safely upon the shore, and redeemed his entire city.',
    keyTakeaways: [
      'The famous Dua of Yunus is guaranteed by the Prophet ﷺ to alleviate desperate distress',
      'Combines pure monotheism, divine glorification, and honest admission of personal fault',
      'Proof that no situation is too dark or hopeless for divine rescue'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:87-88): The deliverance of Yunus from the belly of the whale.',
    iconName: 'Droplets',
    quiz: {
      question: 'What is the powerful prayer uttered by Prophet Yunus inside the belly of the whale?',
      options: ['"Save me from the storm"', '"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers"', '"Destroy my people"', '"Give me kingdom"'],
      correct: 1,
      explanation: 'Yunus\'s prayer combines Tawheed, glorification of Allah, and sincere humility before the Creator.'
    }
  },
  {
    id: 'prophet-isa-jesus',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Isa / Jesus (Peace Be Upon Him)',
    subtitle: 'The Messiah, Virgin Birth & Spirit from God',
    tag: 'Messiah',
    readingTime: '3 min',
    badge: 'Prophet of Allah',
    arabicPhrase: 'إِنَّمَا ٱلْمَسِيحُ عِيسَى ٱبْنُ مَرْيَمَ رَسُولُ ٱللَّهِ',
    arabicTranslation: 'The Messiah, Jesus, the son of Mary, was but a messenger of Allah.',
    content: 'In Islam, Jesus (Isa al-Masih) is one of the five greatest messengers of God (Ulu al-Azm). Muslims believe in his miraculous virgin birth to Maryam (Mary, the most honored woman in the Quran), his miracles performed by God\'s leave (healing the blind and leper, speaking in the cradle, raising the dead), and his status as the Messiah. The Quran clarifies that he was not crucified to death, but raised to heaven, and will return before the end of time to restore peace and justice.',
    keyTakeaways: [
      'Revered as the Messiah (Al-Masih) born to Virgin Mary without a human father',
      'All miracles were performed strictly "Bi-idhni-llah" (by the permission of Allah)',
      'Pure monotheist who called humanity to worship his Lord and their Lord alone'
    ],
    evidenceOrCitation: 'Surah Ali ‘Imran (3:45-59) and Surah Maryam (19:16-36).',
    iconName: 'Sparkles',
    quiz: {
      question: 'How is Prophet Isa (Jesus) described in Islamic theology regarding his nature?',
      options: ['A mythological figure', 'A beloved Messenger of God and the Messiah', 'The literal physical son of God', 'An ordinary philosopher'],
      correct: 1,
      explanation: 'Islam honors Jesus as a revered Prophet, Messenger, and the Messiah born to the Virgin Mary.'
    }
  },
  {
    id: 'prophet-muhammad-mercy',
    category: 'Prophets & Messengers',
    categoryId: 'prophets',
    title: 'Prophet Muhammad ﷺ',
    subtitle: 'The Seal of Prophets & A Mercy to All Worlds',
    tag: 'Final Messenger',
    readingTime: '4 min',
    badge: 'Final Prophet',
    arabicPhrase: 'وَمَآ أَرْسَلْنَـٰكَ إِلَّا رَحْمَةًۭ لِّلْعَـٰلَمِينَ',
    arabicTranslation: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.',
    content: 'Born in Makkah in 570 CE, Muhammad ﷺ was known even before revelation as Al-Amin (The Trustworthy). At age 40 in the Cave of Hira, the first revelation descended. Over 23 years, facing intense boycott, exile, and warfare, he transformed a fractured, war-torn tribal peninsula into an egalitarian civilization rooted in monotheism, literacy, justice, and compassion. His character was described as a living embodiment of the Quran.',
    keyTakeaways: [
      'The final messenger who completed and sealed divine revelation for all mankind',
      'Established the first written democratic constitution in history (The Charter of Medina)',
      'Forgave his persecutors upon the peaceful Conquest of Makkah without retribution'
    ],
    evidenceOrCitation: 'Surah Al-Anbiya (21:107): "And We have not sent you except as a mercy to the worlds."',
    iconName: 'Heart',
    quiz: {
      question: 'What title was Muhammad ﷺ known by among the people of Makkah before prophethood?',
      options: ['The Conqueror', 'Al-Amin (The Trustworthy) and Al-Sadiq (The Truthful)', 'The Royal Prince', 'The High Priest'],
      correct: 1,
      explanation: 'Due to his spotless integrity, even his future opponents called him Al-Amin (The Trustworthy).'
    }
  },

  // ==========================================
  // CATEGORY 6: NOBLE COMPANIONS (10)
  // ==========================================
  {
    id: 'abu-bakr-siddiq',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Abu Bakr as-Siddiq (RA)',
    subtitle: 'The Truthful & The First Caliph',
    tag: 'First Caliph',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Abu Bakr was the closest companion to the Prophet ﷺ and the first adult male to embrace Islam without a moment of hesitation. Known as As-Siddiq (The Truthful) for immediately believing the Isra and Mi\'raj, he spent his entire vast fortune freeing tortured slaves like Bilal. As the first Caliph, his steadfastness preserved the young Muslim commonwealth in its most perilous hour following the Prophet’s death.',
    keyTakeaways: [
      'Companionship highlighted in the Quran during the migration cave (Thawr)',
      'Purchased freedom for dozens of persecuted enslaved Muslims',
      'Famous inaugural address: "If I do well, assist me; if I do wrong, set me right."'
    ],
    evidenceOrCitation: 'Surah At-Tawbah (9:40): "The second of the two, when they were in the cave..."',
    iconName: 'Shield',
    quiz: {
      question: 'What did Abu Bakr famously declare to the citizens of Medina in his inaugural Caliph speech?',
      options: ['"Obey me unconditionally forever"', '"If I do well, help me; if I do wrong, set me right"', '"Pay me tribute"', '"I am infallible"'],
      correct: 1,
      explanation: 'Abu Bakr established accountability: "If I do well, assist me; if I deviate, correct me."'
    }
  },
  {
    id: 'umar-ibn-khattab',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Umar ibn al-Khattab (RA)',
    subtitle: 'Al-Faruq: The Architect of Justice & Welfare',
    tag: 'Second Caliph',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Umar was known as Al-Faruq (The One who Distinguishes Truth from Falsehood). During his ten-year caliphate, he instituted the world\'s first modern state welfare apparatus—establishing child benefits, unemployment pensions, professional courts, the Islamic Hijri calendar, and the public postal service. Despite ruling an empire stretching from Egypt to Persia, he wore patched clothes and slept on the floor under palm trees.',
    keyTakeaways: [
      'Instituted universal pensions for citizens of all faiths, including elderly Jewish and Christian subjects',
      'Established the public treasury (Bayt al-Mal), fire brigades, and police night patrols',
      'Personally patrolled the streets at night carrying flour sacks to feed starving widows'
    ],
    evidenceOrCitation: 'Historical records of the early Caliphate by Al-Tabari and Ibn Sa\'d.',
    iconName: 'Scale',
    quiz: {
      question: 'Which calendar system, still used by Muslims worldwide today, was established by Umar ibn al-Khattab?',
      options: ['Gregorian Calendar', 'Julian Calendar', 'The Hijri Calendar (dating from the Migration)', 'Solar Zodiac'],
      correct: 2,
      explanation: 'Umar established the Islamic Hijri calendar, beginning from the Prophet’s migration from Makkah to Medina.'
    }
  },
  {
    id: 'uthman-ibn-affan',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Uthman ibn Affan (RA)',
    subtitle: 'Dhun-Nurayn & Standardizer of the Mus’haf',
    tag: 'Third Caliph',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Uthman was renowned for his modesty, generosity, and gentleness. He financed the expansion of the Prophet’s Mosque, purchased the well of Ruma for the public, and fully equipped the army of Tabuk from his personal wealth. As the third Caliph, he took the monumental step of standardizing the written compilation of the Holy Quran (the Uthmanic Mus\'haf), preventing dialect variations from distorting revelation.',
    keyTakeaways: [
      'Married two of the Prophet’s daughters, earning the title Dhun-Nurayn (Possessor of Two Lights)',
      'Commissioned official standard copies of the Quran sent to all major global provinces',
      'Known for profound modesty; the Prophet ﷺ noted that even angels were shy in his presence'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: The compilation and standardization of the Uthmanic Mus\'haf.',
    iconName: 'BookOpen',
    quiz: {
      question: 'What crucial service to Islamic civilization did Caliph Uthman achieve regarding the Holy Quran?',
      options: ['He added musical notes', 'He produced the standardized official written Mus\'haf', 'He prohibited recitation', 'He translated it into Latin'],
      correct: 1,
      explanation: 'Uthman oversaw the definitive standard compilation of the written Quranic text, distributed across the provinces.'
    }
  },
  {
    id: 'ali-ibn-abi-talib',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Ali ibn Abi Talib (RA)',
    subtitle: 'The Gateway to the City of Knowledge',
    tag: 'Fourth Caliph',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Ali was the cousin and son-in-law of the Prophet ﷺ, married to Lady Fatima. Embracing Islam as a brave youth of ten, he slept in the Prophet’s bed on the night of migration to foil assassins. Famous for his unmatched battlefield courage, profound eloquence, and legal brilliance, the Prophet said of him: "I am the city of knowledge, and Ali is its gate."',
    keyTakeaways: [
      'Renowned for his supreme legal rulings, unmatched oratory, and poetic wisdom',
      'The fourth Rightly Guided Caliph (Al-Khulafa al-Rashidun)',
      'Authored celebrated letters on good governance emphasizing justice for all citizens'
    ],
    evidenceOrCitation: 'Jami` at-Tirmidhi: "I am the city of knowledge and Ali is its gate."',
    iconName: 'Zap',
    quiz: {
      question: 'Which phrase did Prophet Muhammad ﷺ use to describe the vast intellectual wisdom of Ali (RA)?',
      options: ['"Ali is the captain of ships"', '"I am the city of knowledge, and Ali is its gate"', '"Ali is the keeper of coins"', '"Ali is the royal prince"'],
      correct: 1,
      explanation: 'The Prophet ﷺ praised Ali\'s deep understanding saying: "I am the city of knowledge, and Ali is its gate."'
    }
  },
  {
    id: 'khadijah-bint-khuwaylid',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Khadijah bint Khuwaylid (RA)',
    subtitle: 'The Mother of Believers & First Supporter',
    tag: 'Mother of Believers',
    readingTime: '3 min',
    badge: 'Mother of Believers',
    content: 'Khadijah was a prominent, highly respected merchant princess in Makkah known as Al-Tahirah (The Pure). Recognizing Muhammad’s integrity, she proposed marriage. When the terrifying first revelation descended in Mount Hira, she embraced him, calmed his fears, and was the first person on Earth to accept Islam. She poured her vast fortune into defending the persecuted early Muslims.',
    keyTakeaways: [
      'The first human being to accept Islam and affirm the Prophet’s mission',
      'Prophet Muhammad’s only wife for 25 years until her death in the Year of Sorrow',
      'Received direct greetings of peace from Allah delivered by Archangel Gabriel'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: Archangel Gabriel conveying salam from Allah to Khadijah.',
    iconName: 'Heart',
    quiz: {
      question: 'Who was the very first person on Earth to embrace Islam and believe in Prophet Muhammad’s mission?',
      options: ['Abu Bakr', 'Khadijah bint Khuwaylid', 'Ali ibn Abi Talib', 'Zayd ibn Harithah'],
      correct: 1,
      explanation: 'Khadijah was the very first person on Earth to believe in and support the Prophet Muhammad ﷺ.'
    }
  },
  {
    id: 'aisha-bint-abi-bakr',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Aisha bint Abi Bakr (RA)',
    subtitle: 'The Scholar, Jurist & Preserver of Prophetic Sunnah',
    tag: 'Scholar',
    readingTime: '3 min',
    badge: 'Scholar',
    content: 'Aisha was one of the greatest intellectual luminaries of the Islamic world. Endowed with a photographic memory and razor-sharp intellect, she narrated over 2,210 authentic Hadiths covering governance, medicine, inheritance law, poetry, and family life. Senior male companions routinely traveled from across the empire to Medina to seek her authoritative legal rulings and theological verdicts.',
    keyTakeaways: [
      'Narrated over 2,200 Prophetic traditions preserving the intimate Sunnah of daily life',
      'Master of Islamic jurisprudence, comparative poetry, and classical medicine',
      'Taught hundreds of scholars, establishing a legacy of female intellectual mastery'
    ],
    evidenceOrCitation: 'Ibn Hajar al-Asqalani\'s biographical compendium Al-Isabah fi Tamyiz al-Sahabah.',
    iconName: 'BookOpen',
    quiz: {
      question: 'Approximately how many authentic Hadith narrations were transmitted by Aisha (RA)?',
      options: ['50', '200', 'Over 2,200', '10,000'],
      correct: 2,
      explanation: 'Aisha narrated over 2,210 authentic Hadiths, making her one of the most prolific scholars in history.'
    }
  },
  {
    id: 'bilal-ibn-rabah',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Bilal ibn Rabah (RA)',
    subtitle: 'Symbol of Human Dignity & Racial Equality',
    tag: 'Mu\'adhin',
    readingTime: '3 min',
    badge: 'Noble Companion',
    arabicPhrase: 'أَحَدٌ أَحَدٌ',
    arabicTranslation: 'One, One! [God is One].',
    content: 'Born into slavery, Bilal was brutally tortured under the scorching Arabian desert sun by his master Umayyah, who placed a heavy boulder on his chest to force him to renounce Islam. Bilal’s only response was the immortal defiance: "Ahad! Ahad!" (One! One God!). Freed by Abu Bakr, he was chosen by the Prophet ﷺ as the first Mu’adhin of Islam, later standing atop the conquered Kaaba to proclaim the Adhan.',
    keyTakeaways: [
      'Broke the shackles of Arabian tribal racism and social hierarchy',
      'His call to prayer symbolized that righteousness alone determines human worth in Islam',
      'Treasured companion whom Umar called "Our Master, freed by our Master"'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari and Sunan Ibn Majah.',
    iconName: 'HeartHandshake',
    quiz: {
      question: 'What words did Bilal (RA) repeatedly whisper while being tortured under the burning desert rock?',
      options: ['"Save me"', '"Ahad, Ahad" (God is One, One)', '"I surrender"', '"Makkah is great"'],
      correct: 1,
      explanation: 'Bilal demonstrated steadfast faith by declaring "Ahad, Ahad" (The One, The One!).'
    }
  },
  {
    id: 'salman-al-farsi',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Salman al-Farsi (RA)',
    subtitle: 'The Seeker of Truth & Trench Strategist',
    tag: 'Seeker',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Salman was a Persian noble who abandoned his family’s Zoroastrian fire-worship to seek the truth. Journeying through Syria and Iraq with Christian monks, he was betrayed and sold into slavery in Arabia. Recognizing the marks of prophethood on Muhammad ﷺ, he was freed. During the Battle of the Trench (Khandaq), Salman proposed digging an innovative defensive trench around Medina, saving the city from a massive coalition siege.',
    keyTakeaways: [
      'The archetype of the sincere truth-seeker crossing continents and hardships for God',
      'The military genius who introduced the Persian trench warfare tactic',
      'The Prophet ﷺ warmly honored him: "Salman is of us, the members of our household (Ahl al-Bayt)"'
    ],
    evidenceOrCitation: 'Ibn Ishaq\'s Sirat Rasul Allah and Sahih Muslim.',
    iconName: 'Compass',
    quiz: {
      question: 'What military defensive tactic did Salman al-Farsi suggest to protect Medina during the Coalition siege?',
      options: ['Building a stone wall', 'Digging a wide defensive trench (Khandaq)', 'Fleeing into the mountains', 'Naval battle'],
      correct: 1,
      explanation: 'Salman suggested excavating a deep protective trench around Medina, a tactic unfamiliar to Arabian warfare.'
    }
  },
  {
    id: 'khalid-ibn-walid',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Khalid ibn al-Walid (RA)',
    subtitle: 'Sayfullah: The Sword of Allah Unsheathed',
    tag: 'Military Leader',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Khalid was one of the greatest military commanders in human history, remaining undefeated in over 50 major battles against both the Persian Sassanid and Byzantine Roman empires. Bestowed the title "Sayfullah" (The Sword of Allah) by the Prophet ﷺ, his crowning moral victory occurred when Caliph Umar relieved him of supreme command; Khalid accepted demotion to a simple foot soldier with absolute humility, fighting solely for Allah.',
    keyTakeaways: [
      'Remained completely undefeated in military campaigns across his entire life',
      'Master of psychological warfare, mobility, and cavalry flanking maneuvers',
      'Exemplified selfless sincerity by serving as a common soldier without resentment when demoted'
    ],
    evidenceOrCitation: 'Tarikh al-Rusul wal-Muluk by Al-Tabari.',
    iconName: 'Shield',
    quiz: {
      question: 'What honorable title was bestowed upon Khalid ibn al-Walid by Prophet Muhammad ﷺ?',
      options: ['The Lion of the Desert', 'Sayfullah (The Sword of Allah)', 'The Emperor of the East', 'The Golden Knight'],
      correct: 1,
      explanation: 'The Prophet ﷺ called Khalid "Sayfullah al-Maslul" (The Unsheathed Sword of Allah).'
    }
  },
  {
    id: 'abu-hurairah-narrator',
    category: 'Noble Companions',
    categoryId: 'companions',
    title: 'Abu Hurairah (RA)',
    subtitle: 'The Premier Preserver of Prophetic Hadith',
    tag: 'Hadith Master',
    readingTime: '3 min',
    badge: 'Noble Companion',
    content: 'Abd al-Rahman ibn Sakhr ad-Dawsi was affectionately nicknamed Abu Hurairah (Father of the Kitten) by the Prophet ﷺ because of his tender care for a small stray cat. A resident of the impoverished Suffah (the bench in the Prophet\'s Mosque), he dedicated his entire existence to accompanying the Prophet day and night. Blessed with an infallible memory through the Prophet’s Dua, he narrated 5,374 Hadiths.',
    keyTakeaways: [
      'The single most prolific narrator of authentic Prophetic Hadith in history',
      'Chose poverty and hunger in order to remain full-time in the Prophet’s study circle',
      'Symbol of gentleness toward animals and meticulous academic preservation'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: Abu Hurairah explaining his dedication to learning compared to traders.',
    iconName: 'Heart',
    quiz: {
      question: 'Why was Abu Hurairah given his famous affectionate nickname by the Prophet ﷺ?',
      options: ['He was fast like a falcon', 'He gently cared for a small stray kitten in his sleeve', 'He lived on a mountain', 'He had cat-like eyes'],
      correct: 1,
      explanation: 'He earned the nickname "Abu Hurairah" (Father of the Kitten) due to his loving affection for a pet cat.'
    }
  },

  // ==========================================
  // CATEGORY 7: ETHICS & CHARACTER (10)
  // ==========================================
  {
    id: 'ihsan-spiritual-excellence',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Ihsan: Spiritual Excellence',
    subtitle: 'Worshiping as if You See Him',
    tag: 'Spiritual Summit',
    readingTime: '3 min',
    badge: 'Highest Station',
    arabicPhrase: 'أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ',
    arabicTranslation: 'To worship Allah as if you see Him, and if you do not see Him, [know that] He sees you.',
    content: 'Ihsan is the absolute summit of faith in Islam, beyond outward Islam and doctrinal Iman. Defined in the famous Hadith of Gabriel, Ihsan means performing every deed, prayer, craft, and human interaction with total awareness of divine presence: "To worship Allah as if you see Him; and though you do not see Him, He sees you." It elevates routine actions into masterpieces of beauty.',
    keyTakeaways: [
      'The highest of the three dimensions of religion: Islam, Iman, and Ihsan',
      'Eliminates duplicity and hypocrisy; transforms character in private and public',
      'Inspires excellence, aesthetic care, and moral mastery in all work'
    ],
    evidenceOrCitation: 'Sahih Muslim: The Hadith of Gabriel defining Islam, Iman, and Ihsan.',
    iconName: 'Sparkles',
    quiz: {
      question: 'According to the Hadith of Gabriel, how is the spiritual station of Ihsan defined?',
      options: ['Reciting the entire Quran in one hour', 'Worshiping Allah as if you see Him, for He sees you', 'Building a hundred cities', 'Traveling to every mountain'],
      correct: 1,
      explanation: 'Ihsan is worshiping Allah with supreme mindfulness as though you see Him, knowing He always sees you.'
    }
  },
  {
    id: 'sabr-patience-resilience',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Sabr: Active Patience & Resilience',
    subtitle: 'The Unbreakable Anchor of the Soul',
    tag: 'Virtue',
    readingTime: '3 min',
    arabicPhrase: 'إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ',
    arabicTranslation: 'Indeed, Allah is with the patient.',
    content: 'Sabr is often translated as patience, but its true Arabic essence encompasses active perseverance, emotional restraint, steadfastness under adversity, and moral courage to avoid wrongdoing. The Quran notes that the patient will receive their reward without measure. It is not passive resignation; it is holding the steering wheel firmly in a storm.',
    keyTakeaways: [
      'Three dimensions: patience in obeying God, patience in avoiding sin, and patience in adversity',
      'Prevents rash emotional outbursts and despair during life tragedies',
      'The Quran promises divine company: "Indeed, Allah is with the patient"'
    ],
    evidenceOrCitation: 'Surah Az-Zumar (39:10): "Only those who are patient will be given their reward without account."',
    iconName: 'Shield',
    quiz: {
      question: 'How does the Quran describe the reward of those who embody true Sabr (patience)?',
      options: ['Limited to ten coins', 'Paid without measure or account (Bi-ghayri hisab)', 'Delayed for 1,000 years', 'Given only to kings'],
      correct: 1,
      explanation: 'Surah Az-Zumar 39:10 states that the patient receive their reward without measure (Bi-ghayri hisab).'
    }
  },
  {
    id: 'shukr-gratitude-catalyst',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Shukr: Gratitude as Abundance',
    subtitle: 'The Spiritual Antidote to Discontent',
    tag: 'Gratitude',
    readingTime: '2 min',
    arabicPhrase: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    arabicTranslation: 'If you are grateful, I will surely increase you [in favor].',
    content: 'Gratitude (Shukr) in Islam is expressed through three dimensions: recognition in the heart that all blessings originate from Allah, praise on the tongue (Alhamdulillah), and utilizing one’s physical health, time, and resources in noble ways. Allah promises that sincere gratitude directly triggers the increase of both spiritual and worldly blessings.',
    keyTakeaways: [
      'Cures psychological envy, entitlement, and persistent consumer discontent',
      'Direct divine equation: gratitude yields guaranteed increase',
      'Prophet Muhammad ﷺ prayed late into the night simply to be "a grateful servant"'
    ],
    evidenceOrCitation: 'Surah Ibrahim (14:7): "If you are grateful, I will surely increase you."',
    iconName: 'Heart',
    quiz: {
      question: 'What divine promise is made in Surah Ibrahim 14:7 to those who express sincere Shukr (gratitude)?',
      options: ['They will never sleep', 'Allah will surely increase them in blessings', 'They will rule an empire', 'They will never feel thirst'],
      correct: 1,
      explanation: 'Allah promises: "If you are grateful, I will surely increase you in favor."'
    }
  },
  {
    id: 'sidq-truthfulness',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Sidq: Truthfulness in Speech & Deed',
    subtitle: 'The Backbone of Moral Integrity',
    tag: 'Integrity',
    readingTime: '2 min',
    content: 'Sidq is uncompromising honesty in words, intentions, and commitments. The Prophet ﷺ taught: "Truthfulness leads to righteousness, and righteousness leads to Paradise." A person continues to speak truth until they are written with God as a Siddiq (thoroughly truthful). Hypocrisy and lying, on the other hand, corrode the soul and erode community trust.',
    keyTakeaways: [
      'Prohibits lying, deceit, exaggeration, and false business promises',
      'Internal truthfulness means aligning one\'s private character with public reputation',
      'The cornerstone of all personal honor and lasting social relationships'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: "Hold fast to truthfulness, for truthfulness leads to righteousness..."',
    iconName: 'Scale',
    quiz: {
      question: 'What does consistent truthfulness ultimately lead to according to Prophetic guidance?',
      options: ['Financial bankruptcy', 'Righteousness and Paradise', 'Being disliked by everyone', 'Loss of memory'],
      correct: 1,
      explanation: 'The Prophet ﷺ taught: "Truthfulness leads to righteousness, and righteousness leads to Paradise."'
    }
  },
  {
    id: 'haya-modesty-dignity',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Haya: Modesty, Decency & Self-Respect',
    subtitle: 'The Distinctive Ornament of Islam',
    tag: 'Modesty',
    readingTime: '2 min',
    content: 'Haya is a comprehensive virtue that encompasses modesty, dignity, shame before God, and healthy self-respect. It discourages vulgarity, obscenity, and shameless exploitation of human bodies. The Prophet ﷺ stated: "Every religion has a distinct moral character, and the moral character of Islam is Haya." Far from timidity, Haya is inner strength that guards dignity.',
    keyTakeaways: [
      'Reflected in dignified speech, modest attire, and pure social conduct',
      'Protects the sanctity of the human gaze and interpersonal boundaries',
      'The Prophet ﷺ said: "Haya brings nothing except goodness"'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: "Haya (modesty) does not bring anything except good."',
    iconName: 'Shield',
    quiz: {
      question: 'What did Prophet Muhammad ﷺ declare to be the defining moral character of Islam?',
      options: ['Ambition', 'Haya (Modesty and Decency)', 'Asceticism', 'Physical force'],
      correct: 1,
      explanation: 'The Prophet ﷺ stated: "The moral character of Islam is Haya (modesty and dignity)."'
    }
  },
  {
    id: 'birr-al-walidayn-parents',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Birr al-Walidayn: Honoring Parents',
    subtitle: 'Second Only to the Worship of God',
    tag: 'Family',
    readingTime: '3 min',
    arabicPhrase: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوٓا۟ إِلَّآ إِيَّاهُ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا',
    arabicTranslation: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment.',
    content: 'In multiple Quranic verses, honoring parents is mentioned immediately after monotheism itself. Even if parents hold opposing beliefs, treating them with gentleness, gratitude, and mercy is obligatory. The Quran explicitly commands never to utter even "Uff" (an expression of slight annoyance) to aging parents, and highlights the supreme status of mothers.',
    keyTakeaways: [
      'The mother is accorded triple priority in companionship and affectionate care',
      'Prohibits any harsh tone or dismissive word toward elderly parents',
      'A primary highway to divine pardon and entry into Paradise'
    ],
    evidenceOrCitation: 'Surah Al-Isra (17:23-24): "Do not say to them so much as \'uff\' and do not repel them but speak to them a noble word."',
    iconName: 'Heart',
    quiz: {
      question: 'How many times did the Prophet ﷺ repeat "Your mother" when asked who deserves the best companionship?',
      options: ['One time', 'Two times', 'Three times', 'Five times'],
      correct: 2,
      explanation: 'The Prophet ﷺ repeated "Your mother" three consecutive times before adding "then your father."'
    }
  },
  {
    id: 'silat-ar-rahim-kinship',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Silat ar-Rahim: Upholding Family Ties',
    subtitle: 'Healing the Bonds of Blood',
    tag: 'Family Ties',
    readingTime: '2 min',
    content: 'The word for womb in Arabic (Rahim) is derived directly from God\'s attribute Ar-Rahman (The Merciful). Upholding kinship ties—even with distant or estranged relatives—is a non-negotiable spiritual mandate. True upholding of ties is not merely reciprocating visits; it is reaching out with kindness and reconciliation to the relative who cuts you off.',
    keyTakeaways: [
      'Severing kinship ties is counted among major moral sins in Islamic law',
      'Prophet ﷺ taught that maintaining kinship prolongs life and expands provision',
      'Reconciliation and forgiveness take precedence over stubborn pride'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: "The one who maintains ties is not the one who merely reciprocates, but the one who re-establishes ties when they are severed."',
    iconName: 'HeartHandshake',
    quiz: {
      question: 'Who is the true maintainer of kinship ties according to Sahih al-Bukhari?',
      options: ['The one who pays money only', 'The one who reconnects when the relationship has been severed', 'The one who attends weddings only', 'The oldest family member'],
      correct: 1,
      explanation: 'The Prophet ﷺ taught that true virtue lies in reconnecting with the relative who has broken ties.'
    }
  },
  {
    id: 'controlling-anger-hilm',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Kadh al-Ghaydh: Mastery Over Anger',
    subtitle: 'True Strength is Emotional Restraint',
    tag: 'Self-Control',
    readingTime: '2 min',
    content: 'When a man repeatedly asked the Prophet ﷺ for life counsel, he gave the concise instruction: "Do not get angry." The Prophet redefined masculine strength: "The strong person is not the one who can wrestle his opponents down; the truly strong person is the one who controls himself in a fit of rage." Practical remedies include changing posture, seeking refuge in God, and performing Wudu.',
    keyTakeaways: [
      'Redefines heroic strength from physical combat to emotional self-mastery',
      'Anger impairs judgment and destroys families and community peace',
      'Those who swallow their anger are praised by name in Quran 3:134'
    ],
    evidenceOrCitation: 'Surah Ali ‘Imran (3:134): "...and who restrain anger and who pardon the people - and Allah loves the doers of good."',
    iconName: 'Shield',
    quiz: {
      question: 'How did Prophet Muhammad ﷺ define a genuinely strong person?',
      options: ['The fastest runner', 'The wealthiest merchant', 'The one who controls himself during anger', 'The one who defeats wrestlers'],
      correct: 2,
      explanation: 'The Prophet ﷺ taught: "The strong is not the good wrestler; rather, the strong is the one who controls himself when angry."'
    }
  },
  {
    id: 'tawbah-sincere-repentance',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Tawbah: The Open Door of Repentance',
    subtitle: 'Divine Mercy Without Barriers',
    tag: 'Mercy',
    readingTime: '3 min',
    arabicPhrase: 'قُلْ يَـٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ',
    arabicTranslation: 'Say, "O My servants who have transgressed against themselves, do not despair of the mercy of Allah."',
    content: 'No sin is beyond God\'s forgiveness except dying upon unrepentant polytheism. Sincere repentance (Tawbah Nasuh) requires four straightforward steps: feeling immediate remorse, stopping the sin, resolving never to repeat it, and returning any stolen rights to human victims. Islam rejects hopelessness: no matter how stained a past may be, sincere repentance resets the soul to complete purity.',
    keyTakeaways: [
      'Rejects the concept that one is ever permanently irredeemable or cursed',
      'Allah turns sins into good deeds for those who truly repent and reform (Quran 25:70)',
      'The Prophet ﷺ made Istighfar (seeking pardon) over 70 times a day as an example'
    ],
    evidenceOrCitation: 'Surah Az-Zumar (39:53): "Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
    iconName: 'RotateCcw',
    quiz: {
      question: 'What does Surah Az-Zumar 39:53 explicitly command those who have committed many sins?',
      options: ['Give up hope completely', 'Never despair of the mercy of Allah', 'Wait until old age to pray', 'Pay a priest for absolution'],
      correct: 1,
      explanation: 'The verse proclaims: "Do not despair of the mercy of Allah; indeed, Allah forgives all sins."'
    }
  },
  {
    id: 'tawadu-humility-vs-kibr',
    category: 'Ethics & Character',
    categoryId: 'ethics',
    title: 'Tawadu’: Humility vs. Arrogance (Kibr)',
    subtitle: 'Walking Lightly Upon the Earth',
    tag: 'Humility',
    readingTime: '2 min',
    content: 'Arrogance (Kibr) is the fatal spiritual disease that caused Iblis to fall from grace. The Prophet ﷺ defined arrogance not as wearing clean garments, but as "rejecting the truth and looking down upon other people." Conversely, humility (Tawadu\') elevates a person before God. The servants of the Most Merciful are described as those who walk upon the earth with gentle dignity.',
    keyTakeaways: [
      'The Prophet ﷺ said: "Whoever humbles himself for Allah, Allah elevates him"',
      'No one enters Paradise who has an atom\'s weight of arrogance in their heart',
      'Realized through self-reflection and service to the poor and vulnerable'
    ],
    evidenceOrCitation: 'Surah Al-Furqan (25:63): "And the servants of the Most Merciful are those who walk upon the earth easily and gently."',
    iconName: 'Leaf',
    quiz: {
      question: 'How did Prophet Muhammad ﷺ specifically define the essence of Kibr (arrogance)?',
      options: ['Wearing expensive clean clothes', 'Rejecting the truth and looking down upon other people', 'Speaking many foreign languages', 'Owning a large house'],
      correct: 1,
      explanation: 'The Prophet ﷺ clarified: "Arrogance is rejecting the truth and despising people."'
    }
  },

  // ==========================================
  // CATEGORY 8: MIND, JUSTICE & SOCIETY (10)
  // ==========================================
  {
    id: 'seeking-knowledge-obligation',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Seeking Knowledge: A Sacred Obligation',
    subtitle: 'From Iqra to Modern Research',
    tag: 'Education',
    readingTime: '3 min',
    badge: 'Core Duty',
    arabicPhrase: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    arabicTranslation: 'Read in the name of your Lord who created.',
    content: 'The very first word revealed to Prophet Muhammad ﷺ was not "Pray", "Fight", or "Fast"; it was "Iqra!" (Read / Recite!). Seeking knowledge is an obligatory duty (Fard) upon every Muslim man and woman. Islam integrates religious and scientific inquiry: studying medicine, astronomy, mathematics, and agriculture is recognized as collective communal duty (Fard Kifayah) that serves creation.',
    keyTakeaways: [
      'The inaugural revelation of the Quran honored literacy, reading, and the pen',
      'Gender equality in scholarship: compulsory for both men and women',
      'The ink of the scholar was celebrated alongside the sacrifices of the martyrs'
    ],
    evidenceOrCitation: 'Sunan Ibn Majah: "Seeking knowledge is an obligation upon every Muslim."',
    iconName: 'BookOpen',
    quiz: {
      question: 'What was the very first word of the Holy Quran revealed to Prophet Muhammad ﷺ?',
      options: ['Pray', 'Read (Iqra)', 'Fight', 'Rejoice'],
      correct: 1,
      explanation: 'The very first word revealed in the Cave of Hira was "Iqra" (Read!).'
    }
  },
  {
    id: 'adl-justice-and-equality',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Adl: Absolute Justice & Impartial Law',
    subtitle: 'Even Against Oneself or Kin',
    tag: 'Justice',
    readingTime: '3 min',
    badge: 'Justice',
    arabicPhrase: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُونُوا۟ قَوَّٰمِينَ بِٱلْقِسْطِ شُهَدَآءَ لِلَّهِ وَلَوْ عَلَىٰٓ أَنفُسِكُمْ',
    arabicTranslation: 'O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents.',
    content: 'The Faculty of Law at Harvard University famously engraved Surah An-Nisa verse 135 at the entrance of its library as one of the greatest historic expressions of justice in human history. Islamic justice demands complete impartiality: law applies equally to kings and commoners. When a noblewoman from the prominent Makhzum clan was convicted of theft, the Prophet ﷺ famously declared: "Even if Fatimah, the daughter of Muhammad, were to steal, I would execute the law upon her."',
    keyTakeaways: [
      'Inscribed on the entrance walls of Harvard Law School as an archetype of justice',
      'Bars discrimination, nepotism, tribal bias, and double standards',
      'Justice must be extended even toward bitter enemies (Quran 5:8)'
    ],
    evidenceOrCitation: 'Surah An-Nisa (4:135) and Surah Al-Ma\'idah (5:8).',
    iconName: 'Scale',
    quiz: {
      question: 'Which prominent world university inscribed Surah An-Nisa 4:135 on its library entrance as a historic tribute to justice?',
      options: ['Oxford University', 'Harvard Law School', 'Tokyo University', 'Cambridge University'],
      correct: 1,
      explanation: 'Harvard Law School installed Surah An-Nisa 4:135 on its library facade as a testament to supreme justice.'
    }
  },
  {
    id: 'environmental-stewardship',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Khilafah: Environmental Stewardship',
    subtitle: 'Custodians of the Earth',
    tag: 'Ecology',
    readingTime: '3 min',
    content: 'Humans are not the tyrannical owners of planet Earth; they are appointed as Khulafa (custodians and trustees) accountable before God for its ecological care. Prophet Muhammad ﷺ prohibited wasting water even when performing ablution beside a flowing river, forbade cutting down fruit-bearing trees during war, and proclaimed: "Even if the Day of Resurrection is established and one of you has a palm shoot in his hand, let him plant it."',
    keyTakeaways: [
      'Rejects reckless exploitation of natural resources and habitat pollution',
      'The prophetic green ethic: continuous tree planting as Sadaqah Jariyah',
      'Water conservation is mandated even when surrounded by abundant rivers'
    ],
    evidenceOrCitation: 'Musnad Ahmad: "If the Final Hour arrives and one of you holds a sapling, if he can plant it before standing, let him do so."',
    iconName: 'Leaf',
    quiz: {
      question: 'What did the Prophet ﷺ instruct believers to do even if the Day of Resurrection begins and they hold a tree sapling?',
      options: ['Drop it and run', 'Plant it if they are able to', 'Burn it for warmth', 'Store it in water'],
      correct: 1,
      explanation: 'Prophet Muhammad ﷺ urged planting the sapling even if the Final Hour strikes, demonstrating eternal hope and ecological care.'
    }
  },
  {
    id: 'animal-welfare-traditions',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Animal Welfare & Rights in Islam',
    subtitle: 'Compassion to Every Living Creature',
    tag: 'Animal Rights',
    readingTime: '3 min',
    content: 'Centuries before modern animal cruelty prevention societies, Islam legally mandated animal welfare. Prophet Muhammad ﷺ told of a sinful woman forgiven of all her sins and admitted to Paradise solely for drawing water from a deep well with her shoe to quench a dying, thirsty dog. Conversely, a pious woman was condemned for starving a trapped cat to death. Causing unnecessary pain during slaughter or sharpening blades in front of animals is strictly forbidden.',
    keyTakeaways: [
      'Animals are sentient communities praising God in their own tongues (Quran 6:38)',
      'Inflicting torture, starvation, or overburdening animals is a grave sin',
      'Kindness to any living being carries guaranteed divine reward'
    ],
    evidenceOrCitation: 'Sahih al-Bukhari: "There is a reward for serving any living being (Fi kulli kabidin ratbatin ajr)."',
    iconName: 'Heart',
    quiz: {
      question: 'Why was the sinful individual forgiven and admitted to Paradise in the famous Hadith in Sahih al-Bukhari?',
      options: ['Winning a great race', 'Quenching the thirst of a dying dog with water from a well', 'Building a gold monument', 'Writing a long book'],
      correct: 1,
      explanation: 'Prophet Muhammad ﷺ taught that Allah forgave her sins because of her selfless compassion to a thirsty dog.'
    }
  },
  {
    id: 'ethical-commerce-riba',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Ethical Commerce & Prohibition of Usury (Riba)',
    subtitle: 'Productive Economy vs. Debt Exploitation',
    tag: 'Economics',
    readingTime: '3 min',
    content: 'Islamic economic theory strictly prohibits Riba (usury, predetermined interest on loans) because it concentrates wealth in the hands of lenders while forcing borrowers to shoulder all economic risk. Instead, Islam mandates profit-and-loss sharing (Mudarabah & Musharakah), asset-backed trade, fair weighing, complete transparency in contracts, and prohibition of deceptive fraud (Gharar).',
    keyTakeaways: [
      'Encourages real asset-backed entrepreneurship rather than speculative debt bubbles',
      'Mandates fair weights, measures, and honest disclosure of product defects',
      'Shields impoverished borrowers from predatory compound interest cycles'
    ],
    evidenceOrCitation: 'Surah Al-Baqarah (2:275): "Allah has permitted trade and has forbidden interest."',
    iconName: 'Coins',
    quiz: {
      question: 'What fundamental economic principle distinguishes Islamic finance from usurious debt lending?',
      options: ['Prohibiting all forms of trade', 'Prohibition of interest (Riba) and reliance on risk/profit sharing', 'Mandatory state ownership of all businesses', 'Cash payments only'],
      correct: 1,
      explanation: 'Islam permits genuine commerce while strictly prohibiting usury (Riba), mandating shared risk and ethical investment.'
    }
  },
  {
    id: 'womens-rights-islamic-law',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Women’s Rights in Islamic Law',
    subtitle: 'Historic Empowerment & Independent Identity',
    tag: 'Human Rights',
    readingTime: '3 min',
    content: 'In 7th-century Arabia, infant girls were buried alive and women had no inheritance rights. Islam completely outlawed female infanticide and established women’s legal autonomy: the unconditional right to own, manage, and inherit property independently from husbands or fathers; the right to choose their spouse; the right to divorce (Khula); and retaining their own maiden surname after marriage—rights only attained in Western legal systems in the late 19th and 20th centuries.',
    keyTakeaways: [
      'Absolute financial independence: a woman’s wealth is entirely her own',
      'Guaranteed shares in inheritance stipulated in the Quran',
      'Spiritual equality: rewards and accountability before God are completely identical to men'
    ],
    evidenceOrCitation: 'Surah Al-Ahzab (33:35): Explicit spiritual equality between Muslim men and Muslim women.',
    iconName: 'Users',
    quiz: {
      question: 'What property right did Islamic law grant women in the 7th century that was unprecedented in the pre-modern world?',
      options: ['No property rights', 'Full independent ownership and management of property and income without spousal veto', 'Property belongs to state', 'Only inheriting half a coin'],
      correct: 1,
      explanation: 'Islam established complete financial independence for women, allowing them to own and manage assets independently.'
    }
  },
  {
    id: 'interfaith-relations-medina',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Interfaith Harmony & The Constitution of Medina',
    subtitle: 'The First Multi-Religious Constitutional State',
    tag: 'Pluralism',
    readingTime: '3 min',
    content: 'Upon arriving in Medina in 622 CE, Prophet Muhammad ﷺ drafted the Constitution of Medina (Sahifat al-Madinah). It established a pluralistic federal commonwealth where Muslims, Jews, and other tribes were declared "one unified political community (Ummah Wahidah)" with complete religious freedom, mutual defense obligations, and protected places of worship. The Quran explicitly commands: "There is no compulsion in religion."',
    keyTakeaways: [
      'Guaranteed absolute religious freedom for Jewish and non-Muslim communities',
      'Universal rule of law: defense of the commonwealth was shared equally by all citizens',
      'Rejects forced conversions: "There is no compulsion in religion" (Quran 2:256)'
    ],
    evidenceOrCitation: 'Surah Al-Baqarah (2:256): "There shall be no compulsion in religion."' ,
    iconName: 'Globe',
    quiz: {
      question: 'What famous principle regarding religious belief is established in Surah Al-Baqarah 2:256?',
      options: ['Compulsory conversion by law', '"There is no compulsion in religion"', 'Isolation from neighbors', 'Uniformity of rituals'],
      correct: 1,
      explanation: 'The Quran unambiguously states: "There shall be no compulsion in religion."'
    }
  },
  {
    id: 'halal-and-tayyib',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Halal & Tayyib: Pure & Wholesome Living',
    subtitle: 'Conscious Consumption & Bodily Sanctity',
    tag: 'Nutrition & Health',
    readingTime: '2 min',
    arabicPhrase: 'كُلُوا۟ مِمَّا فِى ٱلْأَرْضِ حَلَـٰلًۭا طَيِّبًۭا',
    arabicTranslation: 'Eat from whatever is on earth [that is] lawful and wholesome.',
    content: 'Islam pairs the concept of Halal (permissible under law) with Tayyib (pure, nutritious, organic, ethically sourced). It prohibits toxic substances, intoxicants (alcohol and drugs that harm cognitive clarity), carrion, and blood. Islam honors the human body as a sacred trust (Amanah) from God that must be nurtured with nourishing sustenance, exercise, and mental balance.',
    keyTakeaways: [
      'Prohibits mind-altering intoxicants and harmful narcotics',
      'Requires ethical, humane treatment and invocation of God\'s name during animal processing',
      'Promotes balanced lifestyle: moderation in eating, avoiding gluttony and waste'
    ],
    evidenceOrCitation: 'Surah Al-Baqarah (2:168): "O mankind, eat from whatever is on earth that is lawful and good."',
    iconName: 'Leaf',
    quiz: {
      question: 'What does the Quranic term "Tayyib" denote when coupled with Halal food?',
      options: ['Fast food', 'Wholesome, pure, and ethically produced', 'Expensive and rare', 'Frozen'],
      correct: 1,
      explanation: '"Tayyib" means clean, wholesome, nutritious, and ethically sound in preparation.'
    }
  },
  {
    id: 'sakinah-mental-peace',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Sakinah: Mental Tranquility & Inner Healing',
    subtitle: 'Spiritual Remedies for Anxiety and Grief',
    tag: 'Mental Health',
    readingTime: '3 min',
    content: 'Modern society struggles with epidemic rates of chronic anxiety, loneliness, and depression. The Quran introduces the concept of Sakinah—a divine, soothing tranquility that descends into the hearts of believers during turbulence. Islam promotes holistic well-being: pairing prayer, contemplation (Tafakkur), and Quran recitation with practical medical care, counseling, and communal support.',
    keyTakeaways: [
      'Prophet Muhammad ﷺ instructed: "Seek medical treatment, for God has sent down a cure for every disease"',
      'Recognizes mental hardship as real trials, not simply lack of faith',
      'Dhikr, deep breathing, and connection with nature anchor the troubled spirit'
    ],
    evidenceOrCitation: 'Surah Al-Fath (48:4): "It is He who sent down tranquility into the hearts of the believers."',
    iconName: 'Heart',
    quiz: {
      question: 'What was the Prophetic medical instruction regarding illness and healthcare in Sunan Abi Dawud?',
      options: ['Avoid doctors completely', '"Seek medical treatment, for Allah has made a remedy for every illness"', 'Rely on dreams only', 'Fast indefinitely'],
      correct: 1,
      explanation: 'The Prophet ﷺ commanded seeking medical therapy, confirming that God created medical cures for ailments.'
    }
  },
  {
    id: 'itqan-work-excellence',
    category: 'Mind, Justice & Society',
    categoryId: 'society',
    title: 'Al-Itqan: Professional Mastery as Worship',
    subtitle: 'The Ethic of Uncompromising Quality',
    tag: 'Excellence',
    readingTime: '2 min',
    content: 'In Islam, ordinary professional labor—whether engineering software, designing buildings, nursing patients, or sweeping streets—is elevated to worship if done with pure intention and Al-Itqan (meticulous craftsmanship and excellence). Prophet Muhammad ﷺ declared: "Verily, Allah loves that when any one of you does a job, they perform it with perfection (Itqan)."',
    keyTakeaways: [
      'Eliminates lazy shortcuts, fraudulent work, and substandard execution',
      'Transforms daily job careers into spiritually rewarded acts of worship',
      'Cultivates dedication to lifelong skill advancement and social benefit'
    ],
    evidenceOrCitation: 'Shu\'ab al-Iman by Al-Bayhaqi: "Allah loves that when one of you does a deed, he perfects it (Itqan)."',
    iconName: 'Zap',
    quiz: {
      question: 'What does the Islamic concept of "Al-Itqan" demand in one\'s daily profession and crafts?',
      options: ['Doing the bare minimum', 'Striving for perfection, excellence, and thorough mastery', 'Working without compensation', 'Overcharging clients'],
      correct: 1,
      explanation: 'Al-Itqan is the standard of meticulous excellence, thoroughness, and quality in all endeavors.'
    }
  }
];
