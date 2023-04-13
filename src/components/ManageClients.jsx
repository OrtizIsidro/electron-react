import { useRef } from 'react';
import PopUp from './DailySales/PopUP';
import Form from './profit_calculator/Form';
import Number from './profit_calculator/Form/Number';
import Text from './profit_calculator/Form/Text';
import useData from 'renderer/hooks/useData';
import Table from './profit_calculator/Table';
import { _add, today } from './profit_calculator/helper';
const refactorInputs = (inputs) => inputs.map((val) => ({ name: val }));

const ManageClients = () => {
  const [clientes, setClientes] = useData('clients');
  const closeDireccion = useRef();
  const closeMain = useRef();
  const handleSubmit = (values) => {
    closeMain.current.click();
    const data = { ...values, ['fecha de registro']: today() };
    setClientes((prev) => _add(prev, data, 'create'));
  };
  const orderedData = () =>
    clientes.map(({ direccion, ...val }) => ({ ...val, direccion }));
  return (
    <>
      <h1>administrar clientes</h1>
      <PopUp title={'agregar cliente'} closeRef={closeMain}>
        <Form
          inputs={refactorInputs([
            'nombre',
            'telefono',
            'fecha de registro',
            'direccion',
          ])}
          onSubmit={handleSubmit}
          render={([string, { add }, form]) => (
            <>
              <h1>ingresa los datos del cliente</h1>
              <div>
                <p>nombre</p>
                <Text
                  name={'nombre'}
                  form={form}
                  onChange={(name, value) => string({ name, value })}
                />
              </div>
              <div>
                <p>telefono</p>
                <Number
                  form={form}
                  name={'telefono'}
                  onChange={(name, value) => string({ name, value })}
                />
              </div>

              <div>
                <p>direccion:</p>
                <PopUp title={'agregar'} closeRef={closeDireccion}>
                  <Form
                    inputs={refactorInputs([
                      'calle',
                      'numero',
                      'coordenadas',
                      'envio',
                    ])}
                    onSubmit={(values) => {
                      closeDireccion.current.click();
                      add({ name: 'direccion', value: values });
                    }}
                    render={([stringD, _, formD]) => (
                      <>
                        <div>
                          <p>calle</p>
                          <Text
                            form={formD}
                            name={'calle'}
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>

                        <div>
                          <p>numero</p>
                          <Number
                            form={formD}
                            name={'numero'}
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>

                        <div>
                          <p>coordenadas</p>
                          <Text
                            form={formD}
                            name={'coordenadas'}
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>
                        <div>
                          <p>costo de envio</p>
                          <Number
                            form={form}
                            name={'envio'}
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>
                      </>
                    )}
                  />
                </PopUp>
              </div>
              <div>
                <p>fecha de registro</p>
                <input type="date" defaultValue={today()} />
              </div>
            </>
          )}
        />
      </PopUp>
      <div>
        <h1>lista de clientes</h1>
        <div>
          <Table
            data={clientes}
            edit={(index) => console.log(clientes[index])}
          />
        </div>
      </div>
    </>
  );
};
export default ManageClients;
