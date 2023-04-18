import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Home from 'components/Home';
import ProfitCalculator from 'components/ProfitCalculator';
import './styles.css';
import DailySales from 'components/DailySales';
import ManageClients from 'components/ManageClients';

export default function IndexRouter() {
  return (
    <Router>
      <div>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          <li>
            <NavLink to="/Daily_sales">registro diario</NavLink>
          </li>
          <li>
            <NavLink to="/profit_calculator">Menu e insumos</NavLink>
          </li>
          <li>
            <NavLink to="/manage_clients">administracion de clientes</NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profit_calculator/*" element={<ProfitCalculator />} />
        <Route path="daily_sales" element={<DailySales />} />
        <Route path="manage_clients" element={<ManageClients />} />
      </Routes>
    </Router>
  );
}
