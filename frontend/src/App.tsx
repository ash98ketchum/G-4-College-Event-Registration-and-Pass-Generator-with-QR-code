import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}

export default App;
