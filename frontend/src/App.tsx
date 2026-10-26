import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuranReader from './pages/quran/QuranReader';
import HadithViewer from './pages/hadiths/HadithViewer';
import Chat from './pages/Chat';
import DiscoverIslam from './pages/discover/DiscoverIslam';
import DailyDuas from './pages/duas/DailyDuas';
import AchievementGallery from './pages/achievements/AchievementGallery';
import { GamificationProvider } from './contexts/GamificationContext';
import AchievementToast from './components/AchievementToast';
import ScrollToTop from './components/ScrollToTop';
import ShahadaNotificationBanner from './components/ShahadaNotificationBanner';

function App() {
  return (
    <GamificationProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200 selection:text-slate-900">
          <ShahadaNotificationBanner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<QuranReader />} />
            <Route path="/hadith" element={<HadithViewer />} />
            <Route path="/hadiths" element={<HadithViewer />} />
            <Route path="/duas" element={<DailyDuas />} />
            <Route path="/daily-duas" element={<DailyDuas />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/discover" element={<DiscoverIslam />} />
            <Route path="/achievements" element={<AchievementGallery />} />
            <Route path="/achievement-gallery" element={<AchievementGallery />} />
          </Routes>
          <Navbar />
          <AchievementToast />
        </div>
      </Router>
    </GamificationProvider>
  );
}

export default App;
