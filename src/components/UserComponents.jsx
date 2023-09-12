/* eslint-disable react/prop-types */

import { useState } from "react";
import { handleCreateUser } from "../data/userData";
import { users } from "../data/userData";

const UserSelectBtn = ({ userName }) => {
  return <button> {userName}</button>;
};

const CreateUser = () => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(0, userName);
    setUserName("");
  };

  return (
    <div>
      {users.length < 1 ? (
        <>
          <h3>Users</h3>
          <label htmlFor="createUser">New player: </label>
          <form onSubmit={handleSubmit}>
            <input
              id="createUser"
              placeholder="Your Name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <UserSelectBtn userId={user.id} userName={user.userName} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CreateUser;
