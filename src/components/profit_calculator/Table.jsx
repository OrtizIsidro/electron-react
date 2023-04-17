const Table = ({ data, edit, style }) => {
  const keys = Array.isArray(data)
    ? Object.keys(data[0] || {})
    : Object.keys(data);
  const mapData = Array.isArray(data) ? data : [data];
  const titles = keys.filter((val) => val !== 'id');
  const Theads = titles.map((value, index) => (
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
            <tr onClick={() => edit(index)} key={index + 102}>
              {values.map((data, index) => {
                const isObjectOrArray = typeof data === 'object';
                return (
                  <td key={index + 7} style={{ border: '1px solid', ...style }}>
                    {!isObjectOrArray ? (
                      data
                    ) : (
                      <Table
                        data={data}
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
};
export default Table;
