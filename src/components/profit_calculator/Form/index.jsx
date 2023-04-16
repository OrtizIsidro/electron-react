import { useState } from 'react';

function Form({ inputs, onSubmit, render, submitRef }) {
  const [form, setForm] = useState(() => {
    const newValue = {};
    inputs.forEach(
      ({ name, defaultValue }) => (newValue[name] = defaultValue || '')
    );
    return newValue;
  });

  const stringHandler = ({ name: input, value }) =>
    setForm((form) => ({ ...form, [input]: value }));

  const arrayHandler = {
    add: ({ name: input, value }) =>
      setForm((form) => ({
        ...form,
        [input]: [...form[input], value],
      })),
    remove: ({ name: input, id }) =>
      setForm((form) => ({
        ...form,
        [input]: form[input].filter((_, index) => index !== id),
      })),
  };
  return (
    <div>
      {render([stringHandler, arrayHandler, form])}
      <button type="button" onClick={() => onSubmit(form)} ref={submitRef}>
        listo!
      </button>
    </div>
  );
}
export default Form;
