function  Password({ updatePassword }) {
  const handleChange = (e) => {
    updatePassword(e.target.value);
  };

  return (
    <div>
      <input
        className="data"
        type="text"
        name="text"
        placeholder=" Write your password..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Password;
