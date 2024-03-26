import React, { useState } from "react";

const Table = () => {
  const [showRegistrationPage, setShowRegistrationPage] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddMember = () => {
    setSelectedMember(null); 
    setShowRegistrationPage(true);
  };

  const handleRegister = (formData) => {
    if (selectedMember !== null) {
      // Update existing member
      const updatedMembers = [...members];
      updatedMembers[selectedMember] = formData;
      setMembers(updatedMembers);
    } else {
      // Add new member
      setMembers([...members, formData]);
    }
    setShowRegistrationPage(false);
  };

  const handleUpdate = (index) => {
    setSelectedMember(index);
    setShowRegistrationPage(true);
  };

  const deleteHandler = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  return (
    <div>
      {showRegistrationPage ? (
        <div className="registration-container">
          <h2>{selectedMember !== null ? "Update Member" : "Add New Member"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newData = {
                name: formData.get("username"),
                gender: formData.get("gender"),
                age: formData.get("age"),
                contact: formData.get("contact"),
                email: formData.get("email"),
              };
              handleRegister(newData);
            }}
          >
            <div className="form-group">
              <label htmlFor="username">NAME:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                defaultValue={selectedMember !== null ? members[selectedMember].name : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={selectedMember !== null ? members[selectedMember].email : ""}
              />
            </div>
            <div className="form-group">
              <label>
                Gender:
                <select name="gender" defaultValue={selectedMember !== null ? members[selectedMember].gender : ""}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  required
                  defaultValue={selectedMember !== null ? members[selectedMember].age : ""}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Contact Number:
                <input
                  type="tel"
                  name="contact"
                  required
                  defaultValue={selectedMember !== null ? members[selectedMember].contact : ""}
                />
              </label>
            </div>
            <button className="btn" type="submit">
              {selectedMember !== null ? "Update" : "Register"}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.age}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => handleUpdate(index)}>Update</button>
                    <button onClick={() => deleteHandler(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddMember}>Add a new member</button>
        </div>
      )}
    </div>
  );
};

export default Table;
