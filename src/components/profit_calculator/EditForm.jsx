import PopUp from 'components/DailySales/PopUP';
import { useRef, useState } from 'react';
import Form from './Form';

const EditForm = ({
  onEdit,
  onSubmit,
  inputsForm,
  handlers,
  DOM: {
    show_button: { style: showStyle, text: showText },
    delete_button: { style: deleteStyle, text: deleteText },
    title,
  },
}) => {
  const [inputs, setInputs] = useState(inputsForm);
  const [edit, setEdit] = useState(false);
  const action = useRef('create');
  const showButton = useRef();
  const closeButton = useRef();
  const submitButton = useRef();
  const elementId = useRef('none');

  const firstSetElementId = (obj) => {
    onSubmit({ ...obj, action: action.current, id: elementId.current });
    closeButton.current.click();
  };

  const handleDelete = () => {
    action.current = 'delete';
    submitButton.current.click();
  };

  const handleEdit = (data) => {
    setEdit(true);
    showButton.current.click();
    action.current = 'edit';
    elementId.current = data?.id;
    setInputs((prev) =>
      prev.map((val) => ({
        ...val,
        defaultValue: data[val.name],
      }))
    );
  };
  const handleClose = () => {
    action.current = 'create';
    setEdit(false);
    return setInputs(inputsForm);
  };

  const metrica = onEdit(handleEdit);

  return (
    <div>
      <h2>{title}</h2>
      <PopUp
        title={showText}
        closeRef={closeButton}
        showRef={showButton}
        onClose={handleClose}
      >
        <>
          <Form
            inputs={inputs}
            onSubmit={firstSetElementId}
            submitRef={submitButton}
            render={handlers}
          />
          {edit && (
            <button onClick={handleDelete} style={{ ...deleteStyle }}>
              {deleteText}
            </button>
          )}
        </>
      </PopUp>
      {metrica}
    </div>
  );
};

export default EditForm;
