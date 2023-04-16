const BasePopUp = ({ children, title, styles, button }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        border: '1px solid black',
        width: '80%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          height: '100%',
          position: 'relative',
          ...styles,
        }}
      >
        {button}

        <h2 style={{ margin: '0 10px' }}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
export default BasePopUp;
