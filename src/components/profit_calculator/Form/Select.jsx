const Select = ({ values, onChange, defaultValue, name, form }) => {
  const defaultValueString = form[name] || defaultValue;
  return (
    <select
      defaultValue={defaultValueString}
      onChange={(e) => onChange(name, e.target.value)}
    >
      <option value={defaultValueString} hidden>
        {defaultValueString}
      </option>
      {values?.map((val, index) => (
        <option value={val} key={index + 'h'}>
          {val}
        </option>
      ))}
    </select>
  );
};
export default Select;
