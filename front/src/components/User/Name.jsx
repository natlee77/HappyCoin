function  Name({ updateName }) {
  const handleChange = (e) => {
    updateName(e.target.value);
  };

  return (
    <div>
      <input
        className="data"
        type="text"
        name="text"
        placeholder=" Write your name..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Name;
