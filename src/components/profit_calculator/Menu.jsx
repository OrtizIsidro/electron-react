import PopUp from 'components/DailySales/PopUP';
import { useRef } from 'react';
import Number from './Form/Number';
import Select from './Form/Select';
import Text from './Form/Text';
import Table from './Table';
import EditForm from './EditForm';

const Menu = ({ menu, handle, supplies }) => {
  const data = menu.map(({ nombre, venta, precios, id }) => ({
    nombre,
    venta,
    ...precios,
    id,
  }));
  const closeSupplieRef = useRef();
  const cantidadInputRef = useRef();
  return (
    <EditForm
      onSubmit={handle}
      inputsForm={[
        { name: 'nombre' },
        { name: 'venta' },
        {
          name: 'categoria',
        },
        {
          name: 'ingredientes',
        },
      ]}
      DOM={{
        title: 'Menu',
        delete_button: { text: 'borrar' },
        show_button: { text: 'mostrar' },
      }}
      onEdit={(displayData) => (
        <Table data={data} edit={(index) => displayData(menu[index])} />
      )}
      handlers={([string, array, form]) => (
        <>
          <div>
            <p>nombre</p>
            <Text
              form={form}
              name="nombre"
              onChange={(name, value) => string({ name, value })}
            />
          </div>
          <div>
            <p>venta</p>
            <Number
              form={form}
              name="venta"
              onChange={(name, value) => string({ name, value })}
            />
          </div>
          <div>
            <p>categoria</p>
            <Select
              name={'categoria'}
              values={['menu', 'recipe']}
              defaultValue={'selecciona la categoria'}
              onChange={(name, value) => string({ name, value })}
              form={form}
            />
          </div>
          <div>
            <p>ingredientes</p>
            <PopUp title={'cargar ingredientes'}>
              {supplies.map(({ nombre, id }, index) => (
                <PopUp
                  title={nombre}
                  key={index + 'hjkd'}
                  closeRef={closeSupplieRef}
                >
                  <input type="number" ref={cantidadInputRef} />
                  <button
                    type="button"
                    onClick={() => {
                      closeSupplieRef.current.click();
                      const cantidad = cantidadInputRef.current.value;
                      return array.add({
                        name: 'ingredientes',
                        value: {
                          supplieId: id,
                          nombre,
                          cantidad,
                        },
                      });
                    }}
                  >
                    listo!
                  </button>
                </PopUp>
              ))}
            </PopUp>
          </div>
        </>
      )}
    />
  );
};
export default Menu;
