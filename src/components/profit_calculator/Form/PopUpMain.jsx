import PopUp from 'components/DailySales/PopUP';
import { useRef } from 'react';

const PopUpMain = ({ onClick, values, name, form, at, showSelected }) => {
  const selected = form[name];
  const array = form[name] || [];
  const closeRef = useRef();
  return (
    <>
      <PopUp
        title={(!showSelected && selected[at]) || selected || 'mostrar'}
        closeRef={closeRef}
      >
        <>
          <h2>pedido</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {values?.map((val, index) => (
              <button
                type="button"
                key={index + 'dhjdsfhsdnf'}
                onClick={() => {
                  onClick(name, val);
                  closeRef.current.click();
                }}
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
