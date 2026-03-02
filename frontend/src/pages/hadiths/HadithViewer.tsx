import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, RefreshCw, Search } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';

interface Hadith {
    hadithEnglish: string;
    header: string;
    bookSlug: string;
}

const kidFriendlyHadiths: Hadith[] = [
    {
        header: "Sahih Bukhari",
        bookSlug: "Good Manners",
        hadithEnglish: "The Prophet (ﷺ) said, \"None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.\""
    },
    {
        header: "Sahih Muslim",
        bookSlug: "Kindness",
        hadithEnglish: "The Prophet (ﷺ) said, \"He who is not kind to our younger ones or recognizes the rights of our elders is not one of us.\""
    },
    {
        header: "Sahih Bukhari",
        bookSlug: "Smiling",
        hadithEnglish: "The Prophet (ﷺ) said, \"Your smiling in the face of your brother is charity.\""
    },
    {
        header: "Sahih Bukhari",
        bookSlug: "Cleanliness",
        hadithEnglish: "The Prophet (ﷺ) said, \"Cleanliness is half of faith.\""
    },
    {
        header: "Sahih Bukhari",
        bookSlug: "Parents",
        hadithEnglish: "A man asked the Prophet (ﷺ), \"Who is most deserving of my good company?\" The Prophet said, \"Your mother.\" The man asked, \"Then who?\" The Prophet said, \"Your mother.\" The man asked, \"Then who?\" The Prophet said, \"Your mother.\" The man asked, \"Then who?\" The Prophet said, \"Then your father.\""
    },
    {
        header: "Sahih Muslim",
        bookSlug: "Charity",
        hadithEnglish: "The Prophet (ﷺ) said, \"Every act of goodness is charity.\""
    },
    {
        header: "Tirmidhi",
        bookSlug: "Truthfulness",
        hadithEnglish: "The Prophet (ﷺ) said, \"Truthfulness leads to righteousness, and righteousness leads to Paradise.\""
    },
    {
        header: "Abu Dawood",
        bookSlug: "Anger",
        hadithEnglish: "The Prophet (ﷺ) said, \"Do not become angry and Paradise will be yours.\""
    },
    {
        header: "Ibn Majah",
        bookSlug: "Knowledge",
        hadithEnglish: "The Prophet (ﷺ) said, \"Seeking knowledge is a duty upon every Muslim.\""
    },
    {
        header: "Sahih Bukhari",
        bookSlug: "Neighbors",
        hadithEnglish: "The Prophet (ﷺ) said, \"He who believes in Allah and the Last Day should do good to his neighbor.\""
    }
];

const HadithViewer = () => {
    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { addPoints, unlockAchievement } = useGamification();

    const fetchRandomHadith = () => {
        setLoading(true);
        const random = kidFriendlyHadiths[Math.floor(Math.random() * kidFriendlyHadiths.length)];
        setTimeout(() => {
            setHadith(random);
            setLoading(false);
            addPoints(15);
            unlockAchievement('hadith_hero');
        }, 500);
    };

    useEffect(() => {
        fetchRandomHadith();
    }, []);

    const filteredHadiths = kidFriendlyHadiths.filter(h => 
        h.hadithEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.bookSlug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-amber-50 pb-32 pt-10 px-4 flex flex-col items-center">
            <div className="max-w-md w-full">
                <h1 className="text-3xl font-black text-amber-600 text-center mb-8">Hadith Heroes</h1>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-3 top-3 text-amber-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search wisdom (e.g. smile, mother)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-400 focus:outline-none text-slate-700 font-medium placeholder:text-amber-300/70 bg-white shadow-sm"
                    />
                </div>

                {searchQuery ? (
                    <div className="space-y-4">
                        {filteredHadiths.length > 0 ? (
                            filteredHadiths.map((h, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="text-amber-400 fill-amber-400" size={16} />
                                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{h.header} • {h.bookSlug}</span>
                                    </div>
                                    <p className="text-slate-700 font-medium">{h.hadithEnglish}</p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center text-amber-400 font-medium mt-10">No wisdom found matching your search.</div>
                        )}
                    </div>
                ) : (
                    <>
                        <motion.div 
                            key={hadith?.hadithEnglish}
                            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-amber-200 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -mr-4 -mt-4 opacity-50" />
                            
                            {loading ? (
                                <div className="h-40 flex items-center justify-center text-amber-400">Loading Wisdom...</div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="text-amber-400 fill-amber-400" />
                                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{hadith?.header} • {hadith?.bookSlug}</span>
                                    </div>
                                    <p className="text-xl font-medium text-slate-700 leading-relaxed mb-6">
                                        {hadith?.hadithEnglish}
                                    </p>
                                    <div className="flex justify-center">
                                        <button 
                                            onClick={fetchRandomHadith}
                                            className="flex items-center gap-2 bg-amber-100 text-amber-700 px-6 py-3 rounded-xl font-bold hover:bg-amber-200 transition"
                                        >
                                            <RefreshCw size={20} />
                                            New Wisdom
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>

                        <div className="mt-8 text-center">
                            <p className="text-amber-800/60 text-sm font-medium">Collect points by reading a new Hadith every day!</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HadithViewer;
