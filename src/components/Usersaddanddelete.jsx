import React, { useState } from "react";
import "../index.css"; 

const ConfirmPopup = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p>Are you sure you want to delete this user?</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="popup-confirm">Yes</button>
          <button onClick={onCancel} className="popup-cancel">No</button>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const addUser = () => {
    if (name.trim() !== "") {
      setUsers([...users, name]);
      setName("");
    }
  };

  const handleDeleteClick = () => {
    if (name) {
      setShowPopup(true);
    }
  };

  const deleteUser = () => {
    setUsers(users.filter(user => user !== name));
    setName("");
    setShowPopup(false);
  };

  const handleTap = (user) => {
    setName(user);
  };

  return (
    <div className="user-management">
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="user-input"
      />
      <div className="button-container">
        <button onClick={addUser} className="add-user">Add User</button>
        <button onClick={handleDeleteClick} className="delete-user">Delete User</button>
      </div>

      <ConfirmPopup isVisible={showPopup} onConfirm={deleteUser} onCancel={() => setShowPopup(false)} />

      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} onClick={() => handleTap(user)} className="user-item">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
