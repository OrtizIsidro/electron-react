import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import useData from 'renderer/hooks/useData';
import PopUp from './DailySales/PopUP';
import Form from './profit_calculator/Form';
import PopUpMain from './profit_calculator/Form/PopUpMain';
import Table from './profit_calculator/Table';
import { _add } from './profit_calculator/helper';

const DailySales = () => {
  const [menu] = useData('menu');
  const [ventas, setVentas] = useData('sales');
  const closeRef = useRef();
  const handleSubmit = (values) => {
    closeRef.current.click();
    console.log(values);
    setVentas((prev) => _add(prev, values, 'create'));
  };
  const clientes = ['pepe', 'francisco', 'debora', 'alexis'];

  return (
    <div>
      <h1>ingresa las ventas</h1>
      <PopUp title={'ingresar las ventas'} closeRef={closeRef}>
        <h1 style={{ textAlign: 'center' }}>selecciona el dia</h1>
        <Form
          inputs={[{ name: 'cliente' }, { name: 'pedido' }, { name: 'fecha' }]}
          render={([string, { add }, form]) => (
            <>
              <div>
                <p>fecha</p>
                <input
                  type="date"
                  onChange={({ target: { value } }) =>
                    string({ name: 'fecha', value })
                  }
                />
              </div>

              <div>
                <p>cliente</p>
                <PopUpMain
                  name="cliente"
                  onClick={(name, value) => string({ name, value })}
                  values={clientes}
                  form={form}
                />
              </div>
              <div>
                <p>pedido</p>
                <PopUpMain
                  onClick={(name, { nombre }) =>
                    add({ name, value: { nombre, cantidad: 1 } })
                  }
                  values={menu}
                  name="pedido"
                  at={'nombre'}
                  form={form}
                  showSelected
                />
              </div>
            </>
          )}
          onSubmit={handleSubmit}
        />
      </PopUp>
      <Table data={ventas} edit={(index) => console.log(ventas[index])} />
    </div>
  );
};
export default DailySales;
