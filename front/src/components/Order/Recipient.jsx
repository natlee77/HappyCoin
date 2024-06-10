function  Recipient({ updateRecipient }) {
  const handleChange = (e) => {
    updateRecipient(e.target.value);
  };

  return (
    <div>
      <input
        className="data"
        type="text"
        name="text"
        placeholder=" Write whom you want to send."
        onChange={handleChange}
      />
    </div>
  );
}

export default Recipient;
