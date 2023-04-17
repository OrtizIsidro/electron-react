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
import { today } from './profit_calculator/helper';

const DailySales = () => {
  const [menu] = useData('menu');
  const [ventas, setVentas] = useData('sales');
  const [clientes] = useData('clients');
  const closeRef = useRef();
  const closeCart = useRef();
  const closePedidos = useRef();
  const handleSubmit = (values) => {
    closeRef.current.click();
    const { fecha } = values;
    setVentas((prev) => {
      return _add(
        prev,
        { ...values, id: values.id || nanoid() },
        values.id ? 'edit' : 'create'
      );
    });
  };

  const setSalesToCorrespondedDate = (date) => {
    let result = null;
    ventas.forEach((venta) => {
      console.log({
        venta: venta.fecha,
        date,
        statement: venta.fecha === date,
      });
      if (venta.fecha === date) {
        result = [...venta.pedidos];
      }
    });
    return result || [];
  };

  const labels = ventas.map(({ fecha }) => fecha);
  const label = ventas.map(({ pedidos }) => pedidos.length);
  const dinero = ventas.map(({ pedidos }) => {
    let total = 0;
    pedidos.forEach((pedido) => {
      pedido.carrito.forEach((val) => (total += Number(val.venta)));
    });
    return total / 1000;
  });

  return (
    <div>
      <h1>ingresa las ventas</h1>
      <PopUp title={'ingresar las ventas'} closeRef={closeRef}>
        <h1 style={{ textAlign: 'center' }}>selecciona el dia</h1>
        <Form
          inputs={[
            {
              name: 'pedidos',
              defaultValue: setSalesToCorrespondedDate(today()),
            },
            { name: 'fecha', defaultValue: today() },
          ]}
          render={([string, { add }, { fecha, pedidos }]) => {
            return (
              <>
                <div>
                  <p>fecha</p>
                  <input
                    type="date"
                    onChange={({ target: { value } }) => {
                      string({ name: 'fecha', value });
                      string({
                        name: 'pedidos',
                        value: setSalesToCorrespondedDate(value),
                      });
                    }}
                    value={fecha}
                  />
                </div>
                <div style={{ padding: '10px 0', margin: '10px 0' }}>
                  <PopUp title={'agregar los pedidos'} closeRef={closePedidos}>
                    <div style={{ margin: 10, padding: 10 }}>
                      <h1>agregar pedidos del {fecha}</h1>
                    </div>

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
                                      add({
                                        name: 'carrito',
                                        value: menu[id],
                                      })
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
                </div>
                <div>
                  <p>pedidos hasta ahora</p>
                  {pedidos?.map((pedido, index) => (
                    <button key={index + 'jdsfhfgu'}>
                      {pedido.cliente.nombre}
                    </button>
                  ))}
                  <p>total: {pedidos.length}</p>
                </div>
              </>
            );
          }}
          onSubmit={handleSubmit}
        />
      </PopUp>
      <Statistics
        labels={labels}
        pedidos={label}
        dinero={dinero}
        dependencie={ventas}
      />
    </div>
  );
};
export default DailySales;
