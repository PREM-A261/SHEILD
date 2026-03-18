
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ChatBot from './pages/ChatBot/ChatBot.jsx';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import RiskMap from './pages/RiskMap/RiskMap';
import DataInsights from './pages/DataInsights/DataInsights';
import RegionAnalysis from './pages/RegionAnalysis/RegionAnalysis';
import Awareness from './pages/Awareness/Awareness';
import DataSources from './pages/DataSources/DataSources';
import FuturePlanner from './pages/FuturePlanner';
import HelpBox from "./pages/HelpBox";
import Leaderboard from './pages/leaderboard/india-district-dashboard (2)';
import NGO from './pages/NGO/ngo_platform (1).jsx';


import './App.css';

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/awareness" element={<Awareness />} />
              <Route path="/future-planner" element={<FuturePlanner />} />
              <Route path="/helpbox" element={<HelpBox />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/ngo" element={<NGO />} />

              {/* Protected Routes - Any authenticated user */}
              <Route
                path="/data-sources"
                element={
                  <ProtectedRoute>
                    <DataSources />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Gov Admin & NGO User Only */}
              <Route
                path="/risk-map"
                element={
                  <ProtectedRoute allowedRoles={['gov_admin', 'ngo_user']}>
                    <RiskMap />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/region/:id"
                element={
                  <ProtectedRoute allowedRoles={['gov_admin', 'ngo_user']}>
                    <RegionAnalysis />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/data-insights"
                element={
                  <ProtectedRoute allowedRoles={['gov_admin', 'ngo_user']}>
                    <DataInsights />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/interventions"
                element={
                  <ProtectedRoute allowedRoles={['gov_admin', 'ngo_user']}>
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

          </main>
          <Footer />
        </div>
      </Router>
      <ChatBot />
    </AuthProvider>
  );
}

export default App;
