const Text = ({ name: key, onChange, form }) => {
  return (
    <input
      value={form[key]}
      type="text"
      className="mb-1"
      autoComplete="off"
      onChange={(e) => onChange(key, e.target.value)}
      placeholder={form[key] || key}
    />
  );
};
export default Text;
