import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
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
      <div>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/profit_calculator'}>profit calculator</NavLink>
          </li>
          <li>
            <NavLink to={'/Daily_sales'}>Daily sales</NavLink>
          </li>
          <li>
            <NavLink to={'/manage_clients'}>administrar clientes</NavLink>
          </li>
          <li>
            <NavLink to={'/statistics'}>estadisticas</NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profit_calculator/*" element={<ProfitCalculator />} />
        <Route
          path="statistics"
          element={<Statistics labels={[]} label={[]} dependencie={'none'} />}
        />
        <Route path="daily_sales" element={<DailySales />} />
        <Route path="manage_clients" element={<ManageClients />} />
      </Routes>
    </Router>
  );
}
