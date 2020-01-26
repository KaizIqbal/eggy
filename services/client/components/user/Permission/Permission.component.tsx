import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { ALL_USER_QUERY } from "../../../graphql/Query";
import { Table, Button } from "./Permissions.styles";

// ##### USER PERMISSION #####
const possiblePermissions = [
  "ADMIN",
  "USER",
  "EGGCREATE",
  "EGGUPDATE",
  "EGGDELETE",
  "PERMISSIONUPDATE"
];

// ##### COMPONENT PROPS TYPE #####
interface IPermissionProps {}

// ##### COMPONENT #####
const Permissions: React.FunctionComponent<IPermissionProps> = props => {
  // ##### HOOKS #####

  const { data, loading, error } = useQuery(ALL_USER_QUERY);
  // ##### RENDER #####

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <div>
      <h3>Manage Permissions</h3>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {possiblePermissions.map(permission => (
              <th key={permission}>{permission}</th>
            ))}
            <th>👇</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <UserPermissions user={user} key={user.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// ##### COMPONENT PROPS TYPE #####
interface IUserProps {
  user: {
    id: string;
    name: string;
    email: string;
    permissions: Array<string>;
  };
}

// ##### COMPONENT #####
const UserPermissions: React.FunctionComponent<IUserProps> = props => {
  // ##### CONSTANT #####
  const user = props.user;

  // ##### LOACAL STATE HOOKS #####
  const [permissionsState, setPermissionsState] = useState(user.permissions);

  // ##### HANDLE FUNCTION #####

  const handlePermissionChange = e => {
    const checkbox = e.target;

    // take copy of current permissions
    let updatedPermissions = [...permissionsState];

    // figure out if we nned to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }
    setPermissionsState(updatedPermissions);
  };

  // ##### RENDER #####
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              id={`${user.id}-permission-${permission}`}
              type="checkbox"
              checked={permissionsState.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <Button>Update</Button>
      </td>
    </tr>
  );
};
export default Permissions;
