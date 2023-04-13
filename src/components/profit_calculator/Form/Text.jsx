const Text = ({ value, name: key, onChange, form }) => {
  return (
    <input
      value={form[key]}
      type="text"
      className="mb-1"
      autoComplete="off"
      onChange={(e) => onChange(key, e.target.value)}
      placeholder={value || key}
    />
  );
};
export default Text;
