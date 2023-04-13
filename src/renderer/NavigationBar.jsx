import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
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
      </ul>
    </div>
  );
};

export default NavigationBar;
