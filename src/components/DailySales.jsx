import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import useData from 'renderer/hooks/useData';
import PopUp from './DailySales/PopUP';
import Form from './profit_calculator/Form';
import PopUpMain from './profit_calculator/Form/PopUpMain';
import Table from './profit_calculator/Table';
import { _add } from './profit_calculator/helper';
import Statistics from './Statistics';
import Text from './profit_calculator/Form/Text';

const DailySales = () => {
  const [menu] = useData('menu');
  const [ventas, setVentas] = useData('sales');
  const [clientes] = useData('clients');
  const closeRef = useRef();
  const closeCart = useRef();
  const closePedidos = useRef();
  const handleSubmit = (values) => {
    closeRef.current.click();

    setVentas((prev) =>
      _add(prev, { ...values, id: values.id || nanoid() }, 'create')
    );
  };
  const labels = ventas.map(({ fecha }) => fecha);
  const label = ventas.map(({ pedidos }) => pedidos.length);
  return (
    <div>
      <h1>ingresa las ventas</h1>
      <PopUp title={'ingresar las ventas'} closeRef={closeRef}>
        <h1 style={{ textAlign: 'center' }}>selecciona el dia</h1>
        <Form
          inputs={[{ name: 'pedidos', defaultValue: [] }, { name: 'fecha' }]}
          render={([string, { add }, { fecha, pedidos }]) => (
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
              <div style={{ padding: '10px 0', margin: '10px 0' }}>
                <PopUp title={'agregar los pedidos'}>
                  <div style={{ margin: 10, padding: 10 }}>
                    <h1>agregar pedidos del {fecha}</h1>
                  </div>

                  <PopUp title={'agregar un pedido'} closeRef={closePedidos}>
                    <Form
                      inputs={[
                        { name: 'cliente' },
                        { name: 'carrito', defaultValue: [] },
                      ]}
                      onSubmit={(form) => {
                        closePedidos.current.click();
                        add({ name: 'pedidos', value: form });
                      }}
                      render={([strOrObj, { add, remove }, formP]) => (
                        <>
                          <div>
                            <p>cliente</p>
                            <PopUpMain
                              name="cliente"
                              onClick={(name, value) =>
                                strOrObj({ name, value })
                              }
                              values={clientes}
                              form={formP}
                              at={'nombre'}
                            />
                          </div>
                          <div>
                            <p>carrito </p>
                            <PopUp title={'carrito'} closeRef={closeCart}>
                              {menu.length > 1 ? (
                                menu.map(({ nombre }, id) => (
                                  <button
                                    key={id + 'hfskjdhfhssdb'}
                                    onClick={() =>
                                      add({ name: 'carrito', value: menu[id] })
                                    }
                                  >
                                    {nombre}
                                  </button>
                                ))
                              ) : (
                                <h1>no hay menus</h1>
                              )}
                            </PopUp>
                            {formP?.['carrito']?.map(({ nombre }, index) => (
                              <button key={index + 'sdjhfjksdjkfz'}>
                                {nombre}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    />
                  </PopUp>

                  {pedidos?.map(({ cliente: { nombre } }, index) => (
                    <button key={index + 'sdjfdhfklj'}>{nombre}</button>
                  ))}
                </PopUp>
              </div>
            </>
          )}
          onSubmit={handleSubmit}
        />
      </PopUp>
      <Statistics labels={labels} label={label} dependencie={ventas} />
    </div>
  );
};
export default DailySales;
