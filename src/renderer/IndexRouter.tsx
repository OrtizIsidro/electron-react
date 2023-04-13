import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/Home';
import NavigationBar from 'renderer/NavigationBar';
import ProfitCalculator from 'components/ProfitCalculator';
import Statistics from 'components/Statistics';
import './styles.css';
import DailySales from 'components/DailySales';
import ManageClients from 'components/ManageClients';

export default function IndexRouter() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profit_calculator/*" element={<ProfitCalculator />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="daily_sales" element={<DailySales />} />
        <Route path="manage_clients" element={<ManageClients />} />
      </Routes>
    </Router>
  );
}
