const Number = ({ value, name: key, onChange, form }) => {
  return (
    <input
      value={form[key]}
      type="number"
      className="mb-1"
      autoComplete="off"
      onChange={(e) => onChange(key, e.target.value)}
      placeholder={value || key}
    />
  );
};
export default Number;
