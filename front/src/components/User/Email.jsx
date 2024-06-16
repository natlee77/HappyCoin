function  Email({ updateEmail }) {
  const handleChange = (e) => {
    updateEmail(e.target.value);
  };

  return (
    <div>
      <input
        className="data"
        type="text"
        name="text"
        placeholder=" Write your email..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Email;
