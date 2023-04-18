import useData from 'renderer/hooks/useData';
import Divider from './profit_calculator/Divider';
// eslint-disable-next-line camelcase
import { calc_total, getDecimal, _add } from './profit_calculator/helper';
import Menu from './profit_calculator/Menu';
import Supplies from './profit_calculator/Supplies';

function getPrices({ ingredientes, venta, supplies }) {
  const costo = calc_total(ingredientes, supplies);
  const bruto = venta - costo;
  const porcentaje = `${getDecimal((bruto * 100) / costo, 4)}%`;
  return { costo, bruto, porcentaje };
}
function updateElement(prevMenu, updatedId, updatedData) {
  const elementsToUpdate = [];
  prevMenu.forEach(({ ingredientes, id }) => {
    ingredientes.forEach(
      ({ supplieId }) => supplieId === updatedId && elementsToUpdate.push(id)
    );
  });
  const result = prevMenu.map((data) => {
    const { ingredientes, venta, id } = data;
    const precios = getPrices({ ingredientes, venta, supplies: updatedData });

    if (elementsToUpdate.includes(id)) return { ...data, precios };
    return data;
  });

  // eslint-disable-next-line no-undef
  electron.handleLists.add('menu', result);
  return result;
}

function ProfitCalculator() {
  const [menu, setMenu] = useData('menu');
  const [supplies, setSupplies] = useData('supplies');

  const handleMenu = (values) => {
    const { nombre, venta, categoria, ingredientes, action, id } = values;

    const precios = getPrices({ ingredientes, venta, supplies });

    const obj = {
      nombre,
      venta,
      categoria,
      ingredientes,
      precios,
      id,
    };
    setMenu((prev) => _add(prev, obj, action));
  };

  const handleSupplies = (values) => {
    const { action, cantidad, precio, id, ...others } = values;
    // eslint-disable-next-line camelcase
    const total_por_gramo = getDecimal(precio / cantidad, 4);
    // eslint-disable-next-line camelcase
    const obj = { ...others, cantidad, precio, total_por_gramo, id };
    setSupplies((previusValue) => {
      const updatedData = _add(previusValue, obj, action);

      if (action === 'edit' || action === 'delete')
        setMenu((prev) => updateElement(prev, id, updatedData));

      return updatedData;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Supplies supplies={supplies} handleSupplies={handleSupplies} />
      <Divider />
      <Menu menu={menu} supplies={supplies} handle={handleMenu} />
    </div>
  );
}

export default ProfitCalculator;
