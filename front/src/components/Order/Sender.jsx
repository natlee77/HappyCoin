function  Sender({ updateSender }) {
  const handleChange = (e) => {
    updateSender(e.target.value);
  };

  return (
    <div>
      <input
        className="data"
        type="text"
        name="text"
        placeholder=" Write your name."
        onChange={handleChange}
      />
    </div>
  );
}

export default Sender;
