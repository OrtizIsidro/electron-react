import BasePopUp from 'components/profit_calculator/BasePopUp';
import { useRef, useState } from 'react';

const PopUp = ({
  children,
  title,
  onClose,
  closeRef = useRef(),
  showRef = useRef(),
}) => {
  const [popUp, setPopUp] = useState(false);
  const showPopUp = () => setPopUp(true);
  const closePopUp = () => {
    if (onClose) onClose();
    setPopUp(false);
  };
  return (
    <div style={{ margin: '10px' }}>
      <button onClick={showPopUp} ref={showRef}>
        {title}
      </button>
      {popUp && (
        <BasePopUp
          button={
            <button
              style={{ position: 'absolute', left: '90%', top: 1 }}
              onClick={() => closePopUp()}
              ref={closeRef}
            >
              close popUP
            </button>
          }
        >
          {children}
        </BasePopUp>
      )}
    </div>
  );
};
export default PopUp;
