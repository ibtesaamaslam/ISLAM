import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuranReader from './pages/quran/QuranReader';
import HadithViewer from './pages/hadiths/HadithViewer';
import Chat from './pages/Chat';
import Leaderboard from './pages/Leaderboard';
import DiscoverIslam from './pages/discover/DiscoverIslam';
import { GamificationProvider } from './contexts/GamificationContext';

function App() {
  return (
    <GamificationProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<QuranReader />} />
            <Route path="/hadith" element={<HadithViewer />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/discover" element={<DiscoverIslam />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </GamificationProvider>
  );
}

export default App;
