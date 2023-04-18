// eslint-disable-next-line react/prop-types
function Table({ data, edit, style }) {
  const keys = Array.isArray(data)
    ? Object.keys(data[0] || {})
    : Object.keys(data);
  const mapData = Array.isArray(data) ? data : [data];
  const titles = keys.filter((val) => val !== 'id');
  const Theads = titles.map((value, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <th key={index + 101} style={{ padding: '5px', border: '1px solid' }}>
      {value}
    </th>
  ));
  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr>{Theads}</tr>
      </thead>
      <tbody>
        {mapData?.map(({ id, ...value }, index) => {
          const values = Object.values(value);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr onClick={() => edit(index)} key={index}>
              {values.map((dataValue) => {
                const isObjectOrArray = typeof dataValue === 'object';
                return (
                  <td
                    key={dataValue.toString() + 7}
                    style={{ border: '1px solid', ...style }}
                  >
                    {!isObjectOrArray ? (
                      dataValue
                    ) : (
                      <Table
                        data={dataValue}
                        edit={edit}
                        style={{ width: '100%' }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
