import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sun, Moon, Cloud, Book, Sparkles, Compass, Atom, Dna, Globe, Leaf, Mountain, Wind, Droplets, Layers, Fingerprint, Target, Users, BookOpen, Clock, Coins, Utensils, MapPin, Scale, Coffee, Calendar, HeartHandshake, Undo, GraduationCap, HelpCircle, TrendingUp, Brain, Building, UserCheck, MessageSquare, Shield, Zap, Maximize, Orbit, Hammer, Baby, Thermometer, CloudRain, Waves, Hexagon, Bug, Network, Trophy, CheckCircle, XCircle, RotateCcw, Play, Volume2, Square } from 'lucide-react';
import { Achievement } from '../../data/achievements';
import { useGamification } from '../../contexts/GamificationContext';
import { playAiVoice, stopCurrentAiVoice, VoicePlaybackController } from '../../utils/aiVoice';

interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
}

const guideCategories = [
    {
        title: "Foundations of Faith",
        titleUrdu: "ایمان کی بنیادیں",
        icon: <Heart className="text-rose-500" />,
        steps: [
            { 
                title: "The Shahada", 
                titleUrdu: "کلمہ شہادت",
                subtitle: "The Declaration of Faith", 
                subtitleUrdu: "ایمان کا اقرار",
                icon: <Fingerprint className="text-rose-500" />, 
                contentUrdu: "سب سے پہلا اور اہم ترین قدم کلمہ شہادت ہے: سچے دل سے اقرار کرنا کہ ”اللہ کے سوا کوئی معبود نہیں، اور حضرت محمد ﷺ اللہ کے رسول ہیں۔“ یہ اعلان اللہ کی وحدانیت اور نبی کریم ﷺ کی رسالت پر کامل یقین کو ظاہر کرتا ہے۔",
                content: "The essential first step is the Shahada: sincerely declaring “There is no god but God, and Muhammad is the Messenger of God.” This statement expresses belief in the oneness of God and acceptance of Prophet Muhammad’s message." 
            },
            { 
                title: "Understanding Tawḥīd", 
                titleUrdu: "توحید کی سمجھ",
                subtitle: "Oneness of God", 
                subtitleUrdu: "اللہ کی یکتائی",
                icon: <Target className="text-rose-500" />, 
                contentUrdu: "توحید اسلامی عقائد کی اصل روح ہے — یہ یقین کہ اللہ ایک ہے، بے مثال ہے، نہ اس کا کوئی شریک ہے اور نہ کوئی اس جیسا۔ یہ تصور ایک مسلمان کے اخلاق، عبادت اور سوچ کو سنوارتا ہے۔",
                content: "Tawḥīd is the core theological concept — belief that God is one, unique, without partners or equals. Grasping this idea shapes the Muslim worldview, worship, and ethics." 
            },
            { 
                title: "Belief in the Prophets", 
                titleUrdu: "انبیائے کرامؑ پر ایمان",
                subtitle: "and Revelation", 
                subtitleUrdu: "اور آسمانی وحی",
                icon: <Users className="text-rose-500" />, 
                contentUrdu: "اسلام تمام سچے نبیوں (حضرت آدمؑ، ابراہیمؑ، موسیٰؑ، عیسیٰؑ اور محمد ﷺ) پر ایمان لانے کی تعلیم دیتا ہے۔ یہ یقین رکھنا بنیادی شرط ہے کہ حضرت محمد ﷺ اللہ کے آخری نبی اور رسول ہیں۔",
                content: "Islam teaches a chain of prophets (including Adam, Abraham, Moses, Jesus, and Muhammad) who brought guidance. Accepting that Prophet Muhammad is the final messenger is key." 
            },
            { 
                title: "The Qur’an", 
                titleUrdu: "قرآنِ مجید کی عظمت",
                subtitle: "Reading and Respecting", 
                subtitleUrdu: "تلاوت اور احترام",
                icon: <BookOpen className="text-rose-500" />, 
                contentUrdu: "قرآن مجید اللہ تعالیٰ کا آخری کلام ہے جو رہتی دنیا تک ہر انسان کے لیے رہنمائی کا سرچشمہ ہے۔ اس کی محبت، باوضو تلاوت اور معانی کو سمجھ کر پڑھنا باعثِ برکت ہے۔",
                content: "The Qur’an is the central scripture. Newcomers should know how it’s organized, the availability of reliable translations, and that respectful reading is encouraged." 
            },
        ]
    },
    {
        title: "Pillars of Action",
        titleUrdu: "عملی ارکان و عبادات",
        icon: <Sun className="text-amber-500" />,
        steps: [
            { 
                title: "Daily Prayer (Ṣalāh)", 
                titleUrdu: "روزانہ کی پانچ نمازیں",
                subtitle: "Structure & Meaning", 
                subtitleUrdu: "نماز کی روح اور پابندی",
                icon: <Clock className="text-amber-500" />, 
                contentUrdu: "نماز دن میں پانچ بار اللہ کے حضور حاضری کا نام ہے۔ نماز کے اوقات، پاکیزگی اور اس کے پیچھے شکر گزاری اور قربت کا مقصد انسان کی زندگی میں نظم و ضبط اور سکون پیدا کرتا ہے۔",
                content: "Prayer is a five-times-daily practice. Learning the short prayers, their times, and the spiritual purpose behind them (remembrance, discipline, gratitude) makes the ritual approachable." 
            },
            { 
                title: "Wudu", 
                titleUrdu: "وضو کا طریقہ",
                subtitle: "Ritual Purification", 
                subtitleUrdu: "جسمانی و روحانی پاکیزگی",
                icon: <Droplets className="text-amber-500" />, 
                contentUrdu: "وضو نماز سے پہلے طہارت و صفائی کا عمل ہے۔ یہ نہ صرف جسمانی نظافت ہے بلکہ دل اور روح کی گناہوں سے پاکیزگی اور بندگی کی تیاری ہے۔",
                content: "Wudu (ablution) is the simple washing routine performed before prayer. It’s both practical hygiene and symbolic purification." 
            },
            { 
                title: "Zakat & Charity", 
                titleUrdu: "زکوٰۃ اور صدقہ",
                subtitle: "Social Responsibility", 
                subtitleUrdu: "معاشرتی ہمدردی",
                icon: <Coins className="text-amber-500" />, 
                contentUrdu: "زکوٰۃ فرض مالی عبادت ہے جس کا مقصد معاشرے کے کمزور اور نادار افراد کی مدد کرنا اور دل سے بخل کی بیماری کو مٹا کر محبت پیدا کرنا ہے۔",
                content: "Zakat is a prescribed form of charity. Understanding the ethical purpose — supporting the vulnerable — helps converts align values with practical giving." 
            },
            { 
                title: "Fasting in Ramadan", 
                titleUrdu: "ماہِ رمضان کے روزے",
                subtitle: "Purpose and Practice", 
                subtitleUrdu: "تقویٰ اور احساس",
                icon: <Utensils className="text-amber-500" />, 
                contentUrdu: "روزہ انسان کے اندر صبر، تقویٰ، خود پر قابو اور ضرورت مندوں کی بھوک کا احساس پیدا کرتا ہے۔ سحر و افطار اور تراویح اجتماعی محبت کے گہوارے ہیں۔",
                content: "Fasting cultivates empathy and discipline. Guidance on fasting rules and the social aspects like ifṭār helps newcomers participate." 
            },
            { 
                title: "Hajj", 
                titleUrdu: "حجِ بیت اللہ",
                subtitle: "Pilgrimage Overview", 
                subtitleUrdu: "عظیم روحانی اجتماع",
                icon: <MapPin className="text-amber-500" />, 
                contentUrdu: "حج زندگی میں استطاعت پر ایک بار فرض ہے۔ دنیا بھر کے لاکھوں مسلمان ایک ہی لباس میں اللہ کی بارگاہ میں اکٹھے ہو کر مساوات اور اخوت کا درس دیتے ہیں۔",
                content: "Hajj is the pilgrimage to Mecca. A high-level explanation of its spiritual significance and basic rites is useful even if Hajj is a distant goal." 
            },
        ]
    },
    {
        title: "Living Islam",
        titleUrdu: "اسلامی طرزِ زندگی",
        icon: <Leaf className="text-emerald-500" />,
        steps: [
            { 
                title: "Intention (Niyyah)", 
                titleUrdu: "نیت کی اہمیت",
                subtitle: "Internal Purpose", 
                subtitleUrdu: "خالص ارادہ",
                icon: <Compass className="text-emerald-500" />, 
                contentUrdu: "ہر کام سے پہلے خالص نیت کرنا روزمرہ کے معمولات کو بھی نیکی اور عبادت میں بدل دیتا ہے، کیونکہ اعمال کا دارومدار نیتوں پر ہے۔",
                content: "Making a conscious inner commitment transforms routine actions into spiritual deeds; teaching newcomers to form simple, sincere intentions helps integrate faith." 
            },
            { 
                title: "Ethics & Morality", 
                titleUrdu: "اعلیٰ اخلاق و کردار",
                subtitle: "Daily Conduct", 
                subtitleUrdu: "معاملات میں سچائی",
                icon: <Scale className="text-emerald-500" />, 
                contentUrdu: "اسلام سچائی، عدل، نرمی اور امانت داری پر زور دیتا ہے۔ حسنِ اخلاق ایک مسلمان کی سب سے خوبصورت اور قیمتی پہچان ہے۔",
                content: "Islam emphasizes compassion, honesty, and justice. Practical examples (kindness, fair dealings) demonstrate how faith translates into everyday behavior." 
            },
            { 
                title: "Halal Lifestyle", 
                titleUrdu: "حلال غذا اور پرہیزگاری",
                subtitle: "Food & Habits", 
                subtitleUrdu: "طیب عادات",
                icon: <Coffee className="text-emerald-500" />, 
                contentUrdu: "حلال و طیب رزق کھانا اور بری عادات سے بچنا جسم و روح دونوں کو صحت، نور اور برکت عطا کرتا ہے۔",
                content: "Adopting halal dietary guidelines and mindful social habits. Present these as health- and value-based choices with simple, practical tips." 
            },
            { 
                title: "Daily Habits", 
                titleUrdu: "مسنون روزمرہ عادات",
                subtitle: "Mini-Rituals", 
                subtitleUrdu: "مبارک اذکار",
                icon: <Calendar className="text-emerald-500" />, 
                contentUrdu: "کھانے سے پہلے بسم اللہ کہنا، چھینک پر الحمد للہ کہنا، مسکرانا اور سلام پھیلانا چھوٹی چھوٹی نیکیاں ہیں جو بڑا اجر لاتی ہیں۔",
                content: "Simple habits: morning supplications, saying “Bismillah” before meals, and small acts of kindness build spiritual momentum." 
            },
            { 
                title: "Family & Respect", 
                titleUrdu: "خاندان اور والدین کا احترام",
                subtitle: "Guidance", 
                subtitleUrdu: "محبت اور حقوق",
                icon: <HeartHandshake className="text-emerald-500" />, 
                contentUrdu: "والدین کی خدمت، رشتہ داروں سے حسنِ سلوک اور گھر کے اندر محبت و احترام اسلامی معاشرت کا سنگِ بنیاد ہیں۔",
                content: "Basic Islamic perspectives on marriage, family responsibilities, and rights, emphasizing mutual respect and care." 
            },
        ]
    },
    {
        title: "Personal Growth",
        titleUrdu: "ذاتی اصلاح و روحانی ترقی",
        icon: <Sparkles className="text-purple-500" />,
        steps: [
            { 
                title: "Repentance (Tawbah)", 
                titleUrdu: "توبہ اور استغفار",
                subtitle: "Returning to God", 
                subtitleUrdu: "اللہ کی طرف رجوع",
                icon: <Undo className="text-purple-500" />, 
                contentUrdu: "غلطی ہو جانے پر شرمندگی محسوس کرنا، گناہ چھوڑ دینا اور اللہ سے معافی مانگنا دل کو دھل کر بالکل نیا اور پاک بنا دیتا ہے۔",
                content: "Repentance is immediate: sincere regret, stopping the action, and asking forgiveness. This comforting process helps understand Islam’s path of moral restoration." 
            },
            { 
                title: "Seeking Knowledge", 
                titleUrdu: "طلبِ علم",
                subtitle: "Start Small", 
                subtitleUrdu: "مسلسل سیکھنا",
                icon: <GraduationCap className="text-purple-500" />, 
                contentUrdu: "دین اور اچھے اخلاق کا علم حاصل کرنا ہر مسلمان پر فرض ہے۔ روزانہ تھوڑا تھوڑا سیکھنا انسان کو اندھیروں سے روشنی کی طرف لاتا ہے۔",
                content: "A gradual learning plan prevents overwhelm. Suggest curated beginner lessons and short daily readings." 
            },
            { 
                title: "Patience (Sabr)", 
                titleUrdu: "صبر و شکر کی طاقت",
                subtitle: "Resilience", 
                subtitleUrdu: "حالات کا ثابت قدمی سے سامنا",
                icon: <TrendingUp className="text-purple-500" />, 
                contentUrdu: "مشکلات میں مایوس نہ ہونا بلکہ اللہ پر بھروسہ رکھ کر ثابت قدم رہنا صبر کہلاتا ہے، جس کا بدلہ اللہ کے ہاں بے حساب ہے۔",
                content: "Spiritual journeys are personal. Encourage small steps rather than immediate perfection to avoid burnout." 
            },
            { 
                title: "Mental Wellbeing", 
                titleUrdu: "دلی سکون اور ذہنی صحت",
                subtitle: "Inner Peace", 
                subtitleUrdu: "ذکر الٰہی سے راحت",
                icon: <Brain className="text-purple-500" />, 
                contentUrdu: "قرآن فرماتا ہے: ”خبردار! اللہ کے ذکر سے ہی دلوں کو اطمینان ملتا ہے۔“ نماز اور دعا ذہنی پریشانیوں کا بہترین علاج ہیں۔",
                content: "Support spiritual and psychological wellbeing. Faith is a source of strength, but professional help is also encouraged for mental health." 
            },
        ]
    },
    {
        title: "Community & Society",
        titleUrdu: "معاشرہ اور باہمی تعلقات",
        icon: <Globe className="text-sky-500" />,
        steps: [
            { 
                title: "Mosque & Community", 
                titleUrdu: "مسجد اور محلہ",
                subtitle: "Local Brotherhood", 
                subtitleUrdu: "باہمی بھائی چارہ",
                icon: <Building className="text-sky-500" />, 
                contentUrdu: "مسجد میں باجماعت نماز ادا کرنا مسلمانوں میں الفت، ہمدردی اور ایک دوسرے کے دکھ درد کا احساس پیدا کرتا ہے۔",
                content: "A welcoming local mosque provides practical help and social support. Guidance on what to expect when visiting a mosque reduces anxiety." 
            },
            { 
                title: "Good Neighbors", 
                titleUrdu: "پڑوسیوں کے حقوق",
                subtitle: "Kindness to All", 
                subtitleUrdu: "بلا تفریق بھلائی",
                icon: <UserCheck className="text-sky-500" />, 
                contentUrdu: "رسول اللہ ﷺ نے فرمایا کہ جو اللہ اور قیامت پر ایمان رکھتا ہو وہ اپنے پڑوسی کو نہ ستائے بلکہ اس کی مدد کرے۔",
                content: "Connecting faith to action through volunteering — practical ways to live values and build a supportive social circle." 
            },
            { 
                title: "Service to Humanity", 
                titleUrdu: "خدمتِ خلق",
                subtitle: "Helping Hands", 
                subtitleUrdu: "مخلوقِ خدا کی خدمت",
                icon: <Heart className="text-sky-500" />, 
                contentUrdu: "راستے سے تکلیف دہ چیز ہٹانا، بیمار کی عیادت کرنا اور کسی اداس انسان کے چہرے پر مسکراہٹ لانا بھی نیکی اور عبادت ہے۔",
                content: "Connecting faith to action through volunteering — practical ways to live values and build a supportive social circle." 
            },
        ]
    }
];

const scienceTopics = [
    {
        category: "Astronomy & Physics",
        categoryUrdu: "فلکیات اور طبیعیات کے معجزات",
        icon: <Atom className="text-indigo-500" />,
        items: [
            { 
                title: "The Big Bang", 
                titleUrdu: "کائنات کی ابتدا (بگ بینگ)",
                reference: "Quran 21:30", 
                referenceUrdu: "سورۃ الانبیاء: آیت ۳۰",
                icon: <Zap className="text-indigo-500" />, 
                contentUrdu: "”کیا کافروں نے نہیں دیکھا کہ آسمان اور زمین آپس میں جڑے ہوئے تھے (ایک اکائی تھے)، پھر ہم نے انہیں پھاڑ کر الگ کیا؟“ جدید سائنس کی بگ بینگ تھیوری تصدیق کرتی ہے کہ پوری کائنات ایک ہی نقطے سے وجود میں آئی۔",
                content: "“Do not the disbelievers see that the heavens and the earth were a closed-up mass (ratqan), then We opened them out?” This aligns with the Big Bang theory that the universe began from a single singularity." 
            },
            { 
                title: "Expansion of the Universe", 
                titleUrdu: "کائنات کا مسلسل پھیلنا",
                reference: "Quran 51:47", 
                referenceUrdu: "سورۃ الذاریات: آیت ۴۷",
                icon: <Maximize className="text-indigo-500" />, 
                contentUrdu: "”اور آسمان کو ہم نے اپنے دستِ قدرت سے بنایا اور بلاشبہ ہم ہی اسے مسلسل وسعت دینے والے (پھیلانے والے) ہیں۔“ بیسویں صدی کے ماہرین فلکیات نے تصدیق کی کہ کہکشائیں مسلسل پھیل رہی ہیں۔",
                content: "“And the heaven We constructed with strength, and indeed, We are [its] expander.” Modern astrophysics confirmed in the 20th century that the universe is continuously expanding." 
            },
            { 
                title: "Orbits of Celestial Bodies", 
                titleUrdu: "سورج اور چاند اپنے مدار میں",
                reference: "Quran 21:33", 
                referenceUrdu: "سورۃ الانبیاء: آیت ۳۳",
                icon: <Orbit className="text-indigo-500" />, 
                contentUrdu: "”اور وہی ہے جس نے رات اور دن بنائے اور سورج اور چاند پیدا کیے، سب اپنے اپنے فلک (مدار) میں تیر رہے ہیں۔“ قرآن نے چودہ سو سال قبل بتا دیا کہ ہر سیارہ اور ستارہ اپنے مخصوص راستے پر محوِ گردش ہے۔",
                content: "“It is He who created the night and the day and the sun and the moon; all [heavenly bodies] in an orbit are swimming.” This accurately describes the motion of celestial bodies." 
            },
            { 
                title: "Iron Sent from Outer Space", 
                titleUrdu: "لوہا آسمان سے نازل کیا گیا",
                reference: "Quran 57:25", 
                referenceUrdu: "سورۃ الحدید: آیت ۲۵",
                icon: <Hammer className="text-indigo-500" />, 
                contentUrdu: "”اور ہم نے لوہا اتارا (نازل کیا) جس میں شدید جنگی طاقت اور انسانوں کے لیے بہت سے فائدے ہیں۔“ جدید سائنس بتاتی ہے کہ لوہا زمین پر نہیں بنا بلکہ خلا میں ستاروں کے پھٹنے (سپر نووا) سے شہاب ثاقب کے ذریعے زمین پر آیا۔",
                content: "“And We sent down iron...” Scientists have discovered that iron cannot be formed within the earth; it originated from supernova explosions and was sent down via meteorites." 
            }
        ]
    },
    {
        category: "Human Biology",
        categoryUrdu: "انسانی تخلیق اور حیاتیات",
        icon: <Dna className="text-rose-500" />,
        items: [
            { 
                title: "Embryonic Development", 
                titleUrdu: "ماں کے پیٹ میں بچے کے مراحل",
                reference: "Quran 23:12-14", 
                referenceUrdu: "سورۃ المؤمنون: ۱۲-۱۴",
                icon: <Baby className="text-rose-500" />, 
                contentUrdu: "قرآن پاک نے نطفہ، علقہ (جونک کی طرح چپٹنے والا لوتھڑا)، مضغہ (چبائے ہوئے گوشت کی مانند بوٹی) اور ہڈیوں پر گوشت چڑھانے کے وہ دقیق مراحل بیان کیے ہیں جنہیں مائیکروسکوپ کے بغیر جاننا ناممکن تھا۔",
                content: "The Quran describes the stages of the fetus: from a drop (Nutfah) to a clinging clot (Alaqah), to a chewed lump (Mudghah), then bones clothed with flesh. This matches modern embryology." 
            },
            { 
                title: "Creation from Water", 
                titleUrdu: "ہر جاندار پانی سے بنا",
                reference: "Quran 21:30", 
                referenceUrdu: "سورۃ الانبیاء: آیت ۳۰",
                icon: <Droplets className="text-rose-500" />, 
                contentUrdu: "”اور ہم نے ہر زندہ چیز کو پانی سے پیدا کیا۔“ سائنس تصدیق کرتی ہے کہ جاندار خلیے (Cell) کا بنیادی مادہ سائٹوپلازم ۸۰ فیصد سے زائد پانی پر مشتمل ہے۔",
                content: "“...and made from water every living thing?” Cytoplasm, the basic substance of the cell, is 80% water, and every living organism consists primarily of water." 
            },
            { 
                title: "The Frontal Lobe", 
                titleUrdu: "پیشانی اور دماغ کا فیصلہ کن حصہ",
                reference: "Quran 96:15-16", 
                referenceUrdu: "سورۃ العلق: ۱۵-۱۶",
                icon: <Brain className="text-rose-500" />, 
                contentUrdu: "قرآن نے پیشانی کو ”جھوٹ بولنے والی اور خطا کار پیشانی“ فرمایا۔ جدید نیورو سائنس کے مطابق پیشانی کے پیچھے واقع دماغ کا پری فرنٹل کورٹیکس ہی سچ، جھوٹ اور نیکی بدی کے فیصلوں کا مرکز ہے۔",
                content: "The Quran refers to the “lying, sinning forelock.” Modern neuroscience identifies the prefrontal cortex (forehead area) as the center for decision-making, planning, and lying." 
            }
        ]
    },
    {
        category: "Geology & Earth",
        categoryUrdu: "زمین اور پہاڑوں کے اسرار",
        icon: <Mountain className="text-stone-500" />,
        items: [
            { 
                title: "Mountains as Pegs", 
                titleUrdu: "پہاڑ زمین کی میخیں ہیں",
                reference: "Quran 78:6-7", 
                referenceUrdu: "سورۃ النبأ: ۶-۷",
                icon: <Mountain className="text-stone-500" />, 
                contentUrdu: "”کیا ہم نے زمین کو بچھونا اور پہاڑوں کو میخیں نہیں بنایا؟“ ارضیات کے مطابق پہاڑوں کی جڑیں زمین کے اندر گہرائی تک جاتی ہیں جو زمین کی پلیٹوں کو ہلنے سے روکتی ہیں جیسے خیمے کی میخیں۔",
                content: "“Have We not made the earth a resting place? And the mountains as stakes?” Mountains have deep roots (isostasy) that stabilize the earth's crust, like pegs holding a tent." 
            },
            { 
                title: "Barrier Between Seas", 
                titleUrdu: "دو سمندروں کے درمیان قدرتی پردہ",
                reference: "Quran 55:19-20", 
                referenceUrdu: "سورۃ الرحمن: ۱۹-۲۰",
                icon: <Waves className="text-stone-500" />, 
                contentUrdu: "”اس نے دو سمندر رواں کیے جو باہم ملتے ہیں، ان کے درمیان ایک آڑ (پردہ) ہے جس سے وہ تجاوز نہیں کرتے۔“ بحری سائنس نے ثابت کیا کہ مختلف کثافت اور نمکیات والے سمندر ملتے ہیں مگر ان کے پانی الگ رہتے ہیں۔",
                content: "“He released the two seas... Between them is a barrier which they do not transgress.” Oceanography confirms that bodies of water with different salinities and densities meet but do not immediately mix." 
            }
        ]
    }
];

const basicsContent = [
    {
        titleUrdu: "کلمہ شہادت",
        subtitleUrdu: "ایمان و توحید",
        descriptionUrdu: "ایمان کا اقرار: ”اللہ کے سوا کوئی معبود نہیں، اور حضرت محمد ﷺ اللہ کے رسول ہیں۔“ یہ اسلام میں داخل ہونے کی سب سے بنیادی چابی ہے۔",
        detailsUrdu: "یہ مبارک کلمہ تمام اسلامی عقائد کی بنیاد ہے، جو اللہ تعالیٰ کی یکتائی اور نبی کریم ﷺ کی نبوت کا اقرار ہے۔",
        title: "Shahada",
        subtitle: "Faith",
        icon: <Heart className="text-rose-500" />,
        description: "The declaration of faith: 'There is no god but Allah, and Muhammad is the Messenger of Allah.' It is the key to entering Islam.",
        details: "This simple statement is the foundation of all Islamic beliefs. It affirms Monotheism (Tawhid) and the Prophethood of Muhammad (PBUH)."
    },
    {
        titleUrdu: "نماز (صلوٰۃ)",
        subtitleUrdu: "روزانہ کی عبادت",
        descriptionUrdu: "اللہ تعالیٰ سے دلی تعلق اور روحانی بندگی کو قائم رکھنے کے لیے روزانہ مقررہ اوقات میں پانچ نمازیں ادا کرنا۔",
        detailsUrdu: "فجر (صبح)، ظہر (دوپہر)، عصر (سہ پہر)، مغرب (غروب آفتاب) اور عشاء (رات)۔ نماز دل کو پرسکون اور برائیوں سے پاک رکھتی ہے۔",
        title: "Salah",
        subtitle: "Prayer",
        icon: <Sun className="text-amber-500" />,
        description: "Performing the five daily prayers to maintain a continuous spiritual connection with God.",
        details: "Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), and Isha (Night). Prayer keeps us grounded, grateful, and pure."
    },
    {
        titleUrdu: "زکوٰۃ",
        subtitleUrdu: "مالی صدقہ و خیرات",
        descriptionUrdu: "اپنے مخصوص جمع شدہ مال میں سے سالانہ ۲.۵ فیصد حصہ غریبوں، یتیموں اور مسکینوں کی مدد کے لیے خوشی سے نکالنا۔",
        detailsUrdu: "زکوٰۃ مال کو پاک کرتی ہے، خود غرضی مٹاتی ہے اور معاشرے کے غریب افراد کو عزت کے ساتھ جینے کا سہارا دیتی ہے۔",
        title: "Zakat",
        subtitle: "Charity",
        icon: <Sparkles className="text-purple-500" />,
        description: "Giving a fixed portion (2.5%) of one's wealth to help the poor, needy, and vulnerable members of society.",
        details: "Zakat purifies wealth and fosters empathy. It ensures that the community looks after its most vulnerable members."
    },
    {
        titleUrdu: "روزہ (صوم)",
        subtitleUrdu: "ماہِ رمضان المبارک",
        descriptionUrdu: "ماہِ رمضان میں طلوع فجر سے غروب آفتاب تک اللہ کی رضا کے لیے کھانے پینے اور بری باتوں سے بچے رہنا۔",
        detailsUrdu: "روزہ انسان میں صبر، تقویٰ، خود پر قابو اور ناداروں کی بھوک پیاس کا احساس پیدا کرتا ہے اور گناہوں کو بخشواتا ہے۔",
        title: "Sawm",
        subtitle: "Fasting",
        icon: <Moon className="text-indigo-500" />,
        description: "Fasting during the holy month of Ramadan from dawn until sunset.",
        details: "Fasting teaches self-discipline, patience, and compassion for the hungry. It is a time for spiritual recharge and Quran recitation."
    },
    {
        titleUrdu: "حج",
        subtitleUrdu: "مکہ مکرمہ کی زیارت",
        descriptionUrdu: "زندگی میں ایک بار صاحبِ استطاعت مسلمانوں پر مقدس شہر مکہ مکرمہ جا کر حج کے ارکان ادا کرنا۔",
        detailsUrdu: "حج دنیا کے تمام مسلمانوں کو ایک سفید لباس میں جمع کرتا ہے، جو رنگ، نسل اور امیری غریبی کے فرق کو مٹا کر مساوات سکھاتا ہے۔",
        title: "Hajj",
        subtitle: "Pilgrimage",
        icon: <Book className="text-emerald-500" />,
        description: "The pilgrimage to the holy city of Makkah, required once in a lifetime for those who are able.",
        details: "Hajj unites Muslims from all over the world, dressed in simple white cloth, symbolizing equality before God."
    }
];

const beliefsContent = [
    {
        titleUrdu: "اللہ تعالیٰ پر ایمان",
        contentUrdu: "یہ پختہ یقین رکھنا کہ اللہ ایک ہے، بے نیاز ہے، نہ اس کے کوئی اولاد ہے اور نہ وہ کسی کی اولاد، اور تمام کائنات کا خالق و مالک وہی ہے۔",
        title: "Belief in Allah",
        icon: <Heart className="text-rose-500" />,
        content: "Believing that God is One, Unique, and has no partners or children. He is the Loving Creator and Sustainer of everything."
    },
    {
        titleUrdu: "فرشتوں پر ایمان",
        contentUrdu: "فرشتے نور سے پیدا کی گئی معصوم مخلوق ہیں جو ہر لمحہ اللہ کی اطاعت کرتے ہیں، جیسے حضرت جبرائیلؑ جو وحی پہنچاتے تھے۔",
        title: "Belief in Angels",
        icon: <Sparkles className="text-sky-400" />,
        content: "Angels are beings made of light who obey God's commands. They record deeds and protect humans (e.g., Gabriel/Jibreel)."
    },
    {
        titleUrdu: "آسمانی کتابوں پر ایمان",
        contentUrdu: "اللہ تعالیٰ نے انسانوں کی رہنمائی کے لیے کتابیں اتاریں: تورات، زبور، انجیل اور آخری محفوظ الہامی کتاب قرآن مجید۔",
        title: "Belief in the Books",
        icon: <Book className="text-emerald-500" />,
        content: "God sent books to guide humanity, including the Torah (Moses), Psalms (David), Gospel (Jesus), and the Quran (Muhammad)."
    },
    {
        titleUrdu: "تمام پیغمبروںؑ پر ایمان",
        contentUrdu: "اللہ تعالیٰ نے ہر قوم کی رہنمائی کے لیے نبی بھیجے جن کی ابتدا حضرت آدمؑ سے ہوئی اور خاتم النبیین حضرت محمد ﷺ پر یہ سلسلہ مکمل ہوا۔",
        title: "Belief in Prophets",
        icon: <Star className="text-amber-400" />,
        content: "God sent messengers to every nation, starting with Adam and ending with Muhammad (Peace Be Upon Him), to teach the truth."
    },
    {
        titleUrdu: "آخرت کے دن پر ایمان",
        contentUrdu: "ایک دن یہ دنیا ختم ہو جائے گی اور تمام انسانوں کو دوبارہ زندہ کیا جائے گا تاکہ عدل و انصاف کے ساتھ ان کے اعمال کا حساب ہو۔",
        title: "Belief in the Last Day",
        icon: <Compass className="text-indigo-500" />,
        content: "One day, all life will end, and everyone will be resurrected to be judged for their deeds. It is a day of absolute justice."
    },
    {
        titleUrdu: "تقدیر (خیر و شر) پر ایمان",
        contentUrdu: "یہ یقین کہ جو کچھ بھی دنیا میں پیش آتا ہے وہ اللہ کے علم، ارادے اور ازلی حکمت سے ہے، اور انسان نیکی یا بدی چننے کا ذمہ دار ہے۔",
        title: "Divine Decree (Qadr)",
        icon: <Cloud className="text-slate-500" />,
        content: "Everything happens by the will and knowledge of God. We have free will to choose, but God knows all outcomes."
    }
];

const DiscoverIslam = () => {
    const [activeSection, setActiveSection] = useState('basics');
    
    // Voice Playback state
    const [speakingCardKey, setSpeakingCardKey] = useState<string | null>(null);
    const activeVoiceRef = useRef<VoicePlaybackController | null>(null);

    const stopVoice = () => {
        if (activeVoiceRef.current) {
            try { activeVoiceRef.current.stop(); } catch {}
            activeVoiceRef.current = null;
        }
        stopCurrentAiVoice();
        setSpeakingCardKey(null);
    };

    const speakContent = (key: string, text: string, lang: string = 'ur-PK') => {
        if (speakingCardKey === key) {
            stopVoice();
            return;
        }
        stopVoice();
        setSpeakingCardKey(key);
        const ctrl = playAiVoice(text, {
            lang,
            onEnd: () => {
                setSpeakingCardKey(null);
                activeVoiceRef.current = null;
            },
            onError: () => stopVoice()
        });
        activeVoiceRef.current = ctrl;
    };

    // Quiz State
    const [quizState, setQuizState] = useState<'start' | 'loading' | 'playing' | 'result'>('start');
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizTopic, setQuizTopic] = useState<string>('');
    
    // Achievements State
    const { unlockedAchievements, achievements } = useGamification();
    const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
    const prevUnlockedCount = useRef(unlockedAchievements.length);

    useEffect(() => {
        if (unlockedAchievements.length > prevUnlockedCount.current) {
            const lastId = unlockedAchievements[unlockedAchievements.length - 1];
            const achievement = achievements.find(a => a.id === lastId);
            if (achievement) {
                setShowAchievement(achievement);
                setTimeout(() => setShowAchievement(null), 3000);
            }
        }
        prevUnlockedCount.current = unlockedAchievements.length;
    }, [unlockedAchievements, achievements]);

    useEffect(() => {
        return () => {
            stopVoice();
        };
    }, []);

    // Navigation Items (Ask a Friend is cleanly removed!)
    const navItems = [
        { id: 'basics', title: 'ارکانِ اسلام • The 5 Pillars', icon: <Star className="text-amber-500" />, isGuide: false, guideIndex: -1 },
        { id: 'beliefs', title: 'عقائد و ایمانیات • Articles of Faith', icon: <Heart className="text-rose-500" />, isGuide: false, guideIndex: -1 },
        ...guideCategories.map((cat, idx) => ({
            id: `guide-${idx}`,
            title: `${cat.titleUrdu} • ${cat.title}`,
            icon: cat.icon,
            isGuide: true,
            guideIndex: idx
        })),
        { id: 'science', title: 'اسلام اور سائنس • Islam & Science', icon: <Atom className="text-indigo-500" />, isGuide: false, guideIndex: -1 },
        { id: 'achievements', title: 'اعزازات • Achievements', icon: <Trophy className="text-yellow-500" />, isGuide: false, guideIndex: -1 }
    ];

    const generateQuiz = async (topic: string) => {
        stopVoice();
        setQuizTopic(topic);
        setQuizState('loading');
        setActiveSection('quiz');
        
        try {
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.questions && data.questions.length > 0) {
                    setQuizQuestions(data.questions);
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelectedAnswer(null);
                    setQuizState('playing');
                    return;
                }
            }
            throw new Error('API Quiz generation failed');
        } catch {
            // Local fallback quiz
            setQuizQuestions([
                {
                    question: "What is the first pillar of Islam?",
                    options: ["Shahada (Faith)", "Salah (Prayer)", "Zakat (Charity)", "Hajj (Pilgrimage)"],
                    correct: 0
                },
                {
                    question: "How many daily prayers do Muslims perform?",
                    options: ["3 prayers", "5 prayers", "7 prayers", "2 prayers"],
                    correct: 1
                },
                {
                    question: "In which holy month do Muslims fast?",
                    options: ["Muharram", "Shawwal", "Ramadan", "Dhul Hijjah"],
                    correct: 2
                }
            ]);
            setCurrentQuestion(0);
            setScore(0);
            setSelectedAnswer(null);
            setQuizState('playing');
        }
    };

    const handleAnswer = (idx: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(idx);
        if (idx === quizQuestions[currentQuestion].correct) {
            setScore(s => s + 10);
        }
        setTimeout(() => {
            if (currentQuestion + 1 < quizQuestions.length) {
                setCurrentQuestion(c => c + 1);
                setSelectedAnswer(null);
            } else {
                setQuizState('result');
            }
        }, 1200);
    };

    const activeGuideCategory = navItems.find(item => item.id === activeSection)?.guideIndex;

    return (
        <div className="min-h-screen bg-slate-50 pb-32 font-sans selection:bg-emerald-200 selection:text-emerald-900 w-full overflow-x-hidden">
            {/* Header Hero */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white py-14 px-4 sm:px-8 text-center relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-yellow-300 mb-4 border border-white/30 shadow-sm">
                        اسلام کی خوبصورت تعلیمات • Explore Islamic Wonders
                    </span>
                    <h1 
                        className="text-4xl sm:text-6xl font-black mb-2 drop-shadow-md"
                        style={{ fontFamily: 'Noto Nastaliq Urdu, Traditional Arabic, serif' }}
                        dir="rtl"
                    >
                        اسلام کو جانیے
                    </h1>
                    <h2 className="text-2xl sm:text-4xl font-black text-emerald-100 mb-4 tracking-tight">
                        Discover Peace, Wisdom &amp; Faith
                    </h2>
                    <p 
                        className="text-xl sm:text-2xl text-emerald-100 max-w-2xl mx-auto font-medium leading-loose mb-2"
                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                        dir="rtl"
                    >
                        محبت، نیکی اور ایمان کے اس خوبصورت سفر میں خوش آمدید!
                    </p>
                    <p className="text-sm sm:text-base text-emerald-200 font-bold max-w-xl mx-auto">
                        Welcome to a journey of love, kindness, and understanding. Let's learn the beauty of Islam together!
                    </p>
                </div>
            </div>

            {/* Main Interactive Layout */}
            <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                    
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-4 space-y-2.5 lg:sticky lg:top-4 z-20">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2 px-2">
                            موضوعات • Discover Topics
                        </span>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    stopVoice();
                                    setActiveSection(item.id);
                                }}
                                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all flex items-center gap-3 font-bold border-2 shadow-xs active:scale-95 cursor-pointer ${
                                    activeSection === item.id
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-200'
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                                }`}
                            >
                                <div className={`p-2.5 rounded-xl ${activeSection === item.id ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {React.cloneElement(item.icon as any, { 
                                        size: 20,
                                        strokeWidth: 3,
                                        className: activeSection === item.id ? 'text-white' : '' 
                                    })}
                                </div>
                                <span className="text-xs sm:text-sm font-black leading-snug">{item.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Panel */}
                    <motion.div 
                        key={activeSection}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border-4 border-emerald-100 relative overflow-hidden w-full"
                    >
                        {/* 1. THE 5 PILLARS OF ISLAM (URDU FIRST) */}
                        {activeSection === 'basics' && (
                            <div className="space-y-8 relative z-10">
                                
                                {/* Section Header: Urdu First */}
                                <div className="text-center mb-8 border-b-2 border-emerald-50 pb-6">
                                    <div className="inline-flex p-3 bg-amber-100 text-amber-600 rounded-2xl mb-3 shadow-xs">
                                        <Star size={32} className="fill-amber-400 text-amber-500" />
                                    </div>
                                    <h2 
                                        className="text-3xl sm:text-5xl font-black text-emerald-800 mb-2 leading-relaxed" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, Traditional Arabic, serif' }}
                                        dir="rtl"
                                    >
                                        اسلام کے ۵ بنیادی ستون
                                    </h2>
                                    <h3 className="text-xl sm:text-2xl font-black text-emerald-600 mb-2">
                                        The 5 Pillars of Islam
                                    </h3>
                                    <p 
                                        className="text-lg sm:text-xl text-slate-700 font-medium leading-loose mb-1" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                        dir="rtl"
                                    >
                                        جس طرح ایک مضبوط عمارت کو ستونوں کی ضرورت ہوتی ہے، اسی طرح اسلام کی بنیاد ان پانچ مبارک اعمال پر رکھی گئی ہے! 🏠
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500 font-bold">
                                        Just like a house needs strong pillars to stand, Islam is built on 5 beautiful actions!
                                    </p>
                                </div>

                                {/* Pillars Cards (Urdu First, English Below) */}
                                <div className="grid grid-cols-1 gap-6">
                                    {basicsContent.map((pillar, idx) => {
                                        const cardKey = `pillar_${idx}`;
                                        const isPlaying = speakingCardKey === cardKey;
                                        return (
                                            <motion.div 
                                                key={idx}
                                                whileHover={{ y: -4 }}
                                                className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-slate-200 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md relative overflow-hidden"
                                            >
                                                {/* Header Row: Icons & Titles */}
                                                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100 flex-wrap">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-emerald-50 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                                            {React.cloneElement(pillar.icon as any, { size: 28, strokeWidth: 2.5 })}
                                                        </div>
                                                        <div>
                                                            {/* Urdu Title First */}
                                                            <div className="flex items-center gap-2" dir="rtl">
                                                                <h4 
                                                                    className="text-2xl sm:text-3xl font-black text-emerald-800 leading-none"
                                                                    style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                                >
                                                                    {pillar.titleUrdu}
                                                                </h4>
                                                                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                                                                    {pillar.subtitleUrdu}
                                                                </span>
                                                            </div>
                                                            {/* English Title Second */}
                                                            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-1">
                                                                {pillar.title} • {pillar.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Voice Recitation Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => speakContent(cardKey, `${pillar.titleUrdu}۔ ${pillar.descriptionUrdu} ${pillar.detailsUrdu}`)}
                                                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
                                                            isPlaying
                                                                ? 'bg-rose-500 text-white animate-pulse'
                                                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                                        }`}
                                                        title="اردو میں سنیں"
                                                    >
                                                        {isPlaying ? (
                                                            <><Square size={13} fill="currentColor" /> روکیں (Stop)</>
                                                        ) : (
                                                            <><Volume2 size={14} /> اردو سنیں</>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* 1. URDU CONTENT FIRST */}
                                                <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-2xl border border-emerald-100 mb-4" dir="rtl">
                                                    <p 
                                                        className="text-xl sm:text-2xl font-medium text-emerald-950 leading-[2.2] mb-2" 
                                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                    >
                                                        {pillar.descriptionUrdu}
                                                    </p>
                                                    <p 
                                                        className="text-base sm:text-lg text-emerald-800 leading-relaxed font-medium" 
                                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                    >
                                                        {pillar.detailsUrdu}
                                                    </p>
                                                </div>

                                                {/* 2. ENGLISH TRANSLATION BELOW */}
                                                <div className="pl-2" dir="ltr">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                                                        English Explanation
                                                    </span>
                                                    <p className="text-base font-bold text-slate-800 leading-relaxed mb-1">
                                                        {pillar.description}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                                                        {pillar.details}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="text-center pt-6">
                                    <button 
                                        onClick={() => generateQuiz('basics')}
                                        className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-[0_5px_0_#047857] active:shadow-none active:translate-y-[5px] flex items-center gap-3 mx-auto text-base sm:text-lg cursor-pointer"
                                    >
                                        <Play size={22} fill="currentColor" /> ارکانِ اسلام کا کوئز کھیلیں (Take Fun Quiz!)
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 2. ARTICLES OF FAITH (URDU FIRST) */}
                        {activeSection === 'beliefs' && (
                            <div className="space-y-8 relative z-10">
                                
                                {/* Section Header: Urdu First */}
                                <div className="text-center mb-8 border-b-2 border-emerald-50 pb-6">
                                    <div className="inline-flex p-3 bg-rose-100 text-rose-600 rounded-2xl mb-3 shadow-xs">
                                        <Heart size={32} className="fill-rose-500 text-rose-500" />
                                    </div>
                                    <h2 
                                        className="text-3xl sm:text-5xl font-black text-emerald-800 mb-2 leading-relaxed" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, Traditional Arabic, serif' }}
                                        dir="rtl"
                                    >
                                        ایمان کے ۶ بنیادی ارکان
                                    </h2>
                                    <h3 className="text-xl sm:text-2xl font-black text-rose-600 mb-2">
                                        The 6 Articles of Faith
                                    </h3>
                                    <p 
                                        className="text-lg sm:text-xl text-slate-700 font-medium leading-loose mb-1" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                        dir="rtl"
                                    >
                                        وہ بنیادی عقائد جو ہر مسلمان اپنے دل اور روح میں سچائی کے ساتھ بساتا ہے! ❤️
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500 font-bold">
                                        The foundational beliefs that every Muslim holds dear in their heart.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {beliefsContent.map((item, idx) => {
                                        const cardKey = `belief_${idx}`;
                                        const isPlaying = speakingCardKey === cardKey;
                                        return (
                                            <motion.div 
                                                key={idx}
                                                whileHover={{ scale: 1.01 }}
                                                className="bg-white p-6 rounded-[2rem] shadow-sm border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                                                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                                                            {React.cloneElement(item.icon as any, { size: 24, strokeWidth: 3 })}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => speakContent(cardKey, `${item.titleUrdu}۔ ${item.contentUrdu}`)}
                                                            className={`p-2 rounded-xl text-xs font-bold transition-all ${
                                                                isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                            }`}
                                                            title="اردو سنیں"
                                                        >
                                                            <Volume2 size={15} />
                                                        </button>
                                                    </div>

                                                    {/* 1. URDU FIRST */}
                                                    <div className="mb-4 text-right" dir="rtl">
                                                        <h4 
                                                            className="text-2xl font-black text-emerald-900 mb-2" 
                                                            style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                        >
                                                            {item.titleUrdu}
                                                        </h4>
                                                        <p 
                                                            className="text-lg text-slate-800 leading-loose font-medium" 
                                                            style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                        >
                                                            {item.contentUrdu}
                                                        </p>
                                                    </div>

                                                    {/* 2. ENGLISH BELOW */}
                                                    <div className="pt-3 border-t border-slate-100" dir="ltr">
                                                        <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                                                            {item.title}
                                                        </h5>
                                                        <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                                                            {item.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Who is Allah? Feature Card (Urdu First) */}
                                <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-[2.5rem] p-8 sm:p-10 text-center mt-8 border-4 border-emerald-200 shadow-sm relative overflow-hidden">
                                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
                                        معرفتِ الٰہی • Divine Knowledge
                                    </span>
                                    <h3 
                                        className="text-3xl sm:text-5xl font-black text-emerald-900 mb-3" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                        dir="rtl"
                                    >
                                        اللہ تعالیٰ کون ہے؟
                                    </h3>
                                    <h4 className="text-lg font-black text-emerald-700 mb-4">Who is Allah?</h4>
                                    
                                    <p 
                                        className="text-xl sm:text-2xl text-emerald-950 leading-[2.3] max-w-3xl mx-auto font-medium mb-5" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                        dir="rtl"
                                    >
                                        اللہ رب العزت تمام کائنات، ستاروں، سمندروں، جانوروں اور انسانوں کا تنہا خالق و مالک ہے۔ وہ ایک ہے، بے نیاز ہے، اس کا کوئی شریک نہیں، وہ سب سے زیادہ محبت کرنے والا اور بے حد مہربان ہے! 🌟
                                    </p>
                                    <p className="text-sm sm:text-base text-slate-700 font-bold max-w-2xl mx-auto leading-relaxed">
                                        Allah is the Arabic word for God. He is the Loving Creator of the stars, oceans, animals, and you! He has no partners or equals. He is the Most Merciful and the Most Kind.
                                    </p>
                                </div>

                                <div className="text-center pt-6">
                                    <button 
                                        onClick={() => generateQuiz('beliefs')}
                                        className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-[0_5px_0_#047857] active:shadow-none active:translate-y-[5px] flex items-center gap-3 mx-auto text-base sm:text-lg cursor-pointer"
                                    >
                                        <Play size={22} fill="currentColor" /> ایمانیات کا کوئز کھیلیں (Quiz on Faith)
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 3. STEP-BY-STEP GUIDES (URDU FIRST) */}
                        {activeGuideCategory !== undefined && activeGuideCategory >= 0 && (
                            <div className="space-y-8 relative z-10">
                                
                                {/* Guide Header: Urdu First */}
                                <div className="flex items-center gap-5 mb-8 border-b-2 border-emerald-50 pb-6 flex-wrap">
                                    <div className="bg-emerald-100 p-5 rounded-2xl text-emerald-700 shadow-xs">
                                        {React.cloneElement(guideCategories[activeGuideCategory].icon as any, { size: 36, strokeWidth: 2.5 })}
                                    </div>
                                    <div>
                                        <h3 
                                            className="text-3xl sm:text-4xl font-black text-emerald-900 leading-tight" 
                                            style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                            dir="rtl"
                                        >
                                            {guideCategories[activeGuideCategory].titleUrdu}
                                        </h3>
                                        <p className="text-sm font-black text-slate-500 uppercase tracking-wider mt-1">
                                            {guideCategories[activeGuideCategory].title} • Step-by-Step Guidance
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid gap-6">
                                    {guideCategories[activeGuideCategory].steps.map((step, stepIdx) => {
                                        const cardKey = `step_${activeGuideCategory}_${stepIdx}`;
                                        const isPlaying = speakingCardKey === cardKey;
                                        return (
                                            <motion.div
                                                key={stepIdx}
                                                whileHover={{ y: -3 }}
                                                className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-xs"
                                            >
                                                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100 flex-wrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-emerald-100 text-emerald-800 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0">
                                                            {step.icon ? React.cloneElement(step.icon as any, { size: 22, strokeWidth: 2.5 }) : stepIdx + 1}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2" dir="rtl">
                                                                <h4 
                                                                    className="text-2xl font-black text-emerald-900 leading-none" 
                                                                    style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                                >
                                                                    {step.titleUrdu}
                                                                </h4>
                                                                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                                                                    {step.subtitleUrdu}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs font-bold text-slate-400 mt-1">
                                                                {step.title} • {step.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => speakContent(cardKey, `${step.titleUrdu}۔ ${step.contentUrdu}`)}
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                                            isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                                        }`}
                                                    >
                                                        {isPlaying ? <><Square size={12} fill="currentColor" /> روکیں</> : <><Volume2 size={13} /> اردو سنیں</>}
                                                    </button>
                                                </div>

                                                {/* 1. URDU CONTENT FIRST */}
                                                <div className="bg-emerald-50/40 p-4 sm:p-5 rounded-2xl border border-emerald-100 mb-4" dir="rtl">
                                                    <p 
                                                        className="text-lg sm:text-xl text-slate-900 leading-[2.2] font-medium" 
                                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                    >
                                                        {step.contentUrdu}
                                                    </p>
                                                </div>

                                                {/* 2. ENGLISH TRANSLATION */}
                                                <div className="pl-1" dir="ltr">
                                                    <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
                                                        {step.content}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="text-center pt-6">
                                    <button 
                                        onClick={() => generateQuiz(`guide-${guideCategories[activeGuideCategory].title}`)}
                                        className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-[0_5px_0_#047857] active:shadow-none active:translate-y-[5px] flex items-center gap-3 mx-auto text-base sm:text-lg cursor-pointer"
                                    >
                                        <Play size={22} fill="currentColor" /> کوئز کھیلیں (Quiz Time!) 🧠
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 4. ISLAM & SCIENCE (URDU FIRST) */}
                        {activeSection === 'science' && (
                            <div className="space-y-10 relative z-10">
                                
                                {/* Section Header: Urdu First */}
                                <div className="text-center mb-8 border-b-2 border-emerald-50 pb-6">
                                    <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-3 shadow-xs">
                                        <Atom size={34} strokeWidth={2.5} />
                                    </div>
                                    <h2 
                                        className="text-3xl sm:text-5xl font-black text-emerald-800 mb-2 leading-relaxed" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, Traditional Arabic, serif' }}
                                        dir="rtl"
                                    >
                                        اسلام اور جدید سائنسی حقائق
                                    </h2>
                                    <h3 className="text-xl sm:text-2xl font-black text-indigo-700 mb-2">
                                        Islam &amp; Scientific Miracles
                                    </h3>
                                    <p 
                                        className="text-lg sm:text-xl text-slate-700 font-medium leading-loose mb-1" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                        dir="rtl"
                                    >
                                        قرآنِ پاک میں صدیوں پہلے بیان کیے گئے وہ حیران کن سائنسی معجزات جنہیں جدید سائنس آج دریافت کر رہی ہے! 🧪
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500 font-bold">
                                        Exploring scientific phenomena mentioned in the Holy Quran centuries before modern discovery!
                                    </p>
                                </div>

                                {scienceTopics.map((topic, idx) => (
                                    <div key={idx} className="bg-white rounded-[2rem] p-6 sm:p-8 border-2 border-slate-200 shadow-xs relative overflow-hidden">
                                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 flex-wrap gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                                    {React.cloneElement(topic.icon as any, { size: 28, strokeWidth: 2.5 })}
                                                </div>
                                                <div>
                                                    <h3 
                                                        className="text-2xl font-black text-slate-900" 
                                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                        dir="rtl"
                                                    >
                                                        {topic.categoryUrdu}
                                                    </h3>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{topic.category}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {topic.items.map((item, itemIdx) => {
                                                const cardKey = `science_${idx}_${itemIdx}`;
                                                const isPlaying = speakingCardKey === cardKey;
                                                return (
                                                    <motion.div 
                                                        key={itemIdx}
                                                        whileHover={{ scale: 1.01 }}
                                                        className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
                                                    >
                                                        <div>
                                                            <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-white p-2 rounded-lg text-emerald-600 shadow-2xs">
                                                                        {item.icon && React.cloneElement(item.icon as any, { size: 18, strokeWidth: 2.5 })}
                                                                    </div>
                                                                    <h4 
                                                                        className="font-black text-slate-900 text-xl" 
                                                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                                        dir="rtl"
                                                                    >
                                                                        {item.titleUrdu}
                                                                    </h4>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                                                                        {item.reference}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => speakContent(cardKey, `${item.titleUrdu}۔ ${item.contentUrdu}`)}
                                                                        className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                                                                            isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-indigo-700 hover:bg-indigo-50 border border-slate-200'
                                                                        }`}
                                                                        title="اردو سنیں"
                                                                    >
                                                                        <Volume2 size={13} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* 1. URDU CONTENT FIRST */}
                                                            <div className="mb-3 text-right" dir="rtl">
                                                                <p 
                                                                    className="text-base sm:text-lg text-slate-800 leading-[2.1] font-medium" 
                                                                    style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                                >
                                                                    {item.contentUrdu}
                                                                </p>
                                                            </div>

                                                            {/* 2. ENGLISH TRANSLATION */}
                                                            <div className="pt-2 border-t border-slate-200/80" dir="ltr">
                                                                <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                                                                    {item.title}
                                                                </h5>
                                                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                                                                    {item.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                <div className="text-center pt-6">
                                    <button 
                                        onClick={() => generateQuiz('science')}
                                        className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-[0_5px_0_#047857] active:shadow-none active:translate-y-[5px] flex items-center gap-3 mx-auto text-base sm:text-lg cursor-pointer"
                                    >
                                        <Play size={22} fill="currentColor" /> سائنس اور اسلام کا کوئز (Take Science Quiz!)
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 5. ACHIEVEMENTS */}
                        {activeSection === 'achievements' && (
                            <div className="w-full relative z-10">
                                <div className="text-center mb-8 border-b-2 border-emerald-50 pb-6">
                                    <div className="inline-flex p-3 bg-yellow-100 text-yellow-600 rounded-2xl mb-3 shadow-xs">
                                        <Trophy size={32} className="fill-yellow-500 text-yellow-500" />
                                    </div>
                                    <h2 
                                        className="text-3xl sm:text-5xl font-black text-emerald-800 mb-2 leading-relaxed" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                        dir="rtl"
                                    >
                                        آپ کے اعزازات اور تمغے
                                    </h2>
                                    <h3 className="text-xl sm:text-2xl font-black text-amber-600 mb-2">
                                        Your Learning Achievements
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base font-bold">
                                        Collect wisdom badges and stars as you explore! Can you unlock them all? 🏆
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                    {achievements.map((achievement) => {
                                        const isUnlocked = unlockedAchievements.includes(achievement.id);
                                        return (
                                            <motion.div 
                                                key={achievement.id}
                                                whileHover={{ scale: 1.01 }}
                                                className={`p-5 sm:p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden flex items-center gap-5 text-left ${
                                                    isUnlocked 
                                                        ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100' 
                                                        : 'bg-slate-50 border-slate-200 opacity-70 grayscale'
                                                }`}
                                            >
                                                <div className="text-4xl sm:text-5xl shrink-0">{achievement.icon}</div>
                                                <div>
                                                    <h4 className="font-black text-slate-800 text-base sm:text-lg mb-1 uppercase tracking-wide">{achievement.title}</h4>
                                                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">{achievement.description}</p>
                                                    {isUnlocked ? (
                                                        <span className="mt-2 text-emerald-700 bg-emerald-100 text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block">
                                                            ✓ Unlocked (+25 XP)
                                                        </span>
                                                    ) : (
                                                        <span className="mt-2 text-slate-400 bg-slate-200 text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block">
                                                            🔒 Locked
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 6. QUIZ PLAYING / RESULT */}
                        {activeSection === 'quiz' && (
                            <div className="max-w-3xl mx-auto relative z-10">
                                {quizState === 'loading' && (
                                    <div className="text-center py-20 flex flex-col items-center gap-6">
                                        <div className="w-16 h-16 border-6 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                                        <h3 className="text-2xl font-black text-slate-700 animate-pulse">کوئز تیار ہو رہا ہے... Cooking up a fun quiz! 🍳</h3>
                                    </div>
                                )}

                                {quizState === 'playing' && quizQuestions.length > 0 && (
                                    <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-lg border-2 border-emerald-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="font-black text-slate-400 uppercase tracking-widest text-xs bg-slate-100 px-3.5 py-1.5 rounded-full">
                                                Question {currentQuestion + 1} / {quizQuestions.length}
                                            </span>
                                            <span className="font-black text-emerald-700 uppercase tracking-widest text-xs bg-emerald-100 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                                                <Star size={13} fill="currentColor" /> Score: {score}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-8 leading-snug">
                                            {quizQuestions[currentQuestion].question}
                                        </h3>

                                        <div className="space-y-3">
                                            {quizQuestions[currentQuestion].options.map((option, idx) => {
                                                const isSelected = selectedAnswer === idx;
                                                const isCorrect = idx === quizQuestions[currentQuestion].correct;
                                                const showResult = selectedAnswer !== null;
                                                
                                                let btnClass = "w-full p-4 sm:p-5 rounded-2xl text-left font-black text-base sm:text-lg transition-all border-2 shadow-xs cursor-pointer ";
                                                if (showResult) {
                                                    if (isCorrect) btnClass += "bg-emerald-100 border-emerald-500 text-emerald-900";
                                                    else if (isSelected) btnClass += "bg-rose-100 border-rose-500 text-rose-900";
                                                    else btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                                                } else {
                                                    btnClass += "bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700";
                                                }

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleAnswer(idx)}
                                                        disabled={selectedAnswer !== null}
                                                        className={btnClass}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span>{option}</span>
                                                            {showResult && isCorrect && <CheckCircle className="text-emerald-600" size={24} strokeWidth={3} />}
                                                            {showResult && isSelected && !isCorrect && <XCircle className="text-rose-600" size={24} strokeWidth={3} />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {quizState === 'result' && (
                                    <div className="text-center py-12 bg-emerald-50 rounded-[2.5rem] p-8 border-4 border-emerald-200">
                                        <div className="w-20 h-20 bg-yellow-400 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3 animate-bounce">
                                            <Trophy size={40} />
                                        </div>
                                        <h3 className="text-3xl font-black text-emerald-900 mb-2">ماشاء اللہ! زبردست کارکردگی!</h3>
                                        <p className="text-lg font-bold text-slate-600 mb-6">You scored {score} points on this quiz!</p>
                                        <button
                                            onClick={() => setActiveSection('basics')}
                                            className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
                                        >
                                            Explore More Topics
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverIslam;
