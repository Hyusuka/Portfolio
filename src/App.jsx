import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import './index.css';

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/juan_wens_sanctung_rahawarin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
