import { useRef, useState } from 'react';
import useData from 'renderer/hooks/useData';
import PopUp from './DailySales/PopUP';
import Form from './profit_calculator/Form';
import Number from './profit_calculator/Form/Number';
import Text from './profit_calculator/Form/Text';
import Table from './profit_calculator/Table';
import { _add, today } from './profit_calculator/helper';

const refactorInputs = (inputs) => inputs.map((val) => ({ name: val }));
const setDefaultData = (dataH) => (formValues) => {
  return formValues.map(({ name }) => ({
    name,
    defaultValue: dataH[name],
  }));
};

function ManageClients() {
  const [edit, setEdit] = useState();
  const [clientes, setClientes] = useData('clients');
  const [mainForm, setMainForm] = useState(
    refactorInputs(['nombre', 'telefono', 'fecha de registro', 'direccion'])
  );
  const [direccionForm, setDireccionForm] = useState(
    refactorInputs(['calle', 'numero', 'coordenadas', 'envio'])
  );
  const closeDireccion = useRef();
  const closeMain = useRef();
  const showMain = useRef();

  const handleSubmit = (values) => {
    closeMain.current.click();
    const data = { ...values, 'fecha de registro': today() };
    setClientes((prev) => _add(prev, data, 'create'));
  };
  const handleEdit = (index) => {
    const data = clientes[index];
    setMainForm(setDefaultData(data));
    setDireccionForm(setDefaultData(data.direccion));
    setEdit(true);
    showMain.current.click();
  };

  return (
    <>
      <h1>administrar clientes</h1>
      <PopUp title="agregar cliente" closeRef={closeMain} showRef={showMain}>
        <Form
          inputs={mainForm}
          onSubmit={handleSubmit}
          render={([string, , form]) => (
            <>
              <h1>ingresa los datos del cliente</h1>
              <div>
                <p>nombre</p>
                <Text
                  name="nombre"
                  form={form}
                  onChange={(name, value) => string({ name, value })}
                />
              </div>
              <div>
                <p>telefono</p>
                <Number
                  form={form}
                  name="telefono"
                  onChange={(name, value) => string({ name, value })}
                />
              </div>

              <div>
                <p>direccion:</p>
                <PopUp title="agregar" closeRef={closeDireccion}>
                  <Form
                    inputs={direccionForm}
                    onSubmit={(values) => {
                      closeDireccion.current.click();
                      string({ name: 'direccion', value: values });
                    }}
                    render={([stringD, , formD]) => (
                      <>
                        <div>
                          <p>calle</p>
                          <Text
                            form={formD}
                            name="calle"
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>

                        <div>
                          <p>numero</p>
                          <Number
                            form={formD}
                            name="numero"
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>

                        <div>
                          <p>coordenadas</p>
                          <Text
                            form={formD}
                            name="coordenadas"
                            onChange={(name, value) => stringD({ name, value })}
                          />
                        </div>
                        <div>
                          <p>costo de envio</p>
                          <Number
                            form={formD}
                            name="envio"
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
        {edit && <button type="button">borrar cliente</button>}
      </PopUp>
      <div>
        <h1>lista de clientes</h1>
        <div>
          <Table data={clientes} edit={handleEdit} />
        </div>
      </div>
    </>
  );
}
export default ManageClients;
