import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, BookOpen, Sparkles, Heart, Layers, Atom, Users, Shield, 
  HeartHandshake, Globe, Compass, CheckCircle, XCircle, RotateCcw, 
  Volume2, VolumeX, X, Bookmark, Award, ChevronRight, 
  HelpCircle, Target, Sun, Moon, Clock, Coins, 
  Leaf, Star, GraduationCap, Zap, Scale, Check
} from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import {
  discoverTopics,
  discoverCategories,
  DiscoverTopic,
  DiscoverCategory
} from '../../data/discoverTopicsData';
import { playAiVoice, stopCurrentAiVoice } from '../../utils/aiVoice';

// Map icon string names to Lucide icon components or emojis with matching colors
const getTopicIcon = (iconName: string, categoryId: string) => {
  switch (iconName) {
    case 'Heart':
      return <Heart className="w-7 h-7 text-rose-500 fill-rose-50 stroke-[2.2]" />;
    case 'Sun':
      return <Sun className="w-7 h-7 text-amber-500 fill-amber-50 stroke-[2.2]" />;
    case 'Coins':
      return <Coins className="w-7 h-7 text-emerald-600 stroke-[2.2]" />;
    case 'Moon':
      return <Moon className="w-7 h-7 text-indigo-500 fill-indigo-50 stroke-[2.2]" />;
    case 'Compass':
      return <Compass className="w-7 h-7 text-teal-600 stroke-[2.2]" />;
    case 'Target':
      return <Target className="w-7 h-7 text-rose-500 stroke-[2.2]" />;
    case 'Sparkles':
      return <Sparkles className="w-7 h-7 text-amber-500 fill-amber-50 stroke-[2.2]" />;
    case 'BookOpen':
      return <BookOpen className="w-7 h-7 text-indigo-600 stroke-[2.2]" />;
    case 'Users':
      return <Users className="w-7 h-7 text-sky-600 stroke-[2.2]" />;
    case 'Scale':
      return <Scale className="w-7 h-7 text-slate-700 stroke-[2.2]" />;
    case 'Atom':
      return <Atom className="w-7 h-7 text-indigo-500 stroke-[2.2]" />;
    case 'GraduationCap':
      return <GraduationCap className="w-7 h-7 text-emerald-600 stroke-[2.2]" />;
    case 'Shield':
      return <Shield className="w-7 h-7 text-teal-600 stroke-[2.2]" />;
    case 'Leaf':
      return <Leaf className="w-7 h-7 text-emerald-600 stroke-[2.2]" />;
    case 'Globe':
      return <Globe className="w-7 h-7 text-blue-600 stroke-[2.2]" />;
    case 'Zap':
      return <Zap className="w-7 h-7 text-amber-500 stroke-[2.2]" />;
    case 'Star':
      return <Star className="w-7 h-7 text-amber-400 fill-amber-400 stroke-[2.2]" />;
    default:
      return <Heart className="w-7 h-7 text-emerald-600 stroke-[2.2]" />;
  }
};

const getCategoryIcon = (iconName: string, isSelected: boolean) => {
  const iconClass = `w-5 h-5 ${isSelected ? 'text-white' : 'text-emerald-600'}`;
  switch (iconName) {
    case 'Star':
      return <Star className={iconClass} />;
    case 'Heart':
      return <Heart className={iconClass} />;
    case 'Sun':
      return <Sun className={iconClass} />;
    case 'Leaf':
      return <Leaf className={iconClass} />;
    case 'Sparkles':
      return <Sparkles className={iconClass} />;
    case 'Globe':
      return <Globe className={iconClass} />;
    case 'Atom':
      return <Atom className={iconClass} />;
    case 'GraduationCap':
      return <GraduationCap className={iconClass} />;
    case 'Users':
      return <Users className={iconClass} />;
    case 'Shield':
      return <Shield className={iconClass} />;
    case 'HeartHandshake':
      return <HeartHandshake className={iconClass} />;
    default:
      return <Compass className={iconClass} />;
  }
};

export default function DiscoverIslam() {
  const { points, level, addPoints, unlockAchievement } = useGamification();

  // Selected Category (defaulting to the exact 5 Pillars matching image_9b13a83e.png)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('five_pillars');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  // Quiz Modal State
  const [activeQuizTopic, setActiveQuizTopic] = useState<DiscoverTopic | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Audio Speaking State
  const [speakingTopicId, setSpeakingTopicId] = useState<string | null>(null);

  // Saved Topics
  const [savedTopicIds, setSavedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('app_saved_discover_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stop audio when unmounting or event triggered
  useEffect(() => {
    const handleStopAudio = () => {
      stopCurrentAiVoice();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingTopicId(null);
    };

    window.addEventListener('app:stop_all_audio', handleStopAudio);
    return () => {
      window.removeEventListener('app:stop_all_audio', handleStopAudio);
      stopCurrentAiVoice();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const toggleBookmark = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedTopicIds((prev) => {
      const updated = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      try {
        localStorage.setItem('app_saved_discover_topics', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleToggleSpeech = (topic: DiscoverTopic, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (speakingTopicId === topic.id) {
      stopCurrentAiVoice();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingTopicId(null);
      return;
    }

    setSpeakingTopicId(topic.id);
    const textToSpeak = `${topic.title}. ${topic.subtitle}. ${topic.content}`;

    playAiVoice(textToSpeak, {
      lang: 'en-US',
      onEnd: () => setSpeakingTopicId(null),
      onError: () => setSpeakingTopicId(null)
    });
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null || !activeQuizTopic) return;
    setQuizSubmitted(true);

    if (selectedQuizOption === activeQuizTopic.quiz.correct) {
      addPoints(25);
      unlockAchievement('perfect_score');
      unlockAchievement('knowledge_five_pillars');
    }
  };

  // Find active category
  const currentCategory = useMemo(() => {
    return discoverCategories.find((c) => c.id === selectedCategoryId) || discoverCategories[0];
  }, [selectedCategoryId]);

  // Filter topics
  const displayedTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      // If user is searching, search across all 100+ topics
      return discoverTopics.filter((topic) => {
        const titleMatch = topic.title.toLowerCase().includes(q);
        const subtitleMatch = topic.subtitle.toLowerCase().includes(q);
        const contentMatch = topic.content.toLowerCase().includes(q);
        const tagMatch = topic.tag.toLowerCase().includes(q);
        const categoryMatch = topic.category.toLowerCase().includes(q);
        return titleMatch || subtitleMatch || contentMatch || tagMatch || categoryMatch;
      });
    }

    // Otherwise show topics for currently selected category
    // Also include fallback for legacy category mapping
    return discoverTopics.filter((t) => {
      if (t.categoryId === selectedCategoryId) return true;
      if (selectedCategoryId === 'science' && t.categoryId === 'science') return true;
      if (selectedCategoryId === 'pioneers' && t.categoryId === 'pioneers') return true;
      if (selectedCategoryId === 'prophets' && t.categoryId === 'prophets') return true;
      if (selectedCategoryId === 'companions' && t.categoryId === 'companions') return true;
      if (selectedCategoryId === 'ethics' && t.categoryId === 'ethics') return true;
      if (selectedCategoryId === 'community_society' && (t.categoryId === 'society' || t.categoryId === 'community_society')) return true;
      return false;
    });
  }, [selectedCategoryId, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-100/60 pb-36 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* ======================================================== */}
      {/* 1. TOP GREEN HERO BANNER (Matches screenshot image_9b13a83e) */}
      {/* ======================================================== */}
      <div className="relative bg-gradient-to-b from-[#0e9f6e] via-[#0b8a5e] to-[#047857] text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[96rem] mx-auto relative z-10">
          {/* Top Row: Level & Points Pill (Right) */}
          <div className="flex justify-end mb-2">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-md border-2 border-amber-300 text-slate-800 text-xs sm:text-sm font-black">
              <span className="uppercase text-[11px] text-slate-600 font-bold">LVL {level}</span>
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span>{points}</span>
            </div>
          </div>

          {/* Centered Hero Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/70 border border-emerald-400/50 text-amber-300 font-black text-xs uppercase tracking-wider mb-3 shadow-xs">
              <span>ADVENTURE TIME! 🌍</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-sm">
              Discover Peace
            </h1>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-emerald-50/95 font-medium leading-relaxed max-w-2xl mx-auto">
              Welcome to a journey of love, kindness, and understanding. Let's explore the beautiful world of Islam together! 🚀
            </p>

            {/* Prominent Search Bar without 100+ */}
            <div className="mt-6 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search modules by topic, prophet, science, or deed..."
                  className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border-2 border-emerald-300 shadow-xl font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-white text-sm sm:text-base transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. FULL WIDTH TWO-COLUMN LAYOUT */}
      {/* ======================================================== */}
      <div className="w-full max-w-[96rem] mx-auto px-2 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* LEFT SIDEBAR: Category List */}
          <div className="w-full lg:w-80 shrink-0 space-y-2.5">
            {discoverCategories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setSearchQuery('');
                  }}
                  className={`w-full p-4 rounded-2xl flex items-center gap-3.5 font-bold text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-emerald-300 scale-[1.01]'
                      : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-100 shadow-2xs'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {getCategoryIcon(cat.iconName, isSelected)}
                  </div>
                  <span className="text-sm sm:text-base font-bold flex-1">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT MAIN CONTENT: Rounded Container with Modules */}
          <div className="flex-1 w-full bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border-2 border-emerald-100 shadow-xl min-h-[500px]">
            {/* Header inside right container */}
            <div className="text-center mb-8 pb-6 border-b border-emerald-100/70">
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight flex items-center justify-center gap-2">
                <span>{searchQuery ? `Search Results (${displayedTopics.length})` : `⭐ ${currentCategory.name}`}</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
                {searchQuery
                  ? `Showing all modules matching "${searchQuery}" across all topics`
                  : currentCategory.subtitle
                }
              </p>
            </div>

            {/* Topics Cards List */}
            {displayedTopics.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-base font-bold text-slate-600">No matching topics found.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {displayedTopics.map((topic) => {
                  const isSpeaking = speakingTopicId === topic.id;
                  const isExpanded = expandedTopicId === topic.id;
                  const isSaved = savedTopicIds.includes(topic.id);

                  return (
                    <motion.div
                      key={topic.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-emerald-100/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white hover:border-emerald-300 transition-all shadow-2xs hover:shadow-sm"
                    >
                      <div className="flex items-start gap-4 sm:gap-5">
                        {/* Left rounded square icon box */}
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
                          {getTopicIcon(topic.iconName, topic.categoryId)}
                        </div>

                        {/* Middle Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h3 className="text-lg sm:text-xl font-black text-emerald-800 tracking-tight">
                              {topic.title}
                            </h3>

                            {/* Actions (Listen, Bookmark, Quiz) */}
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={(e) => handleToggleSpeech(topic, e)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                  isSpeaking
                                    ? 'bg-rose-500 text-white animate-pulse'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                }`}
                                title="Listen to narration"
                              >
                                <Volume2 size={13} />
                                <span>{isSpeaking ? 'STOP' : 'LISTEN'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setActiveQuizTopic(topic);
                                  setSelectedQuizOption(null);
                                  setQuizSubmitted(false);
                                }}
                                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-all flex items-center gap-1 cursor-pointer"
                                title="Quick Quiz"
                              >
                                <Sparkles size={13} className="text-amber-500" />
                                <span>QUIZ</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(topic.id, e)}
                                className={`p-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                  isSaved
                                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                                    : 'text-slate-400 hover:text-slate-600 border-slate-200'
                                }`}
                                title="Save to favorites"
                              >
                                <Bookmark size={14} className={isSaved ? 'fill-rose-500' : ''} />
                              </button>
                            </div>
                          </div>

                          {/* Category Pill Tag */}
                          <div className="mt-1 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md inline-block">
                              {topic.tag}
                            </span>
                          </div>

                          {/* Bold Primary Summary */}
                          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                            {topic.subtitle}
                          </p>

                          {/* Detailed Explanation */}
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1">
                            {topic.content}
                          </p>

                          {/* Expandable Key Takeaways & Evidence */}
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                              className="text-xs font-black text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide Insights' : 'View Key Insights & Evidence'}</span>
                              <ChevronRight size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-2 overflow-hidden"
                                >
                                  {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
                                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100/70">
                                      <span className="font-black text-emerald-900 uppercase tracking-wide text-[10px] block mb-1">
                                        Key Takeaways:
                                      </span>
                                      <ul className="space-y-1">
                                        {topic.keyTakeaways.map((takeaway, tIdx) => (
                                          <li key={tIdx} className="flex items-start gap-1.5 text-slate-700">
                                            <span className="text-emerald-600 font-bold">•</span>
                                            <span>{takeaway}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {topic.evidenceOrCitation && (
                                    <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/70 text-slate-700 italic">
                                      <span className="font-bold text-amber-900 not-italic block mb-0.5">Reference:</span>
                                      "{topic.evidenceOrCitation}"
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. INTERACTIVE QUIZ MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeQuizTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border-4 border-emerald-300 relative"
            >
              <button
                onClick={() => setActiveQuizTopic(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                  Knowledge Check &bull; +25 XP
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
                {activeQuizTopic.quiz.question}
              </h3>

              <div className="space-y-2.5 mb-5">
                {activeQuizTopic.quiz.options.map((option, optIdx) => {
                  const isSelected = selectedQuizOption === optIdx;
                  const isCorrect = optIdx === activeQuizTopic.quiz.correct;

                  let btnStyle = 'bg-white border-slate-200 hover:bg-emerald-50 text-slate-800';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizOption(optIdx)}
                      className={`w-full p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && isCorrect && <Check size={16} className="text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-slate-700 mb-4">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    {selectedQuizOption === activeQuizTopic.quiz.correct ? '🎉 Correct Answer! (+25 XP)' : '💡 Learning Insight:'}
                  </span>
                  {activeQuizTopic.quiz.explanation}
                </div>
              )}

              <div className="flex justify-end gap-2">
                {!quizSubmitted ? (
                  <button
                    type="button"
                    disabled={selectedQuizOption === null}
                    onClick={handleQuizSubmit}
                    className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveQuizTopic(null)}
                    className="py-2.5 px-6 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
