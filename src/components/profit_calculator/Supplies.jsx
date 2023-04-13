import Text from './Form/Text';
import Table from './Table';
import EditForm from './EditForm';

const Supplies = ({ supplies, handleSupplies }) => {
  const data = supplies.map(
    ({ nombre, cantidad, precio, total_por_gramo }) => ({
      nombre,
      cantidad,
      precio,
      total_por_gramo,
    })
  );
  const inputs = [{ name: 'nombre' }, { name: 'cantidad' }, { name: 'precio' }];
  return (
    <EditForm
      inputsForm={inputs}
      onSubmit={handleSupplies}
      onEdit={(displayData) => (
        <Table data={data} edit={(index) => displayData(supplies[index])} />
      )}
      DOM={{
        title: 'Insumos',
        show_button: { text: 'añadir insumo' },
        delete_button: { text: 'borrar insumo' },
      }}
      handlers={([string, _, form]) => (
        <>
          {inputs.map(({ name }, index) => (
            <div key={index + 'dhfjshas'}>
              <p>{name}</p>
              <Text
                key={index + 'hfjsd'}
                form={form}
                name={name}
                onChange={(name, value) => string({ name, value })}
              />
            </div>
          ))}
        </>
      )}
    />
  );
};

export default Supplies;
