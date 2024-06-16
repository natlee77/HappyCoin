 function  Role({ updateRole }) {
  const handleChange = (e) => {
    updateRole(e.target.value);
  };    

  return (
    <div>
      <input
        className="data"
        type="text"
        name="text"
        placeholder=" Write your role."
        onChange={handleChange}
      />
    </div>
  );
}

export default Role;