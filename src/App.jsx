import { HashRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Portfolio from './pages/Portfolio';
import './index.css';

function App() {
  return (
    <PortfolioProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </HashRouter> 
    </PortfolioProvider>
  );
}

export default App;
