import PopUp from 'components/DailySales/PopUP';

const PopUpMain = ({ onClick, values, name, form, at, showSelected }) => {
  const selected = form[name];
  const array = form[name] || [];
  return (
    <>
      <PopUp title={(!showSelected && selected) || 'mostrar'}>
        <>
          <h2>pedido</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {values?.map((val, index) => (
              <button
                type="button"
                key={index}
                onClick={() => onClick(name, val)}
              >
                {val?.[at] || val}
              </button>
            ))}
          </div>
        </>
      </PopUp>
      <div>
        {showSelected &&
          array.map((val, index) => (
            <button key={index + 'sdfhjka'}>{val?.[at] || val}</button>
          ))}
      </div>
    </>
  );
};
export default PopUpMain;
