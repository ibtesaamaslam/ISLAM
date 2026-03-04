import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuranReader from './pages/quran/QuranReader';
import HadithViewer from './pages/hadiths/HadithViewer';
import Chat from './pages/Chat';
import DiscoverIslam from './pages/discover/DiscoverIslam';
import { GamificationProvider } from './contexts/GamificationContext';
import AchievementToast from './components/AchievementToast';

function App() {
  return (
    <GamificationProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200 selection:text-slate-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<QuranReader />} />
            <Route path="/hadith" element={<HadithViewer />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/discover" element={<DiscoverIslam />} />
          </Routes>
          <Navbar />
          <AchievementToast />
        </div>
      </Router>
    </GamificationProvider>
  );
}

export default App;
