import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";
import { possiblePermissions } from "../../../graphql/constraint";
import { ALL_USER_QUERY } from "../../../graphql/Query";
import { Button, Table } from "./Permissions.styles";
import { UPDATE_PERMISSION_MUTATION } from "../../../graphql/Mutation";

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
            <th>Status</th>
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

  // ##### HOOKS #####

  // ##### LOACAL STATE HOOKS #####
  const [permissionsState, setPermissionsState] = useState(user.permissions);
  // ##### UPDATE PERMISSION MUTATION HOOKS #####
  const [updatePermissionsMutation, { loading, error }] = useMutation(
    UPDATE_PERMISSION_MUTATION,
    {
      variables: {
        permissions: permissionsState,
        userId: user.id
      }
    }
  );

  // ##### HANDLE FUNCTION #####

  const handlePermissionChange = async e => {
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
    await updatePermissionsMutation();
  };

  // ##### RENDER #####

  if (error)
    return (
      <tr>
        <td colSpan={8}>Error:{error.message}</td>
      </tr>
    );

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
        {/* TODO ADD MORE STATUS LIKE OFFLINE,UPDATED,ORIGINAL,LIVE OR OFFLINE  */}
        {loading ? "Updating" : "Live"}
      </td>
    </tr>
  );
};
export default Permissions;
