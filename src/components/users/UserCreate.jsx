/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UsersContext } from "../../helpers/userData";
import { UserSelect } from "./UserComponents";
import { UserSubmit } from "./UserSubmit";

export const CreateUser = ({ userName }) => {
  const { users, selectedUser } = useContext(UsersContext);

  return (
    <div>
      <p>Selected user: {selectedUser ? selectedUser.userName : "None"}</p>
      {users.length < 1 ? (
        <UserSubmit userName={userName} />
      ) : (
        <div>
          <UserSubmit />
          <UserSelect />
        </div>
      )}
    </div>
  );
};
